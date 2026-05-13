<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { getCompanyproducts } from '@/auth/companyproductsRepo';
import { useCart } from '@/store/cart.js';
import { useSession } from '@/auth/session';
import { PREMIUM_INFLABLE_PRICE, WHATSAPP_BUSINESS_NUMBER } from '@/constants/inflables';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();
const { isAuthenticated } = useSession();

const products = computed(() => getCompanyproducts());

const product = computed(() =>
  products.value.find((s) => s.id === Number(route.params.id)),
);

const parsePrice = (value) => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value !== 'string') return null;

  const cleaned = value.trim().replace(/[^\d.,-]/g, '');
  if (!cleaned) return null;

  const lastComma = cleaned.lastIndexOf(',');
  const lastDot = cleaned.lastIndexOf('.');
  const decimalIndex = Math.max(lastComma, lastDot);

  const normalizedValue =
    decimalIndex >= 0
      ? `${cleaned.slice(0, decimalIndex).replace(/[.,]/g, '')}.${cleaned
          .slice(decimalIndex + 1)
          .replace(/[.,]/g, '')}`
      : cleaned.replace(/[.,]/g, '');

  const parsed = Number(normalizedValue);
  return Number.isFinite(parsed) ? parsed : null;
};

const displayPrice = computed(() => {
  const currentProduct = product.value;
  if (!currentProduct) return null;

  return (
    parsePrice(currentProduct.price) ??
    parsePrice(currentProduct.discount_price) ??
    parsePrice(currentProduct.originalPrice) ??
    parsePrice(currentProduct.tributo)
  );
});

const isInflable = computed(() =>
  product.value?.category === 'Inflables',
);

const inflableSubcategory = computed(() => {
  const sub = product.value?.subcategory?.toLowerCase() || '';
  if (sub.includes('bebé') || sub.includes('bebe') || sub.includes('baby')) return 'bebes';
  if (sub.includes('grande')) return 'grande';
  return 'mediano';
});

const inflableDisplayTier = computed(() => {
  if (!isInflable.value) return null;

  if ((displayPrice.value || 0) > PREMIUM_INFLABLE_PRICE || inflableSubcategory.value === 'grande') {
    return 'grande';
  }

  return inflableSubcategory.value;
});

const inflableBadgeLabel = computed(() => {
  if (inflableDisplayTier.value === 'bebes') return '👶 Para Bebés';
  if (inflableDisplayTier.value === 'grande') return '🏰 Grande';
  if (inflableDisplayTier.value === 'mediano') return '🎪 Mediano';
  return '';
});

const addedFeedback = ref(false);
const reservationDate = ref('');
const reservationError = ref('');
const todayDate = computed(() => new Date().toISOString().split('T')[0]);

function handleAddToCart() {
  if (!isAuthenticated.value) {
    router.push({ name: 'SignIn' });
    return;
  }
  if (!reservationDate.value) {
    reservationError.value = 'Selecciona la fecha del evento para continuar.';
    return;
  }
  reservationError.value = '';
  addToCart(product.value.id, reservationDate.value);
  addedFeedback.value = true;
  setTimeout(() => {
    addedFeedback.value = false;
  }, 1500);
}

function reserveInflable() {
  router.push({ path: '/Inflable-reserva', query: { id: product.value.id } });
}

function consultInflableByWhatsApp() {
  const productName = product.value?.name || 'inflable';
  const message = `Hola! Quiero consultar disponibilidad del inflable ${productName} para mi evento.`;
  const url = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function getScrollContainer() {
  return document.scrollingElement || document.documentElement || document.body;
}

async function forceScrollTop() {
  await nextTick();

  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  const el = getScrollContainer();
  if (el) el.scrollTop = 0;

  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const el2 = getScrollContainer();
    if (el2) el2.scrollTop = 0;
  }, 50);

  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const el3 = getScrollContainer();
    if (el3) el3.scrollTop = 0;
  }, 250);
}

onMounted(() => {
  forceScrollTop();
});

