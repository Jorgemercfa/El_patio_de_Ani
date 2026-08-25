import { reactive, computed, watch, effectScope } from 'vue';
import { doc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/firebase';
import { getCompanyproducts } from '@/auth/companyproductsRepo';
import { useSession } from '@/auth/session';
import { useReservasServicio, CONFIRM_RESULT, HOLD_RESULT } from '@/store/reservas';

const STORAGE_PREFIX = 'al-toque-cart';
const GUEST_SCOPE = 'guest';
const ORDERS_COLLECTION = 'orders';

// Categorías cuya reserva representa un único evento/servicio: nunca deben
// acumular cantidad al volver a agregarse (ej. confirmar una reserva
// detallada de un inflable que ya estaba en el carrito).
const SERVICE_CATEGORIES = ['Inflables', 'Juegos', 'Shows Infantiles', 'Carritos Snacks', 'Estética Infantil'];

// Ventana de validez de una confirmación persistida. Si el usuario vuelve
// del navegador/WhatsApp mucho después (ej. abrió la pestaña y la dejó
// olvidada por horas), no queremos mostrarle un mensaje de confirmación
// "viejo" que ya no corresponde a una acción reciente.
const CONFIRMATION_TTL_MS = 10 * 60 * 1000;

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// Error tipado para que quien llame a checkout()/checkoutToServer() pueda
// distinguir "una fecha del pedido ya no está disponible" (hay que pedirle
// al usuario que elija otra) de un fallo de red al escribir el pedido
// (hay que reintentar, no cambiar nada de la reserva).
export class CartCheckoutError extends Error {
  constructor(message, { code, failures = [] } = {}) {
    super(message);
    this.name = 'CartCheckoutError';
    this.code = code; // 'RESERVATION_CONFLICT' | 'NETWORK'
    this.failures = failures; // [{ productId, date, reason }]
  }
}

// ─── Carrito en progreso (localStorage) ────────────────────────────────
//
// Se mantiene igual que antes: el carrito en progreso (`items`, todavía
// no confirmado) sigue viviendo en localStorage, scoped por usuario. Esto
// es intencional y NO se migra a Firestore — es estado transitorio, útil
// para que el usuario no pierda su selección si cierra la pestaña o
// pierde conexión antes de completar el checkout (UX/offline). Recién al
// hacer checkout ese estado se vuelve un pedido real y persistente.
function scopeKey(userId) {
  return `${STORAGE_PREFIX}:${userId || GUEST_SCOPE}`;
}

function confirmationKey(userId) {
  return `${STORAGE_PREFIX}:last-confirmation:${userId || GUEST_SCOPE}`;
}

// Llave para pedidos que se generaron pero cuya escritura a Firestore
// falló (sin internet, timeout, etc.) — la reserva de fecha YA quedó
// confirmada en ese momento (ver checkoutToServer), así que este pedido
// no puede simplemente perderse: se guarda acá para reintentar el envío
// a Firestore más adelante, sin volver a tocar la reserva.
function pendingOrdersKey(userId) {
  return `${STORAGE_PREFIX}:pending-orders:${userId || GUEST_SCOPE}`;
}

// Cache local de pedidos ya confirmados, para que getPurchasedproducts()
// (usado hoy por Orders-company.vue) siga funcionando sin cambios. OJO:
// Firestore (colección 'orders') es ahora la fuente de verdad real de
// los pedidos — este cache local queda, por ahora, como espejo de lo que
// este navegador en particular ha creado. Sincronizar Orders-company.vue
// para LEER desde Firestore (en vez de leer solo este cache local) es el
// siguiente paso pendiente para que el admin vea pedidos hechos desde
// cualquier dispositivo, no solo el suyo.
function ordersKey() {
  return `${STORAGE_PREFIX}:orders`;
}

function loadOrders() {
  return safeParse(localStorage.getItem(ordersKey())) || [];
}

function persistOrders() {
  localStorage.setItem(ordersKey(), JSON.stringify(state.purchasedproducts));
}

function loadPendingOrders(userId) {
  return safeParse(localStorage.getItem(pendingOrdersKey(userId))) || [];
}

function persistPendingOrders(userId, orders) {
  localStorage.setItem(pendingOrdersKey(userId), JSON.stringify(orders));
}

function loadScope(userId) {
  const stored = safeParse(localStorage.getItem(scopeKey(userId))) || { items: [] };
  return {
    items: stored.items || [],
  };
}

// ─── Migración de datos legados ──────────────────────────────────────
// (sin cambios respecto a la versión anterior — sigue siendo necesaria
// para navegadores que ya tenían pedidos guardados con el formato viejo,
// scoped por usuario, antes de que existiera la llave global de pedidos)
function migrateLegacyOrders() {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return [];
  }

  const merged = loadOrders();
  const seenIds = new Set(merged.map((o) => o.orderId));
  let changed = false;

  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(`${STORAGE_PREFIX}:`)) continue;
    if (key === ordersKey() || key.includes(':last-confirmation:') || key.includes(':pending-orders:')) {
      continue;
    }

    const stored = safeParse(localStorage.getItem(key));
    if (!stored || !Array.isArray(stored.purchasedproducts) || stored.purchasedproducts.length === 0) {
      continue;
    }

    stored.purchasedproducts.forEach((order) => {
      const id = order.orderId ?? `${order.id}-${order.purchasedAt}`;
      if (!seenIds.has(id)) {
        seenIds.add(id);
        merged.push(order);
        changed = true;
      }
    });

    localStorage.setItem(key, JSON.stringify({ items: stored.items || [] }));
  }

  if (changed) {
    localStorage.setItem(ordersKey(), JSON.stringify(merged));
  }

  return merged;
}

