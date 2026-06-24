<script setup>
import { computed, ref } from 'vue';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useCart } from '@/store/cart.js';
import { useSession } from '@/auth/session';
import { useLoyalty } from '@/store/loyalty';

const MAX_QUANTITY_PER_SNACK = 10;
const WHATSAPP_PHONE = '51975495623';

const { cartItems, cartTotal, cartCount, removeFromCart, updateQuantity, checkout } =
  useCart();
const { state: sessionState } = useSession();
const { getLoyaltyData, getDescuento, addReserva } = useLoyalty();

const loyaltyData = computed(() =>
  sessionState.user ? getLoyaltyData(sessionState.user.id) : getLoyaltyData(null),
);
const loyaltyDiscount = computed(() =>
  sessionState.user ? getDescuento(sessionState.user.id) : 0,
);
const discountAmount = computed(() => cartTotal.value * (loyaltyDiscount.value / 100));
const cartTotalWithDiscount = computed(() =>
  cartTotal.value * (1 - loyaltyDiscount.value / 100),
);

const showConfirmation = ref(false);
const submitting = ref(false);

function getItemPrice(item) {
  return Number(item.discount_price ?? item.price ?? 0);
}

function isService(item) {
  const serviceCategories = ['Inflables', 'Juegos', 'Shows Infantiles', 'Estética Infantil'];
  return serviceCategories.includes(item.category);
}

function shouldShowQuantityControls(item) {
  return !isService(item);
}

function increaseQuantity(item) {
  if (isService(item)) return;
  if (item.quantity >= MAX_QUANTITY_PER_SNACK) return;
  updateQuantity(item.id, item.quantity + 1);
}

function decreaseQuantity(item) {
  if (isService(item)) return;
  updateQuantity(item.id, item.quantity - 1);
}

function buildWhatsAppMessage() {
  const lines = cartItems.value.map(
    (item) =>
      `* ${item.name} x${item.quantity} - S/ ${(getItemPrice(item) * item.quantity).toFixed(2)}`,
  );

  const parts = [];
  parts.push('Hola Ani, quiero reservar lo siguiente:');
  parts.push('');
  parts.push(...lines);
  parts.push('');
  parts.push(`Subtotal: S/ ${cartTotal.value.toFixed(2)}`);

  if (loyaltyDiscount.value > 0) {
    parts.push(
      `Descuento ${loyaltyData.value.nivel} (-${loyaltyDiscount.value}%): -S/ ${discountAmount.value.toFixed(2)}`,
    );
  }

  parts.push(`Total: S/ ${cartTotalWithDiscount.value.toFixed(2)}`);

  // Unir con salto de línea real y encodear TODO el mensaje de una sola vez
  return parts.join('\n');
}