watch(
  () => route.params.id,
  () => {
    forceScrollTop();
    reservationDate.value = '';
    reservationError.value = '';
  },
);
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main class="container">
    <div v-if="product" class="product-wrapper">
      <router-link to="/product-item" class="return-area">
        <button class="card-button">Regresar</button>
      </router-link>

      <h1 class="title">{{ product.name }}</h1>

      <div class="header-badges">
        <span v-if="product.category" class="badge badge-category">{{ product.category }}</span>
        <span v-if="product.subcategory" class="badge badge-subcategory">{{ product.subcategory }}</span>
        <span
          v-if="inflableBadgeLabel"
          class="badge"
          :class="`badge-inflable-${inflableDisplayTier}`"
        >
          {{ inflableBadgeLabel }}
        </span>
      </div>

      <img
        v-if="product.image"
        class="product-image-details"
        :src="product.image"
      />

      <div class="product-prices">
        <span class="discount-price">
          S/ {{ displayPrice !== null ? displayPrice.toFixed(2) : '-' }}
        </span>
      </div>

      <div class="text-product-type">
        {{ product.longDescription }}
      </div>

      <div class="product-details">
        <div class="product-info">
          <div class="info-item" v-if="product.duration">
            <span class="label">Duración</span>
            <span class="value">{{ product.duration }}</span>
          </div>
          <div class="info-item" v-if="product.age_range">
            <span class="label">Edad recomendada</span>
            <span class="value">{{ product.age_range }}</span>
          </div>
          <div class="info-item" v-if="product.dimensions">
            <span class="label">Dimensiones</span>
            <span class="value">{{ product.dimensions }}</span>
          </div>
          <div class="info-item" v-if="product.capacity">
            <span class="label">Capacidad</span>
            <span class="value">{{ product.capacity }}</span>
          </div>
        </div>

        <div class="product-options" v-if="product.options?.length">
          <span class="label">Incluye</span>
          <div class="options-tags">
            <span
              class="option-tag"
              v-for="option in product.options"
              :key="option"
            >{{ option }}</span>
          </div>
        </div>

        <div class="product-terms" v-if="product.Terms_of_use">
          <span class="label">Términos de uso</span>
          <p class="terms-text">{{ product.Terms_of_use }}</p>
        </div>

        <div v-if="isInflable" class="inflable-actions">
          <button
            v-if="isAuthenticated"
            class="buy-button"
            @click="reserveInflable"
          >
            📋 Reservar este inflable
          </button>

          <template v-else>
            <button class="wa-button" @click="consultInflableByWhatsApp">
              💬 Consultar disponibilidad
            </button>
            <button class="secondary-login-button" @click="router.push('/Sign-in')">
              🔑 Iniciar sesión para reservar
            </button>
          </template>
        </div>

        <template v-else>
          <div class="reservation-date-section">
            <label class="label" for="reservation-date">📅 Fecha del evento</label>
            <input
              id="reservation-date"
              v-model="reservationDate"
              class="reservation-date-input"
              type="date"
              :min="todayDate"
            />
            <p v-if="reservationError" class="reservation-error">{{ reservationError }}</p>
          </div>

          <button class="buy-button" @click="handleAddToCart">
            {{ addedFeedback ? '✓ Agregado' : 'Agregar al carrito' }}
          </button>
        </template>
      </div>
    </div>

    <div v-else class="not-found">
      <p>Servicio no encontrado.</p>
    </div>
  </main>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: Outfit, Inter, Avenir, Helvetica, Arial, sans-serif;
}

.product-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
}

.return-area {
  align-self: flex-start;
  margin-bottom: 16px;
}

.title {
  font-size: 2.1rem;
  margin-bottom: 14px;
  position: relative;
  display: inline-block;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title::after {
  content: '';
  width: 70px;
  height: 4px;
  background-color: #E91E81;
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 6px;
}

.header-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 8px 0 20px;
}

.badge {
  font-size: 0.77rem;
  font-weight: 700;
  border-radius: 999px;
  padding: 5px 12px;
}

.badge-category {
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  color: #fff;
}

