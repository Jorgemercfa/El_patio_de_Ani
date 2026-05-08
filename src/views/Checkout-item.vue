<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useCart } from '@/store/cart.js';

const router = useRouter();
const { cartItems, cartTotal, checkout } = useCart();

const form = ref({
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
});

const errors = ref({});
const submitting = ref(false);

function formatCardNumber(e) {
  let value = e.target.value.replace(/\D/g, '').substring(0, 16);
  form.value.cardNumber = value.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(e) {
  let value = e.target.value.replace(/\D/g, '').substring(0, 4);
  if (value.length >= 3) {
    value = value.substring(0, 2) + '/' + value.substring(2);
  }
  form.value.expiry = value;
}

function validate() {
  const errs = {};
  if (!form.value.cardName.trim()) errs.cardName = 'Ingresa el nombre en la tarjeta.';
  const digits = form.value.cardNumber.replace(/\s/g, '');
  if (digits.length !== 16) errs.cardNumber = 'El número de tarjeta debe tener 16 dígitos.';
  if (!/^\d{2}\/\d{2}$/.test(form.value.expiry)) {
    errs.expiry = 'Formato válido: MM/YY.';
  } else {
    const [mm, yy] = form.value.expiry.split('/').map(Number);
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (mm < 1 || mm > 12) {
      errs.expiry = 'Mes inválido (01–12).';
    } else if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
      errs.expiry = 'La tarjeta está vencida.';
    }
  }
  if (!/^\d{3}$/.test(form.value.cvv)) errs.cvv = 'El CVV debe tener 3 dígitos.';
  errors.value = errs;
  return Object.keys(errs).length === 0;
}

function confirmPayment() {
  if (!validate()) return;
  submitting.value = true;
  setTimeout(() => {
    checkout();
    submitting.value = false;
    router.push({ name: 'OrderConfirmation' });
  }, 800);
}
</script>

<template>
  <div class="page-wrapper">
    <header>
      <Navbar />
    </header>

    <section class="checkout-section">
      <div class="checkout-container">
        <h1 class="main-title">Checkout</h1>

        <div class="checkout-layout">
          <!-- Order summary -->
          <div class="order-summary">
            <h2 class="section-title">Resumen del pedido</h2>
            <div v-for="item in cartItems" :key="item.id" class="order-row">
              <span class="order-name">{{ item.name }} <span class="order-qty">x{{ item.quantity }}</span></span>
              <span class="order-price">S/ {{ (Number(item.discount_price ?? item.price ?? 0) * item.quantity).toFixed(2) }}</span>
            </div>
            <div class="order-total">
              <span>Total</span>
              <span>S/ {{ cartTotal.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Payment form -->
          <div class="payment-card">
            <h2 class="section-title">Datos de pago</h2>

            <div class="form-group">
              <label>Nombre en la tarjeta</label>
              <input
                v-model="form.cardName"
                type="text"
                placeholder="Juan García"
                :class="{ 'input-error': errors.cardName }"
              />
              <span v-if="errors.cardName" class="error-msg">{{ errors.cardName }}</span>
            </div>

            <div class="form-group">
              <label>Número de tarjeta</label>
              <input
                :value="form.cardNumber"
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                maxlength="19"
                :class="{ 'input-error': errors.cardNumber }"
                @input="formatCardNumber"
              />
              <span v-if="errors.cardNumber" class="error-msg">{{ errors.cardNumber }}</span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Fecha de expiración</label>
                <input
                  :value="form.expiry"
                  type="text"
                  placeholder="MM/YY"
                  maxlength="5"
                  :class="{ 'input-error': errors.expiry }"
                  @input="formatExpiry"
                />
                <span v-if="errors.expiry" class="error-msg">{{ errors.expiry }}</span>
              </div>

              <div class="form-group">
                <label>CVV</label>
                <input
                  v-model="form.cvv"
                  type="text"
                  placeholder="123"
                  maxlength="3"
                  :class="{ 'input-error': errors.cvv }"
                  @input="form.cvv = form.cvv.replace(/\D/g, '').substring(0, 3)"
                />
                <span v-if="errors.cvv" class="error-msg">{{ errors.cvv }}</span>
              </div>
            </div>

            <p class="secure-note">🔒 Pago seguro simulado. No se procesará ningún cargo real.</p>

            <button class="pay-btn" :disabled="submitting" @click="confirmPayment">
              {{ submitting ? 'Procesando...' : 'Confirmar Pago' }}
            </button>
          </div>
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

.checkout-section {
  flex: 1;
  padding: 80px 0 60px;
}

.checkout-container {
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

.checkout-layout {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  flex-wrap: wrap;
}

/* Order summary */
.order-summary {
  flex: 1;
  min-width: 260px;
  background: white;
  padding: 28px;
  border-radius: 14px;
  border: 2px solid #E91E81;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
}

.section-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 18px;
  color: #2D3E94;
}

.order-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #444;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.order-name {
  flex: 1;
}

.order-qty {
  color: #888;
  font-size: 0.85rem;
  margin-left: 6px;
}

.order-price {
  font-weight: 600;
  color: #222;
}

.order-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: 700;
  color: #E91E81;
  padding-top: 14px;
  margin-top: 6px;
}

/* Payment card */
.payment-card {
  flex: 1.5;
  min-width: 300px;
  background: white;
  padding: 36px;
  border-radius: 14px;
  border: 2px solid #E91E81;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 6px;
  color: #E91E81;
  font-size: 0.9rem;
}

.form-group input {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1.5px solid #ddd;
  font-size: 1rem;
  transition: border 0.2s;
  outline: none;
}

.form-group input:focus {
  border-color: #E91E81;
}

.input-error {
  border-color: #e53935 !important;
}

.error-msg {
  font-size: 0.8rem;
  color: #e53935;
  margin-top: 4px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  flex: 1;
}

.secure-note {
  font-size: 0.82rem;
  color: #888;
  margin-bottom: 20px;
}

.pay-btn {
  width: 100%;
  padding: 14px;
  background: #FFD200;
  color: #2D3E94;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s;
}

.pay-btn:hover:not(:disabled) {
  background: #f2c500;
  transform: translateY(-2px);
}

.pay-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 700px) {
  .form-row {
    flex-direction: column;
  }
}
</style>