function confirmReservation() {
  if (cartCount.value === 0 || submitting.value) return;

  submitting.value = true;

  // Capturar el mensaje ANTES de llamar a checkout()
  const message = buildWhatsAppMessage();

  checkout();

  if (sessionState.user?.id) {
    addReserva(sessionState.user.id);
  }

  // Encodear correctamente: reemplazar \n por %0A explícitamente
  const encoded = message
    .split('\n')
    .map((line) => encodeURIComponent(line))
    .join('%0A');

  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;

  showConfirmation.value = true;

  setTimeout(() => {
    window.open(url, '_blank');
  }, 1200);
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

              <!-- CANTIDAD: mostrar controles SOLO para snacks -->
              <div v-if="shouldShowQuantityControls(item)" class="cart-controls">
                <button
                  class="qty-btn"
                  :disabled="item.quantity <= 1"
                  :class="{ 'qty-btn--disabled': item.quantity <= 1 }"
                  @click="decreaseQuantity(item)"
                  title="Disminuir cantidad"
                >
                  −
                </button>
                <span class="qty-value">{{ item.quantity }}</span>
                <button
                  class="qty-btn"
                  :disabled="item.quantity >= MAX_QUANTITY_PER_SNACK"
                  :class="{ 'qty-btn--disabled': item.quantity >= MAX_QUANTITY_PER_SNACK }"
                  @click="increaseQuantity(item)"
                  title="Aumentar cantidad"
                >
                  +
                </button>
              </div>

              <!-- Para servicios (juegos/inflables/shows): mostrar cantidad fija sin botones -->
              <div v-else class="service-quantity">
                <span class="qty-label">Cantidad:</span>
                <span class="qty-fixed">{{ item.quantity }}</span>
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
              <span>Subtotal</span>
              <span>S/ {{ cartTotal.toFixed(2) }}</span>
            </div>
            <div v-if="loyaltyDiscount > 0" class="summary-row discount-row">
              <span>🎁 Descuento {{ loyaltyData.nivel }} (-{{ loyaltyDiscount }}%)</span>
              <span>-S/ {{ discountAmount.toFixed(2) }}</span>
            </div>
            <div class="summary-total">
              <span>Total</span>
              <span>S/ {{ cartTotalWithDiscount.toFixed(2) }}</span>
            </div>
            <button class="checkout-btn" :disabled="submitting" @click="confirmReservation">
              {{ submitting ? 'Enviando...' : '📱 Reservar por WhatsApp' }}
            </button>

            <p v-if="showConfirmation" class="confirmation-message">
              ✅ ¡Tu reserva fue registrada! Pronto Ani te atenderá.
            </p>
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
  background-color: #FDF6EC;
  font-family: 'Nunito', sans-serif;
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
  color: #2D3E94;
  position: relative;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.main-title::after {
  content: '';
  width: 80px;
  height: 4px;
  background-color: #E91E81;
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
  border-radius: 24px;
  border: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  flex-wrap: wrap;
}

.cart-thumb {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 16px;
  flex-shrink: 0;
}

.cart-info {
  flex: 1;
  min-width: 120px;
}

.item-name {
  font-size: 1rem;
  font-weight: 600;
  color: #2D3E94;
  margin: 0 0 4px;
}

.item-price {
  font-size: 0.9rem;
  color: #E91E81;
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
  border: 2px solid #E91E81;
  border-radius: 999px;
  background: white;
  color: #E91E81;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
  line-height: 1;
}

.qty-btn:hover:not(:disabled) {
  background: #E91E81;
  color: white;
}

.qty-btn--disabled,
.qty-btn:disabled {
  border-color: #ddd;
  color: #bbb;
  cursor: not-allowed;
}

.qty-btn--disabled:hover,
.qty-btn:disabled:hover {
  background: white;
  color: #bbb;
}

.qty-value {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  color: #2D3E94;
}

/* Estilos para servicios (cantidad fija) */
.service-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  background: #f5f5f5;
  border-radius: 8px;
  height: 30px;
  min-width: 90px;
}

.qty-label {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.qty-fixed {
  font-size: 1rem;
  font-weight: 700;
  color: #2D3E94;
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
  border-radius: 24px;
  border: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.summary-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #2D3E94;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #2D3E94;
  margin-bottom: 12px;
}

.discount-row {
  color: #1c8c46;
  font-weight: 700;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: 700;
  color: #E91E81;
  border-top: 1px solid #eee;
  padding-top: 14px;
  margin-bottom: 22px;
}

.checkout-btn {
  width: 100%;
  padding: 14px;
  background: #FFD200;
  color: #2D3E94;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s;
}

.checkout-btn:hover:not(:disabled) {
  background: #f2c500;
  transform: translateY(-2px);
}

.checkout-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.confirmation-message {
  margin: 14px 0 0;
  padding: 12px 14px;
  background: rgba(37, 211, 102, 0.12);
  border: 1px solid rgba(37, 211, 102, 0.4);
  border-radius: 14px;
  color: #128C7E;
  font-weight: 700;
  font-size: 0.88rem;
  text-align: center;
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
  color: #2D3E94;
  margin-bottom: 28px;
}

.browse-btn {
  padding: 12px 30px;
  background: #FFD200;
  color: #2D3E94;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s;
}

.browse-btn:hover {
  background: #f2c500;
  transform: translateY(-2px);
}

@media (max-width: 700px) {
  .cart-summary {
    width: 100%;
  }
}
</style>