.badge-subcategory {
  background: #f0f4ff;
  color: #1a2d7a;
}

.badge-inflable-bebes {
  background: #efe7ff;
  color: #4f3d9a;
}

.badge-inflable-mediano {
  background: #e6f8e8;
  color: #1b6b32;
}

.badge-inflable-grande {
  background: #fff2d9;
  color: #8a5b00;
}

.product-image-details {
  width: 100%;
  max-width: 820px;
  max-height: 460px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 26px;
  box-shadow: 0 10px 30px rgba(45, 62, 148, 0.16);
}

.text-product-type {
  max-width: 800px;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #2D3E94;
  opacity: 0.9;
  margin-bottom: 28px;
}

.product-prices {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 0 0 18px;
}

.discount-price {
  font-size: 1.9rem;
  font-weight: 800;
  color: #E91E81;
}

.product-details {
  width: 100%;
  max-width: 720px;
  margin-top: 8px;
}

.product-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
}

.info-item {
  background: rgba(233, 30, 129, 0.06);
  border: 1px solid rgba(233, 30, 129, 0.2);
  padding: 12px 14px;
  border-radius: 12px;
  text-align: left;
}

.label {
  display: block;
  font-size: 0.85rem;
  color: #E91E81;
  margin-bottom: 2px;
}

.value {
  font-weight: 600;
  color: #2D3E94;
}

.product-options {
  width: 100%;
  margin-bottom: 18px;
  text-align: left;
}

.options-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.option-tag {
  background: #FFD200;
  color: #2D3E94;
  font-size: 0.84rem;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 20px;
}

.product-terms {
  width: 100%;
  background: rgba(233, 30, 129, 0.05);
  border-left: 3px solid #E91E81;
  border-radius: 0 10px 10px 0;
  padding: 12px 16px;
  margin-bottom: 22px;
  text-align: left;
}

.terms-text {
  font-size: 0.9rem;
  color: #2D3E94;
  opacity: 0.85;
  margin: 4px 0 0;
  line-height: 1.6;
}

.reservation-date-section {
  margin-bottom: 16px;
  text-align: left;
}

.reservation-date-input {
  width: 100%;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  padding: 10px 12px;
}

.reservation-date-input:focus {
  outline: none;
  border-color: #E91E81;
  box-shadow: 0 0 0 3px rgba(233, 30, 129, 0.12);
}

.reservation-error {
  margin: 6px 0 0;
  color: #b00020;
  font-size: 0.88rem;
  font-weight: 600;
}

.inflable-actions {
  display: grid;
  gap: 12px;
}

.buy-button,
.wa-button,
.secondary-login-button {
  width: 100%;
  border: none;
  padding: 14px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.25s;
}

.buy-button {
  background: #FFD200;
  color: #2D3E94;
  box-shadow: 0 4px 16px rgba(255, 210, 0, 0.4);
}

.buy-button:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 20px rgba(255, 210, 0, 0.55);
}

.wa-button {
  background: #25D366;
  color: #fff;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.35);
}

.wa-button:hover {
  transform: scale(1.02);
  box-shadow: 0 7px 20px rgba(37, 211, 102, 0.5);
}

.secondary-login-button {
  background: #fff;
  color: #E91E81;
  border: 2px solid #E91E81;
}

.secondary-login-button:hover {
  transform: scale(1.02);
  background: #fff0f7;
}

.card-button {
  background-color: #FFFFFF;
  color: #2D3E94;
  border: 2px solid #E91E81;
  padding: 10px 22px;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.card-button:hover {
  background-color: #E91E81;
  color: #FFFFFF;
}

.not-found {
  text-align: center;
  padding: 40px 20px;
  font-size: 1.2rem;
  color: #2D3E94;
  opacity: 0.6;
}

@media (max-width: 700px) {
  .container {
    padding: 24px 12px;
  }

  .product-wrapper {
    padding: 16px;
  }

  .title {
    font-size: 1.6rem;
  }

  .discount-price {
    font-size: 1.5rem;
  }
}
</style>
