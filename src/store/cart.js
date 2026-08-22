import { reactive, computed, watch, effectScope } from 'vue';
import { getCompanyproducts } from '@/auth/companyproductsRepo';
import { useSession } from '@/auth/session';
import { useReservasServicio } from '@/store/reservas';

const STORAGE_PREFIX = 'al-toque-cart';
const GUEST_SCOPE = 'guest';

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

// Cada usuario (y el invitado) tiene su propia llave de localStorage PARA
// EL CARRITO, para que el carrito de uno no se filtre al de otro dentro
// del mismo navegador.
//
// ⚠️ IMPORTANTE: esta llave scoped por usuario es SOLO para `items`
// (carrito en progreso). Los pedidos (`purchasedproducts`) YA NO viven acá
// — ver ordersKey() más abajo y la nota junto a ella sobre por qué.
function scopeKey(userId) {
  return `${STORAGE_PREFIX}:${userId || GUEST_SCOPE}`;
}

// Llave separada para la señal de "última reserva confirmada". Vive aparte
// del carrito porque necesita sobrevivir aunque checkout() ya haya vaciado
// state.items, y necesita poder "consumirse" (leerse una vez y borrarse)
// sin tocar el resto del estado del carrito.
function confirmationKey(userId) {
  return `${STORAGE_PREFIX}:last-confirmation:${userId || GUEST_SCOPE}`;
}

// ─── Llave GLOBAL para pedidos ───────────────────────────────────────
//
// Antes, purchasedproducts vivía adentro de la misma llave scoped por
// usuario que el carrito (ver scopeKey). Eso rompía Orders-company.vue:
// cada vez que activeUserId cambiaba (login/logout, o simplemente que el
// listener de Firebase Auth tardara un instante en resolver la sesión al
// recargar la página al día siguiente), el watch de ensureScopeWatcher
// recargaba items Y purchasedproducts juntos desde la llave del NUEVO
// activeUserId. Si esa llave no tenía pedidos guardados (porque nunca se
// compró nada estando logueado exactamente con ese id), los pedidos
// "desaparecían" de la vista del admin — no se borraban de verdad, solo
// se dejaba de leerlos.
//
// Los pedidos no deberían depender de quién está logueado en el momento:
// son datos globales que el admin necesita ver siempre. Por eso viven en
// su propia llave, sin importar activeUserId.
function ordersKey() {
  return `${STORAGE_PREFIX}:orders`;
}

function loadOrders() {
  return safeParse(localStorage.getItem(ordersKey())) || [];
}

function persistOrders() {
  localStorage.setItem(ordersKey(), JSON.stringify(state.purchasedproducts));
}

function loadScope(userId) {
  const stored = safeParse(localStorage.getItem(scopeKey(userId))) || { items: [] };
  return {
    items: stored.items || [],
  };
}

// ─── Migración de datos legados ──────────────────────────────────────
//
// Con el formato viejo, los pedidos podían estar guardados adentro de
// cualquier llave scoped (una por cada usuario que haya comprado algo).
// Esta función corre UNA vez al cargar el módulo: recorre todas las
// llaves de localStorage que empiecen con STORAGE_PREFIX, rescata los
// purchasedproducts que encuentre ahí, los junta (sin duplicar, por
// orderId) en la llave global de pedidos, y deja esas llaves scoped
// limpias (solo con items). Así no se pierde ningún pedido que ya
// estuviera guardado antes de este fix.
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
    if (key === ordersKey() || key.includes(':last-confirmation:')) continue;

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

    // Deja esa llave scoped solo con items: los pedidos ya viven en su
    // propia llave global.
    localStorage.setItem(key, JSON.stringify({ items: stored.items || [] }));
  }

  if (changed) {
    localStorage.setItem(ordersKey(), JSON.stringify(merged));
  }

  return merged;
}

// Arrancamos siempre como invitado; si ya hay sesión activa (ej. al
// refrescar la página logueado), el watch de abajo la sincroniza apenas
// se llama a useCart() por primera vez.
let activeUserId = null;
const initialOrders = migrateLegacyOrders();
const initialItems = loadScope(activeUserId).items;

