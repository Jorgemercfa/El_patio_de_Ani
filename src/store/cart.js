import { reactive, computed } from 'vue';
import { getCompanyproducts } from '@/auth/companyproductsRepo';
import { useSession } from '@/auth/session';

const STORAGE_KEY = 'al-toque-cart';

// Categorías cuya reserva representa un único evento/servicio: nunca deben
// acumular cantidad al volver a agregarse (ej. confirmar una reserva
// detallada de un inflable que ya estaba en el carrito).
const SERVICE_CATEGORIES = ['Inflables', 'Shows Infantiles', 'Estética Infantil'];

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const stored = safeParse(localStorage.getItem(STORAGE_KEY)) || {
  items: [],
  purchasedproducts: [],
};

const state = reactive({
  items: stored.items || [],
  purchasedproducts: stored.purchasedproducts || [],
});

function persist() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      items: state.items,
      purchasedproducts: state.purchasedproducts,
    }),
  );
}

export function useCart() {
  const { state: sessionState } = useSession();
  const products = computed(() => getCompanyproducts());

  function addToCart(productId, reservationDate = null) {
    const product = products.value.find((p) => p.id === productId);
    const isServiceProduct = SERVICE_CATEGORIES.includes(product?.category);
    const existing = state.items.find((i) => i.productId === productId);
    if (existing) {
      // Los servicios (inflables, shows, estética) son una única reserva:
      // volver a "agregarla" (ej. al confirmar el formulario de reserva
      // detallada) no debe duplicar la cantidad reservada.
      existing.quantity = isServiceProduct ? 1 : existing.quantity + 1;
      if (reservationDate) existing.reservationDate = reservationDate;
    } else {
      state.items.push({ productId, quantity: 1, reservationDate });
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
    // When userId is not provided, return all orders for admin views.
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
  };
}
