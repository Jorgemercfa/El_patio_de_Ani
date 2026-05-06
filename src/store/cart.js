import { reactive, computed } from 'vue';
import { getCompanyproducts } from '@/auth/companyproductsRepo';
import { useSession } from '@/auth/session';

const STORAGE_KEY = 'al-toque-cart';

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

  function addToCart(productId) {
    const existing = state.items.find((i) => i.productId === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.items.push({ productId, quantity: 1 });
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
    const item = state.items.find((i) => i.productId === productId);
    if (item) {
      item.quantity = Math.max(1, qty);
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
        return { ...product, quantity: item.quantity };
      })
      .filter(Boolean),
  );

  const cartTotal = computed(() =>
    cartItems.value.reduce(
      (sum, item) => sum + item.discount_price * item.quantity,
      0,
    ),
  );

  const cartCount = computed(() =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  function checkout() {
    const userId = sessionState.user?.id ?? null;
    const purchased = cartItems.value.map((item) => ({
      ...item,
      purchasedAt: new Date().toISOString(),
      userId,
    }));
    state.purchasedproducts.push(...purchased);
    clearCart();
    persist();
  }

  function getPurchasedproducts(userId) {
    return state.purchasedproducts.filter((c) => c.userId === userId);
  }

  return {
    cartItems,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
    getPurchasedproducts,
  };
}