const state = reactive({
  items: initialItems,
  purchasedproducts: initialOrders,
});

// Persiste SOLO el carrito (items). Los pedidos usan persistOrders().
function persist() {
  localStorage.setItem(
    scopeKey(activeUserId),
    JSON.stringify({
      items: state.items,
    }),
  );
}

// ─── Confirmación persistida ───
//
// Problema que resuelve: en mobile (sobre todo iOS Safari y WebViews tipo
// in-app browser), cuando wa.me abre la app de WhatsApp, el navegador suele
// descargar/recargar la pestaña que quedó en background. Al volver, Vue se
// remonta desde cero: cualquier estado que viviera solo en memoria (como un
// simple `ref` en el componente) se pierde, y como checkout() ya vació el
// carrito ANTES de intentar abrir WhatsApp, el usuario ve un carrito vacío
// sin ningún mensaje que le confirme que su reserva sí se registró.
//
// La solución: guardar en localStorage un flag con timestamp justo antes de
// intentar la redirección a WhatsApp. Cart.vue lo revisa al montarse
// (onMounted corre tanto en la primera carga como en cualquier remount
// forzado por el navegador) y, si lo encuentra vigente, muestra el mensaje
// de confirmación y lo borra para que no reaparezca en visitas futuras.
function saveLastConfirmation(userId) {
  localStorage.setItem(confirmationKey(userId), JSON.stringify({ timestamp: Date.now() }));
}

function consumeLastConfirmation(userId) {
  const raw = localStorage.getItem(confirmationKey(userId));
  if (!raw) return false;

  // Se borra siempre que se encuentra la llave, sea válida o no: es un
  // consumo de "una sola vez", no queremos que quede colgada para siempre
  // si por algún motivo el TTL la invalida.
  localStorage.removeItem(confirmationKey(userId));

  const parsed = safeParse(raw);
  if (!parsed || typeof parsed.timestamp !== 'number') return false;

  return Date.now() - parsed.timestamp < CONFIRMATION_TTL_MS;
}

let scopeWatcherStarted = false;