let activeUserId = null;
const initialOrders = migrateLegacyOrders();
const initialItems = loadScope(activeUserId).items;

const state = reactive({
  items: initialItems,
  purchasedproducts: initialOrders,
});

function persist() {
  localStorage.setItem(
    scopeKey(activeUserId),
    JSON.stringify({
      items: state.items,
    }),
  );
}

function saveLastConfirmation(userId) {
  localStorage.setItem(confirmationKey(userId), JSON.stringify({ timestamp: Date.now() }));
}

function consumeLastConfirmation(userId) {
  const raw = localStorage.getItem(confirmationKey(userId));
  if (!raw) return false;

  localStorage.removeItem(confirmationKey(userId));

  const parsed = safeParse(raw);
  if (!parsed || typeof parsed.timestamp !== 'number') return false;

  return Date.now() - parsed.timestamp < CONFIRMATION_TTL_MS;
}

let scopeWatcherStarted = false;

function ensureScopeWatcher(sessionState) {
  if (scopeWatcherStarted) return;
  scopeWatcherStarted = true;

  const scope = effectScope(true);
  scope.run(() => {
    watch(
      () => sessionState.user?.id ?? null,
      (newUserId) => {
        if (newUserId === activeUserId) return;
        activeUserId = newUserId;
        const scoped = loadScope(activeUserId);
        state.items.splice(0, state.items.length, ...scoped.items);
      },
      { immediate: true },
    );
  });
}

