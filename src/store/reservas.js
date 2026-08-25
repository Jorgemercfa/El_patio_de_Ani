import { ref } from 'vue';
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  runTransaction,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/firebase';
import {
  POPCORN_PRODUCT_IDS,
  POPCORN_MAX_STOCK,
  COMBO_POPCORN_IDS,
  TRAMPOLINE_PRODUCT_IDS,
  TRAMPOLINE_MAX_STOCK,
} from '@/constants/reservas';

// ─── Firestore como única fuente de verdad ─────────────────────────────
//
// Antes, este store guardaba TODO en localStorage (RESERVATIONS_SERVICES_KEY),
// lo cual significaba que cada admin/cliente tenía su propio calendario de
// disponibilidad, sin sincronización real entre navegadores/dispositivos.
// Dos admins podían ver disponibilidades distintas, y un cliente en modo
// incógnito o en otro dispositivo no aportaba ni veía el estado real.
//
// Ahora este archivo es EL ÚNICO que habla con Firestore para reservas.
// cart.js y los componentes de vista (Inflable-reserva.vue, etc.) solo
// consumen las funciones públicas de acá, igual que antes — pero ahora
// son asíncronas.

// Tiempo que se mantiene "apartada" una fecha en estado PENDIENTE mientras
// el cliente no confirma el envío de su reserva por WhatsApp (ni el admin
// la valida manualmente). Pasado este tiempo, la fecha vuelve a estar
// disponible.
const PENDING_HOLD_MINUTES = 120; // 2 horas
const PENDING_HOLD_MS = PENDING_HOLD_MINUTES * 60 * 1000;

export const RESERVATION_STATUS = {
  PENDING: 'pendiente',
  CONFIRMED: 'confirmada',
};

export const CONFIRM_RESULT = {
  CONFIRMED: 'confirmed',
  NOT_FOUND: 'not_found',
  EXPIRED: 'expired',
};

// Resultados posibles al intentar crear un hold, para que cart.js pueda
// distinguir "no se pudo por fecha ocupada" de un error real de red/permiso.
export const HOLD_RESULT = {
  SOLD_OUT: 'sold_out',
  DATE_TAKEN: 'date_taken',
  ERROR: 'error',
};

const RESERVATIONS_COLLECTION = 'reservations';
const SLOTS_COLLECTION = 'reservation_slots';
const COUNTERS_COLLECTION = 'reservation_counters';

// El "groupKey" agrupa productos que comparten el mismo pool de disponibilidad.
// Popcorn y sus combos comparten un único pool ('popcorn'); el resto usa su
// propio productId como key — igual que en la versión anterior.
function groupKeyFor(productId) {
  if (POPCORN_PRODUCT_IDS.includes(productId) || COMBO_POPCORN_IDS.includes(productId)) {
    return 'popcorn';
  }
  return String(productId);
}

function isStockLimited(productId) {
  return (
    POPCORN_PRODUCT_IDS.includes(productId) ||
    COMBO_POPCORN_IDS.includes(productId) ||
    TRAMPOLINE_PRODUCT_IDS.includes(productId)
  );
}

function maxStockFor(productId) {
  if (POPCORN_PRODUCT_IDS.includes(productId) || COMBO_POPCORN_IDS.includes(productId)) {
    return POPCORN_MAX_STOCK;
  }
  if (TRAMPOLINE_PRODUCT_IDS.includes(productId)) {
    return TRAMPOLINE_MAX_STOCK;
  }
  return 1;
}

function isExpiredPending(entry) {
  if (entry.status !== RESERVATION_STATUS.PENDING) return false;
  const expiresAtMs =
    typeof entry.expiresAt?.toMillis === 'function' ? entry.expiresAt.toMillis() : 0;
  return expiresAtMs > 0 && expiresAtMs < Date.now();
}

// Una reserva "activa" bloquea la fecha para otros clientes: está
// confirmada, o está pendiente y aún dentro de la ventana de espera.
// Se calcula siempre en el cliente contra expiresAt — así, aunque la
// Cloud Function de limpieza (pruneExpired) tarde en correr, ningún
// cliente ve una fecha como ocupada por un hold que ya venció.
function isActive(entry) {
  if (entry.status === RESERVATION_STATUS.CONFIRMED) return true;
  return entry.status === RESERVATION_STATUS.PENDING && !isExpiredPending(entry);
}

// Cache en memoria del último fetch por groupKey, para no repetir queries
// idénticas dentro del mismo ciclo de interacción del usuario (ej. al
// pintar el calendario y luego revalidar disponibilidad al enviar el
// formulario). No sustituye a Firestore como fuente de verdad — solo evita
// llamadas redundantes muy próximas en el tiempo.
const groupCache = ref(new Map());

