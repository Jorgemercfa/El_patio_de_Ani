import { reactive, computed, watch, effectScope } from 'vue';
import { doc, setDoc, updateDoc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
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
function scopeKey(userId) {
  return `${STORAGE_PREFIX}:${userId || GUEST_SCOPE}`;
}

function confirmationKey(userId) {
  return `${STORAGE_PREFIX}:last-confirmation:${userId || GUEST_SCOPE}`;
}

function pendingOrdersKey(userId) {
  return `${STORAGE_PREFIX}:pending-orders:${userId || GUEST_SCOPE}`;
}

// Cache local de pedidos, usado como fallback/espejo. La FUENTE DE VERDAD
// real es ahora Firestore (colección 'orders') — ver
// subscribeToOrdersFromServer() más abajo, que es lo que debe usar
// Orders-company.vue en vez de getPurchasedproducts().
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
  // Dos fases claramente separadas, a propósito:
  //
  //  FASE 1 — Asegurar TODAS las fechas del pedido (Firestore, vía
  //  reservas.js). Si CUALQUIER fecha falla, se liberan las que sí se
  //  lograron reservar en este mismo checkout y se aborta con
  //  CartCheckoutError código 'RESERVATION_CONFLICT'.
  //
  //  FASE 2 — Con las fechas ya confirmadas, se escribe cada pedido en la
  //  colección 'orders' de Firestore. Un fallo acá es de RED, no de
  //  disponibilidad, así que el pedido se guarda localmente para
  //  reintentar después.
  async function checkoutToServer(userId, cartItemsToCheckout) {
    // ─── Guard de sesión ────────────────────────────────────────────
    //
    // Solo se espera a que la sesión termine de resolverse
    // (ensureReady()), para no leer sessionState.user a medio-cargar y
    // confundir un usuario real con un invitado por una condición de
    // carrera. NO se exige login: el negocio permite comprar como
    // invitado — la única funcionalidad que depende de tener sesión es
    // el programa de fidelización (loyalty), que se maneja aparte y no
    // bloquea el checkout en sí.
    await ensureReady();

    const resolvedUserId = sessionState.user?.id ?? sessionState.user?.uid ?? null;

    if (resolvedUserId !== (userId ?? null)) {
      // El userId pasado como argumento no coincide con la sesión actual
      // (ej. se capturó antes de que terminara de resolverse). Se usa
      // siempre el de la sesión real (incluyendo null si es invitado),
      // nunca el argumento, para no crear un pedido a nombre de un
      // usuario que ya no es el activo.
      console.warn('[Cart] userId pasado a checkoutToServer no coincide con la sesión activa; se usa el de la sesión.');
    }
    userId = resolvedUserId; // puede ser null (invitado) — es válido

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

  async function retrySyncPendingOrders() {
    const userId = sessionState.user?.id ?? null;
    if (!isFirebaseConfigured || !db) return;

    const pending = loadPendingOrders(userId);
    if (pending.length === 0) return;

    const stillPending = [];
    for (const order of pending) {
      try {
        const orderData = { ...order };
        delete orderData.syncStatus;
        await setDoc(doc(db, ORDERS_COLLECTION, order.orderId), orderData);
      } catch {
        stillPending.push(order);
      }
    }

    persistPendingOrders(userId, stillPending);
  }

  // checkout(): wrapper que usa Cart.vue en el flujo real (WhatsApp).
  // Async — quien lo llame DEBE hacer `await` y capturar
  // CartCheckoutError, o el pedido puede fallar en silencio (esto fue
  // justo el bug que dejaba Orders-company.vue sin datos: Cart.vue
  // llamaba checkout() sin await, así que un rechazo de la promesa nunca
  // se manejaba y la app seguía como si el pedido se hubiera guardado).
  async function checkout() {
    const userId = sessionState.user?.id ?? null;
    const { orders } = await checkoutToServer(userId, state.items);

    state.purchasedproducts.push(...orders);
    clearCart(); // ya persiste `items`
    persistOrders();

    return orders;
  }

  // ─── Lectura de pedidos para el panel de admin ─────────────────────
  //
  // getPurchasedproducts() se mantiene (lee el cache LOCAL) por si algo
  // más en la app todavía depende de ella, pero Orders-company.vue debe
  // usar subscribeToOrdersFromServer() en su lugar: esto escucha en
  // tiempo real la colección 'orders' de Firestore, así el admin ve
  // pedidos hechos desde CUALQUIER dispositivo/navegador, no solo el
  // suyo — que era justo el problema original (el panel se veía vacío
  // porque solo miraba su propio localStorage).
  //
  // Devuelve una función de "unsubscribe": hay que llamarla en
  // onBeforeUnmount() del componente para no dejar el listener activo.
  function subscribeToOrdersFromServer(callback) {
    if (!isFirebaseConfigured || !db) {
      // Sin Firestore configurado, se entrega el cache local una sola
      // vez como fallback (mejor que dejar el panel vacío sin explicar
      // por qué).
      callback(state.purchasedproducts);
      return () => {};
    }

    const ordersQuery = query(collection(db, ORDERS_COLLECTION), orderBy('purchasedAt', 'desc'));

    return onSnapshot(
      ordersQuery,
      (snapshot) => {
        const orders = snapshot.docs.map((docSnap) => ({ ...docSnap.data(), orderId: docSnap.id }));
        callback(orders);
      },
      (err) => {
        console.error('[Cart] Error escuchando pedidos de Firestore:', err);
      },
    );
  }

  function getPurchasedproducts(userId) {
    if (userId === undefined || userId === null) return state.purchasedproducts;
    return state.purchasedproducts.filter((c) => c.userId === userId);
  }

  // ─── Acciones del admin (Orders-company.vue) ───────────────────────
  //
  // Estas tres funciones ahora reciben el OBJETO del pedido completo
  // (tal como llega de subscribeToOrdersFromServer), no solo su orderId
  // — porque ahora necesitan datos que solo existen en el documento de
  // Firestore (como reservationId), y ese pedido puede no existir en el
  // cache local si se creó desde otro dispositivo.
  //
  // Cada una escribe el cambio en el documento de Firestore (fuente de
  // verdad) y, si existe una copia local, también la actualiza por
  // consistencia — pero ya no depende de que exista localmente.
  async function markPurchasedCompleted(order) {
    if (!order?.orderId || order.completedAt) return true;
    const completedAt = new Date().toISOString();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, ORDERS_COLLECTION, order.orderId), { completedAt });
      } catch (err) {
        console.error('[Cart] No se pudo marcar el pedido como completado en Firestore:', err);
        return false;
      }
    }

    const localItem = state.purchasedproducts.find((o) => o.orderId === order.orderId);
    if (localItem) {
      localItem.completedAt = completedAt;
      persistOrders();
    }

    return true;
  }

  // Con el flujo actual, la reserva ya queda CONFIRMADA en el momento del
  // checkout (ver checkoutToServer) — esta función sirve para que el
  // admin marque que YA VALIDÓ el mensaje de WhatsApp del cliente. Se
  // re-llama a confirmReservation() por idempotencia/seguridad. Devuelve
  // false si el hold ya venció (CONFIRM_RESULT.EXPIRED) para que
  // Orders-company.vue pueda avisarle al admin.
  async function confirmPurchasedReservation(order) {
    if (!order?.orderId || order.confirmedAt || order.releasedAt) return true;

    if (order.reservationId) {
      const result = await confirmReservation(order.reservationId, order.orderId);
      if (result === CONFIRM_RESULT.EXPIRED) return false;
    }

    const confirmedAt = new Date().toISOString();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, ORDERS_COLLECTION, order.orderId), { confirmedAt });
      } catch (err) {
        console.error('[Cart] No se pudo confirmar el pedido en Firestore:', err);
        return false;
      }
    }

    const localItem = state.purchasedproducts.find((o) => o.orderId === order.orderId);
    if (localItem) {
      localItem.confirmedAt = confirmedAt;
      persistOrders();
    }

    return true;
  }

  // Libera manualmente la reserva (el cliente nunca confirmó por
  // WhatsApp, o se cancela el pedido).
  async function releasePurchasedReservation(order) {
    if (!order?.orderId || order.confirmedAt || order.releasedAt) return true;

    if (order.reservationId) {
      await releaseReservation(order.reservationId);
    }

    const releasedAt = new Date().toISOString();

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, ORDERS_COLLECTION, order.orderId), { releasedAt });
      } catch (err) {
        console.error('[Cart] No se pudo liberar el pedido en Firestore:', err);
        return false;
      }
    }

    const localItem = state.purchasedproducts.find((o) => o.orderId === order.orderId);
    if (localItem) {
      localItem.releasedAt = releasedAt;
      persistOrders();
    }

    return true;
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
    subscribeToOrdersFromServer,
    getPurchasedproducts,
    markPurchasedCompleted,
    confirmPurchasedReservation,
    releasePurchasedReservation,
    saveLastConfirmation: saveLastConfirmationForCurrentUser,
    consumeLastConfirmation: consumeLastConfirmationForCurrentUser,
  };
}