export function useCart() {
  const { state: sessionState, ensureReady } = useSession();
  ensureScopeWatcher(sessionState);

  const {
    createPendingReservation,
    confirmReservation,
    releaseReservation,
  } = useReservasServicio();

  const products = computed(() => getCompanyproducts());

  function addToCart(productId, reservationDate = null, eventDetails = null) {
    const product = products.value.find((p) => p.id === productId);
    const isServiceProduct = SERVICE_CATEGORIES.includes(product?.category);
    const existing = state.items.find((i) => i.productId === productId);
    if (existing) {
      existing.quantity = isServiceProduct ? 1 : existing.quantity + 1;
      if (reservationDate) existing.reservationDate = reservationDate;
      if (eventDetails) existing.eventDetails = eventDetails;
    } else {
      state.items.push({ productId, quantity: 1, reservationDate, eventDetails });
    }
    persist();
  }

  function removeFromCart(productId) {
    const idx = state.items.findIndex((i) => i.productId === productId);
    if (idx !== -1) {
      state.items.splice(idx, 1);
      persist();
    }
  }

  function updateQuantity(productId, qty) {
    if (productId === null || productId === undefined) return;
    const item = state.items.find((i) => i.productId === productId);
    if (item) {
      item.quantity = Math.max(1, qty);
      persist();
    }
  }

  function updateReservationDate(productId, date) {
    if (productId === null || productId === undefined) return;
    const item = state.items.find((i) => i.productId === productId);
    if (item) {
      item.reservationDate = date || null;
      persist();
    }
  }

  function clearCart() {
    state.items.splice(0);
    persist();
  }

  const cartItems = computed(() =>
    state.items
      .map((item) => {
        const product = products.value.find((c) => c.id === item.productId);
        if (!product) return null;
        return {
          ...product,
          quantity: item.quantity,
          reservationDate: item.reservationDate ?? null,
          eventDetails: item.eventDetails ?? null,
        };
      })
      .filter(Boolean),
  );

  const cartTotal = computed(() =>
    cartItems.value.reduce(
      (sum, item) => sum + Number(item.discount_price ?? item.price ?? 0) * item.quantity,
      0,
    ),
  );

  const cartCount = computed(() =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  // ─── checkoutToServer ───────────────────────────────────────────────
  //
  // Nota sobre Checkout-item.vue: esa vista está en desuso (el flujo real
  // de compra es vía WhatsApp), así que esta función se diseñó pensando
  // en ser llamada desde Cart.vue en el momento del envío del pedido, no
  // desde un checkout de pago tradicional.
  //
  // Dos fases claramente separadas, a propósito:
  //
  //  FASE 1 — Asegurar TODAS las fechas del pedido (Firestore, vía
  //  reservas.js). Si CUALQUIER fecha falla (ya ocupada / sin stock), se
  //  liberan las que sí se lograron reservar en este mismo checkout
  //  (compensación) y se aborta con CartCheckoutError código
  //  'RESERVATION_CONFLICT' — el pedido nunca llega a escribirse a medias.
  //  Quien llame debe informar al usuario cuáles fechas fallaron
  //  (err.failures) y pedirle elegir otra.
  //
  //  FASE 2 — Con las fechas ya confirmadas, se escribe cada pedido en la
  //  colección 'orders' de Firestore. Un fallo acá es de RED, no de
  //  disponibilidad (la fecha ya quedó legítimamente confirmada), así que
  //  el pedido se guarda localmente para reintentar después, en vez de
  //  perderse o mostrarle al usuario un error de "fecha ocupada" que no
  //  corresponde.
  async function checkoutToServer(userId, cartItemsToCheckout) {
    // ─── Guard de sesión ────────────────────────────────────────────
    //
    // Antes de tocar reservas.js (createPendingReservation) o escribir
    // cualquier pedido, hay que asegurarse de que la sesión ya terminó
    // de resolverse (state.ready) y que hay un usuario real logueado.
    // Sin esto, un checkout disparado justo mientras la app todavía está
    // sincronizando la sesión (ej. recién recargada la página) podría
    // colarse como "invitado" (userId=null) por una condición de carrera,
    // no porque el usuario haya elegido comprar sin cuenta.
    //
    // Decisión de negocio tomada acá: el checkout SIEMPRE exige sesión
    // iniciada — no se crean holds anónimos. Si el negocio prefiriera
    // permitir apartar la fecha sin cuenta y solo exigir login al enviar
    // el pedido final, habría que separar createPendingReservation() en
    // un paso previo propio (llamado desde la vista, antes del checkout),
    // en vez de dejarlo encapsulado acá dentro de checkoutToServer.
    await ensureReady();

    const resolvedUserId = sessionState.user?.id ?? sessionState.user?.uid ?? null;

    if (!resolvedUserId) {
      throw new CartCheckoutError('Debes iniciar sesión para completar tu pedido.', {
        code: 'AUTH_REQUIRED',
      });
    }

    if (resolvedUserId !== userId) {
      // El userId pasado como argumento no coincide con la sesión actual
      // (ej. el caller lo capturó antes de que terminara de resolverse).
      // Se usa siempre el de la sesión real, nunca el argumento, para no
      // crear un pedido a nombre de un usuario que ya no es el activo.
      console.warn('[Cart] userId pasado a checkoutToServer no coincide con la sesión activa; se usa el de la sesión.');
    }
    userId = resolvedUserId;

    const productsList = products.value;

    const orders = cartItemsToCheckout
      .map((cartItem, index) => {
        const product = productsList.find((p) => p.id === cartItem.productId);
        if (!product) return null;
        return {
          ...product,
          quantity: cartItem.quantity,
          reservationDate: cartItem.reservationDate ?? null,
          eventDetails: cartItem.eventDetails ?? null,
          orderId: `${Date.now()}-${index}-${product.id}-${Math.random().toString(36).slice(2, 8)}`,
          purchasedAt: new Date().toISOString(),
          userId,
          reservationId: null,
        };
      })
      .filter(Boolean);

    // FASE 1
    const failures = [];
    for (const order of orders) {
      if (!order.reservationDate) continue;

      try {
        // Preferimos siempre pasar por createPendingReservation (aunque
        // se confirme de inmediato acá abajo) porque es la única función
        // que hace la verificación atómica de colisión vía transacción —
        // así seguimos protegidos aunque este checkout coincida en el
        // tiempo con el de otro cliente reservando la misma fecha.
        const reservationId = await createPendingReservation(
          order.id,
          order.reservationDate,
          order.orderId,
        );
        const confirmResult = await confirmReservation(reservationId, order.orderId);

        if (confirmResult !== CONFIRM_RESULT.CONFIRMED) {
          failures.push({ productId: order.id, date: order.reservationDate, reason: confirmResult });
          continue;
        }

        order.reservationId = reservationId;
      } catch (err) {
        const reason =
          err?.message === HOLD_RESULT.SOLD_OUT || err?.message === HOLD_RESULT.DATE_TAKEN
            ? err.message
            : 'error';
        failures.push({ productId: order.id, date: order.reservationDate, reason });
      }
    }

    if (failures.length > 0) {
      await Promise.all(
        orders
          .filter((order) => order.reservationId)
          .map((order) => releaseReservation(order.reservationId).catch(() => {})),
      );

      throw new CartCheckoutError('No se pudieron confirmar todas las fechas del pedido.', {
        code: 'RESERVATION_CONFLICT',
        failures,
      });
    }

    // FASE 2
    const synced = [];
    const stillPending = [];

    for (const order of orders) {
      if (!isFirebaseConfigured || !db) {
        stillPending.push({ ...order, syncStatus: 'pending' });
        continue;
      }

      try {
        await setDoc(doc(db, ORDERS_COLLECTION, order.orderId), order);
        synced.push(order);
      } catch (err) {
        console.warn('[Cart] No se pudo sincronizar el pedido con Firestore, se reintentará:', err);
        stillPending.push({ ...order, syncStatus: 'pending' });
      }
    }

    if (stillPending.length > 0) {
      const existingPending = loadPendingOrders(userId);
      persistPendingOrders(userId, [...existingPending, ...stillPending]);
    }

    return { orders: [...synced, ...stillPending] };
  }

  // Reintenta escribir a Firestore los pedidos que quedaron pendientes de
  // sincronizar por fallos de red. Las reservas de esos pedidos YA están
  // confirmadas (eso pasó en checkoutToServer antes de que fallara la
  // escritura), así que acá solo se reintenta el guardado del documento,
  // sin tocar reservas.js de nuevo. Conviene llamar esto al reconectar o
  // al iniciar la app.
  async function retrySyncPendingOrders() {
    const userId = sessionState.user?.id ?? null;
    if (!isFirebaseConfigured || !db) return;

    const pending = loadPendingOrders(userId);
    if (pending.length === 0) return;

    const stillPending = [];
    for (const order of pending) {
      try {
        // Se arma una copia sin `syncStatus` (es un flag solo para uso
        // local, no debe guardarse en el documento de Firestore). Se usa
        // `delete` en vez de destructuring-omit para no dejar una
        // variable declarada sin usar (evita el warning de ESLint
        // no-unused-vars sin necesidad de un eslint-disable).
        const orderData = { ...order };
        delete orderData.syncStatus;
        await setDoc(doc(db, ORDERS_COLLECTION, order.orderId), orderData);
      } catch {
        stillPending.push(order);
      }
    }

    persistPendingOrders(userId, stillPending);
  }

  // checkout(): wrapper que usa Cart.vue en el flujo real (WhatsApp). Ya
  // no es sincrónico — quien lo llame debe hacer `await` y capturar
  // CartCheckoutError para mostrarle al usuario el motivo si falla.
  async function checkout() {
    const userId = sessionState.user?.id ?? null;
    const { orders } = await checkoutToServer(userId, state.items);

    state.purchasedproducts.push(...orders);
    clearCart(); // ya persiste `items`
    persistOrders();

    return orders;
  }

  function getPurchasedproducts(userId) {
    if (userId === undefined || userId === null) return state.purchasedproducts;
    return state.purchasedproducts.filter((c) => c.userId === userId);
  }

  function markPurchasedCompleted(orderId) {
    if (!orderId) return;
    const item = state.purchasedproducts.find((order) => order.orderId === orderId);
    if (!item) return;
    item.completedAt = new Date().toISOString();
    persistOrders();
  }

  // Con el nuevo flujo, la reserva ya queda CONFIRMADA en el momento del
  // checkout (ver checkoutToServer) — ya no queda "pendiente" a la espera
  // de que el admin la confirme manualmente después del WhatsApp. Esta
  // función ahora sirve para que el admin marque que YA VALIDÓ el
  // mensaje de WhatsApp del cliente (un registro de verificación local),
  // no para recién confirmar la fecha. Igual se re-llama a
  // confirmReservation() por seguridad/idempotencia: si por algún motivo
  // ese ítem hubiera quedado en un estado raro (ej. un pedido migrado del
  // formato viejo con localStorage), esto lo deja consistente.
  async function confirmPurchasedReservation(orderId) {
    if (!orderId) return;
    const item = state.purchasedproducts.find((order) => order.orderId === orderId);
    if (!item || item.confirmedAt || item.releasedAt) return;
    if (!item.reservationId) {
      // Pedido sin fecha asociada, o de un formato viejo sin reservationId:
      // no hay nada que confirmar en reservas.js, solo se marca localmente.
      item.confirmedAt = new Date().toISOString();
      persistOrders();
      return;
    }

    await confirmReservation(item.reservationId, orderId);
    item.confirmedAt = new Date().toISOString();
    persistOrders();
  }

  // Libera manualmente la reserva (el cliente nunca confirmó por
  // WhatsApp, o se cancela el pedido). Ahora usa item.reservationId —ya
  // NO orderId— porque reservas.js identifica cada reserva por su propio
  // id de documento en Firestore, no por el orderId del pedido.
  async function releasePurchasedReservation(orderId) {
    if (!orderId) return;
    const item = state.purchasedproducts.find((order) => order.orderId === orderId);
    if (!item || item.confirmedAt || item.releasedAt) return;

    if (item.reservationId) {
      await releaseReservation(item.reservationId);
    }
    item.releasedAt = new Date().toISOString();
    persistOrders();
  }

  function saveLastConfirmationForCurrentUser() {
    saveLastConfirmation(sessionState.user?.id ?? null);
  }

  function consumeLastConfirmationForCurrentUser() {
    return consumeLastConfirmation(sessionState.user?.id ?? null);
  }

  return {
    cartItems,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateReservationDate,
    clearCart,
    checkout,
    checkoutToServer,
    retrySyncPendingOrders,
    getPurchasedproducts,
    markPurchasedCompleted,
    confirmPurchasedReservation,
    releasePurchasedReservation,
    saveLastConfirmation: saveLastConfirmationForCurrentUser,
    consumeLastConfirmation: consumeLastConfirmationForCurrentUser,
  };
}