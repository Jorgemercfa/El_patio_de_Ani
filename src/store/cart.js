import { reactive, computed, watch, effectScope } from 'vue';
import { getCompanyproducts } from '@/auth/companyproductsRepo';
import { useSession } from '@/auth/session';

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

// Cada usuario (y el invitado) tiene su propia llave de localStorage, para
// que el carrito de uno no se filtre al de otro dentro del mismo navegador.
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

function loadScope(userId) {
  const stored = safeParse(localStorage.getItem(scopeKey(userId))) || {
    items: [],
    purchasedproducts: [],
  };
  return {
    items: stored.items || [],
    purchasedproducts: stored.purchasedproducts || [],
  };
}

// Arrancamos siempre como invitado; si ya hay sesión activa (ej. al
// refrescar la página logueado), el watch de abajo la sincroniza apenas
// se llama a useCart() por primera vez.
let activeUserId = null;
const initial = loadScope(activeUserId);

const state = reactive({
  items: initial.items,
  purchasedproducts: initial.purchasedproducts,
});

function persist() {
  localStorage.setItem(
    scopeKey(activeUserId),
    JSON.stringify({
      items: state.items,
      purchasedproducts: state.purchasedproducts,
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
        state.purchasedproducts.splice(0, state.purchasedproducts.length, ...scoped.purchasedproducts);
      },
      { immediate: true },
    );
  });
}

export function useCart() {
  const { state: sessionState } = useSession();
  ensureScopeWatcher(sessionState);

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
    state.purchasedproducts.push(...purchased);
    clearCart();
    persist();
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
    persist();
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
    saveLastConfirmation: saveLastConfirmationForCurrentUser,
    consumeLastConfirmation: consumeLastConfirmationForCurrentUser,
  };
}