async function fetchGroupEntries(groupKey, { fresh = false } = {}) {
  if (!isFirebaseConfigured || !db) return [];

  if (!fresh && groupCache.value.has(groupKey)) {
    return groupCache.value.get(groupKey);
  }

  const q = query(collection(db, RESERVATIONS_COLLECTION), where('groupKey', '==', groupKey));
  const snapshot = await getDocs(q);
  const entries = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));

  groupCache.value.set(groupKey, entries);
  return entries;
}

export function useReservasServicio() {
  // ─── Lectura ──────────────────────────────────────────────────────

  // Devuelve solo las fechas activas (confirmadas o pendientes vigentes)
  // como array de strings, igual que la versión anterior — para que el
  // calendario de Inflable-reserva y Product-item sigan funcionando con
  // la misma forma de datos, ahora esperando una Promise.
  async function getReservedDates(productId) {
    const groupKey = groupKeyFor(productId);
    const entries = await fetchGroupEntries(groupKey);
    return entries.filter(isActive).map((entry) => entry.date);
  }

  // Revalida disponibilidad contra Firestore. Se usa tanto para pintar el
  // calendario como, crucialmente, justo antes de agregar al carrito —
  // por eso siempre pide datos frescos (fresh: true), para no confiar en
  // el cache de un fetch anterior que pudo quedar desactualizado mientras
  // el usuario llenaba el formulario.
  async function isDateAvailable(productId, date) {
    if (!date) return false;

    const groupKey = groupKeyFor(productId);
    const entries = await fetchGroupEntries(groupKey, { fresh: true });
    const activeForDate = entries.filter((entry) => isActive(entry) && entry.date === date);

    if (isStockLimited(productId)) {
      return activeForDate.length < maxStockFor(productId);
    }

    return activeForDate.length === 0;
  }

  // ─── Escritura ────────────────────────────────────────────────────

  // Aparta una fecha en estado PENDIENTE, de forma atómica:
  //  - Productos de cupo único: usa un doc "lock" determinístico
  //    (reservation_slots/{groupKey}_{date}) leído y escrito dentro de
  //    una transacción, así dos clientes que intenten reservar la MISMA
  //    fecha al mismo tiempo no pueden ambos ganar la carrera — a
  //    diferencia de la versión con localStorage, que no tenía ninguna
  //    protección real contra esa condición de carrera.
  //  - Productos con stock (popcorn, trampolín): usa un contador atómico
  //    (reservation_counters/{groupKey}_{date}) que se incrementa dentro
  //    de la misma transacción solo si no se superó el máximo.
  //
  // Debe llamarse en el momento real de checkout (cart.js), no cuando el
  // cliente solo llena el formulario de reserva.
  //
  // Devuelve el id del documento de reserva creado (reservationId), que
  // cart.js debe guardar junto al pedido para poder confirmar/liberar
  // después. Lanza un Error con message HOLD_RESULT.SOLD_OUT o
  // HOLD_RESULT.DATE_TAKEN si la fecha ya no está disponible.
  async function createPendingReservation(productId, date, orderId, meta = {}) {
    if (!isFirebaseConfigured || !db) return null;
    if (!date || !orderId) return null;

    const groupKey = groupKeyFor(productId);
    const expiresAt = Timestamp.fromMillis(Date.now() + PENDING_HOLD_MS);
    const reservationRef = doc(collection(db, RESERVATIONS_COLLECTION));

    if (isStockLimited(productId)) {
      const counterRef = doc(db, COUNTERS_COLLECTION, `${groupKey}_${date}`);

      await runTransaction(db, async (tx) => {
        const counterSnap = await tx.get(counterRef);
        const max = maxStockFor(productId);
        const current = counterSnap.exists() ? counterSnap.data().activeCount || 0 : 0;

        if (current >= max) {
          throw new Error(HOLD_RESULT.SOLD_OUT);
        }

        tx.set(counterRef, { groupKey, date, activeCount: current + 1 }, { merge: true });
        tx.set(reservationRef, {
          groupKey,
          productId,
          date,
          status: RESERVATION_STATUS.PENDING,
          orderId,
          createdAt: serverTimestamp(),
          expiresAt,
          ...meta,
        });
      });

      groupCache.value.delete(groupKey);
      return reservationRef.id;
    }

    // Productos de cupo único (la mayoría: inflables, etc.)
    const slotRef = doc(db, SLOTS_COLLECTION, `${groupKey}_${date}`);

    await runTransaction(db, async (tx) => {
      const slotSnap = await tx.get(slotRef);

      if (slotSnap.exists()) {
        const slot = slotSnap.data();
        const slotExpiresAtMs =
          typeof slot.expiresAt?.toMillis === 'function' ? slot.expiresAt.toMillis() : 0;
        const slotIsActive =
          slot.status === RESERVATION_STATUS.CONFIRMED ||
          (slot.status === RESERVATION_STATUS.PENDING && slotExpiresAtMs > Date.now());

        if (slotIsActive) {
          throw new Error(HOLD_RESULT.DATE_TAKEN);
        }
      }

      tx.set(slotRef, {
        groupKey,
        date,
        status: RESERVATION_STATUS.PENDING,
        orderId,
        reservationId: reservationRef.id,
        expiresAt,
      });
      tx.set(reservationRef, {
        groupKey,
        productId,
        date,
        status: RESERVATION_STATUS.PENDING,
        orderId,
        createdAt: serverTimestamp(),
        expiresAt,
        ...meta,
      });
    });

    groupCache.value.delete(groupKey);
    return reservationRef.id;
  }

  // Marca como CONFIRMADA la reserva asociada a un reservationId (ya no
  // se busca por orderId recorriendo todo — con Firestore, el documento
  // se referencia directo por su id). Se llama desde el panel de admin
  // cuando se valida el mensaje de WhatsApp del cliente.
  //
  // No confirma un hold ya vencido: devuelve CONFIRM_RESULT.EXPIRED para
  // que quien la llame pueda avisarle al admin en vez de asumir que la
  // fecha sigue apartada — mismo criterio que la versión anterior.
  async function confirmReservation(reservationId, orderId = null) {
    if (!isFirebaseConfigured || !db || !reservationId) return CONFIRM_RESULT.NOT_FOUND;

    const reservationRef = doc(db, RESERVATIONS_COLLECTION, reservationId);

    const result = await runTransaction(db, async (tx) => {
      // Todas las lecturas primero (regla de las transacciones de Firestore):
      // se necesita leer la reserva antes de saber la ruta del slot.
      const reservationSnap = await tx.get(reservationRef);
      if (!reservationSnap.exists()) return CONFIRM_RESULT.NOT_FOUND;

      const entry = reservationSnap.data();
      if (isExpiredPending(entry)) return CONFIRM_RESULT.EXPIRED;

      let slotRef = null;
      let slotSnap = null;
      if (!isStockLimited(entry.productId)) {
        slotRef = doc(db, SLOTS_COLLECTION, `${entry.groupKey}_${entry.date}`);
        slotSnap = await tx.get(slotRef);
      }

      // Recién ahora las escrituras.
      tx.update(reservationRef, {
        status: RESERVATION_STATUS.CONFIRMED,
        orderId: orderId ?? entry.orderId,
      });

      if (slotRef && slotSnap?.exists() && slotSnap.data().reservationId === reservationId) {
        tx.update(slotRef, { status: RESERVATION_STATUS.CONFIRMED });
      }

      return CONFIRM_RESULT.CONFIRMED;
    });

    groupCache.value.clear();
    return result;
  }

  // Libera manualmente una reserva (el cliente nunca confirmó, o se
  // cancela el pedido). Borra el documento y libera el slot/contador
  // correspondiente para que la fecha quede disponible de inmediato.
  async function releaseReservation(reservationId) {
    if (!isFirebaseConfigured || !db || !reservationId) return;

    const reservationRef = doc(db, RESERVATIONS_COLLECTION, reservationId);

    await runTransaction(db, async (tx) => {
      const reservationSnap = await tx.get(reservationRef);
      if (!reservationSnap.exists()) return;
      const entry = reservationSnap.data();

      const stockLimited = isStockLimited(entry.productId);
      const counterRef = stockLimited
        ? doc(db, COUNTERS_COLLECTION, `${entry.groupKey}_${entry.date}`)
        : null;
      const slotRef = !stockLimited
        ? doc(db, SLOTS_COLLECTION, `${entry.groupKey}_${entry.date}`)
        : null;

      const counterSnap = counterRef ? await tx.get(counterRef) : null;
      const slotSnap = slotRef ? await tx.get(slotRef) : null;

      // Escrituras al final.
      tx.delete(reservationRef);

      if (counterRef && counterSnap?.exists()) {
        const current = counterSnap.data().activeCount || 0;
        tx.set(counterRef, { activeCount: Math.max(0, current - 1) }, { merge: true });
      }

      if (slotRef && slotSnap?.exists() && slotSnap.data().reservationId === reservationId) {
        tx.delete(slotRef);
      }
    });

    groupCache.value.clear();
  }

  return {
    getReservedDates,
    isDateAvailable,
    createPendingReservation,
    confirmReservation,
    releaseReservation,
    RESERVATION_STATUS,
    CONFIRM_RESULT,
    HOLD_RESULT,
  };
}