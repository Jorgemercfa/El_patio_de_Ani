<script setup>
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useCart } from '@/store/cart.js';
import { useSession } from '@/auth/session';

const router = useRouter();
const { cartItems, cartTotal, cartCount, removeFromCart, updateQuantity } =
  useCart();
const { isAuthenticated } = useSession();

function goToCheckout() {
  if (!isAuthenticated.value) {
    router.push({ name: 'SignIn' });
    return;
  }
  router.push({ name: 'Checkout' });
}

function getItemPrice(item) {
  return Number(item.discount_price ?? item.price ?? 0);
}
</script>

<template>
  <div class="page-wrapper">
    <header>
      <Navbar />
    </header>

    <section class="cart-section">
      <div class="cart-container">
        <h1 class="main-title">Carrito de compras</h1>

        <div v-if="cartCount > 0" class="cart-layout">
          <div class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-card">
              <img :src="item.image" :alt="item.name" class="cart-thumb" />
              <div class="cart-info">
                <h3 class="item-name">{{ item.name }}</h3>
                <p class="item-price">
                  S/ {{ getItemPrice(item).toFixed(2) }}
                </p>
              </div>
              <div class="cart-controls">
                <button
                  class="qty-btn"
                  @click="updateQuantity(item.id, item.quantity - 1)"
                >
                  −
                </button>
                <span class="qty-value">{{ item.quantity }}</span>
                <button
                  class="qty-btn"
                  @click="updateQuantity(item.id, item.quantity + 1)"
                >
                  +
                </button>
              </div>
              <button
                class="remove-btn"
                @click="removeFromCart(item.id)"
                title="Eliminar"
              >
                ✕
              </button>
            </div>
          </div>

          <div class="cart-summary">
            <h2 class="summary-title">Resumen</h2>
            <div class="summary-row">
              <span>
                Subtotal ({{ cartCount }} item{{ cartCount !== 1 ? 's' : '' }})
              </span>
              <span>S/ {{ cartTotal.toFixed(2) }}</span>
            </div>
            <div class="summary-total">
              <span>Total</span>
              <span>S/ {{ cartTotal.toFixed(2) }}</span>
            </div>
            <button class="checkout-btn" @click="goToCheckout">
              Proceder al pago
            </button>
          </div>
        </div>

        <div v-else class="empty-state">
          <p class="empty-icon">🛒</p>
          <p class="empty-msg">Tu carrito está vacío</p>
          <router-link to="/product-item">
            <button class="browse-btn">Ver productos</button>
          </router-link>
        </div>
      </div>
    </section>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f6f3;
}

.cart-section {
  flex: 1;
  padding: 80px 0 60px;
}

.cart-container {
  width: 90%;
  max-width: 1100px;
  margin: auto;
}

.main-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 40px;
  color: #111;
  position: relative;
}

.main-title::after {
  content: '';
  width: 80px;
  height: 4px;
  background-color: #325bcd;
  display: block;
  margin-top: 10px;
  border-radius: 2px;
}

.cart-layout {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.cart-items {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  padding: 16px;
  border-radius: 14px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
  flex-wrap: wrap;
}

.cart-thumb {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
}

.cart-info {
  flex: 1;
  min-width: 120px;
}

.item-name {
  font-size: 1rem;
  font-weight: 600;
  color: #222;
  margin: 0 0 4px;
}

.item-price {
  font-size: 0.9rem;
  color: #555;
  margin: 0;
}

.cart-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border: 2px solid #325bcd;
  border-radius: 6px;
  background: white;
  color: #325bcd;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
  line-height: 1;
}

.qty-btn:hover {
  background: #325bcd;
  color: white;
}

.qty-value {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}

.item-subtotal {
  font-weight: 700;
  color: #325bcd;
  min-width: 70px;
  text-align: right;
  margin: 0;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s;
  padding: 4px;
}

.remove-btn:hover {
  color: #e53935;
}

.cart-summary {
  width: 280px;
  background: white;
  padding: 28px;
  border-radius: 14px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
}

.summary-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #111;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 12px;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111;
  border-top: 1px solid #eee;
  padding-top: 14px;
  margin-bottom: 22px;
}

.checkout-btn {
  width: 100%;
  padding: 14px;
  background: #325bcd;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s;
}

.checkout-btn:hover {
  background: #2549ad;
  transform: translateY(-2px);
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 12px;
}

.empty-msg {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 28px;
}

.browse-btn {
  padding: 12px 30px;
  background: #325bcd;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s;
}

.browse-btn:hover {
  background: #2549ad;
  transform: translateY(-2px);
}

@media (max-width: 700px) {
  .cart-summary {
    width: 100%;
  }
}
</style>