// Cambia el "cajón" activo de localStorage cuando cambia el usuario logueado
// (login o logout). El scope anterior ya quedó persistido (persist() se
// llama en cada mutación), así que acá solo hay que cargar el del nuevo.
//
// Nota: esto SOLO recarga `items` (el carrito). `purchasedproducts` ya no
// se toca acá — vive en su propia llave global (ver ordersKey arriba) y
// no depende de qué usuario esté activo.
function ensureScopeWatcher(sessionState) {
  if (scopeWatcherStarted) return;
  scopeWatcherStarted = true;

  // ⚠️ CLAVE: el watch() se registra dentro de un effectScope(true)
  // ("detached"), NO directamente en el setup() del componente que llamó
  // a useCart() por primera vez.
  //
  // useCart() se invoca típicamente desde dentro del setup() de algún
  // componente (ej. Navbar-item.vue, que aparece en TODAS las vistas pero
  // se desmonta y vuelve a montar en cada cambio de ruta, porque cada
  // vista incluye su propio <Navbar/> en vez de vivir en un layout
  // persistente en App.vue). Un watch() normal creado ahí queda atado al
  // ciclo de vida de ESE componente puntual, y Vue lo destruye
  // automáticamente en cuanto se desmonta -es decir, en la primera
  // navegación a otra página-. Como scopeWatcherStarted ya quedó en true,
  // ensureScopeWatcher() nunca lo volvía a registrar, y el carrito dejaba
  // de sincronizarse con el login/logout para siempre después de esa
  // primera navegación, sin ningún error visible.
  //
  // effectScope(true) crea un scope "desconectado" de cualquier
  // componente: el watch() que corre dentro sobrevive indefinidamente,
  // durante toda la vida de la aplicación, sin importar qué componente
  // particular disparó su creación ni cuándo se desmonte.
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
  const { state: sessionState } = useSession();
  ensureScopeWatcher(sessionState);

  // ─── Integración con reservas.js ───────────────────────────────────
  // Antes, checkout() nunca llamaba a holdReservation(), así que ninguna
  // reserva de fecha quedaba registrada en el sistema de reservas.js: el
  // calendario de disponibilidad nunca se enteraba de los pedidos hechos,
  // y las funciones confirmPurchasedReservation/releasePurchasedReservation
  // que Orders-company.vue necesitaba directamente NO EXISTÍAN en este
  // archivo (por eso los botones "Confirmar"/"Liberar" no hacían nada).
  const {
    holdReservation,
    confirmReservation,
    releaseReservation,
  } = useReservasServicio();

  const products = computed(() => getCompanyproducts());

  // eventDetails: objeto opcional con el detalle completo de la reserva
  // (dirección, distrito, horario, espacio, suelo, invitados, agua, etc.)
  // que arma ReservationForm.vue. Se guarda tal cual junto al item del
  // carrito para que Cart.vue pueda mostrarlo y enviarlo por WhatsApp.
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

  function checkout() {
    const userId = sessionState.user?.id ?? null;
    const purchased = state.items
      .map((cartItem, index) => {
        const product = products.value.find((c) => c.id === cartItem.productId);
        if (!product) return null;
        return {
          ...product,
          quantity: cartItem.quantity,
          reservationDate: cartItem.reservationDate ?? null,
          eventDetails: cartItem.eventDetails ?? null,
          orderId: `${Date.now()}-${index}-${product.id}-${Math.random().toString(36).slice(2, 8)}`,
          purchasedAt: new Date().toISOString(),
          userId,
        };
      })
      .filter(Boolean);

    // Aparta en reservas.js (estado PENDIENTE) la fecha de cada item que
    // tenga reservationDate, justo en el momento del checkout real — tal
    // como pide el comentario de holdReservation() en reservas.js. Esto es
    // lo que faltaba para que el calendario de disponibilidad y el flujo
    // de confirmar/liberar del admin tuvieran algún efecto real.
    purchased.forEach((order) => {
      if (order.reservationDate) {
        holdReservation(order.id, order.reservationDate, order.orderId);
      }
    });

    state.purchasedproducts.push(...purchased);
    clearCart(); // ya persiste `items`
    persistOrders();
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

  // Marca la reserva como confirmada (el admin validó que el cliente sí
  // envió el WhatsApp) y, crucialmente, avisa a reservas.js para que la
  // entrada correspondiente pase de PENDIENTE a CONFIRMADA — de lo
  // contrario, aunque el admin la confirme aquí, esa fecha se liberaría
  // sola a las 2 horas por el mecanismo de auto-expiración de reservas.js.
  function confirmPurchasedReservation(orderId) {
    if (!orderId) return;
    const item = state.purchasedproducts.find((order) => order.orderId === orderId);
    if (!item || item.confirmedAt || item.releasedAt) return;

    confirmReservation(orderId);
    item.confirmedAt = new Date().toISOString();
    persistOrders();
  }

  // Libera manualmente la reserva (el cliente nunca confirmó por
  // WhatsApp). Borra el registro correspondiente en reservas.js para que
  // la fecha quede disponible de inmediato para otro cliente.
  function releasePurchasedReservation(orderId) {
    if (!orderId) return;
    const item = state.purchasedproducts.find((order) => order.orderId === orderId);
    if (!item || item.confirmedAt || item.releasedAt) return;

    releaseReservation(orderId);
    item.releasedAt = new Date().toISOString();
    persistOrders();
  }

  // Wrappers que ya resuelven el userId activo, para que Cart.vue no tenga
  // que conocer el detalle de cómo se arma la llave de confirmación.
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
    getPurchasedproducts,
    markPurchasedCompleted,
    confirmPurchasedReservation,
    releasePurchasedReservation,
    saveLastConfirmation: saveLastConfirmationForCurrentUser,
    consumeLastConfirmation: consumeLastConfirmationForCurrentUser,
  };
}