<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { fetchCompanyproducts, getCompanyproducts } from '@/auth/companyproductsRepo';
import { useCart } from '@/store/cart.js';
import { useReservasServicio } from '@/store/reservas';
import { useSession } from '@/auth/session';
import { useReviews } from '@/store/reviews.js';
import { PREMIUM_INFLABLE_PRICE, WHATSAPP_BUSINESS_NUMBER } from '@/constants/inflables';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();
const { state: sessionState } = useSession();
const { isDateAvailable } = useReservasServicio();
const { fetchReviews, addReview, getAverageRating, reviewsCache } = useReviews();

const reviews = computed(() => reviewsCache.value[Number(route.params.id)] || []);
const avgRating = computed(() => getAverageRating(route.params.id));
const reviewForm = ref({ rating: 5, comment: '' });
const reviewSubmitting = ref(false);
const reviewError = ref('');
const reviewSuccess = ref(false);

async function submitReview() {
  if (!isAuthenticated.value) {
    router.push('/Sign-in');
    return;
  }
  if (!reviewForm.value.comment.trim()) {
    reviewError.value = 'Escribe un comentario antes de enviar.';
    return;
  }
  reviewSubmitting.value = true;
  reviewError.value = '';
  try {
    await addReview(
      route.params.id,
      state.user.uid,
      state.user.name || state.user.email,
      reviewForm.value.rating,
      reviewForm.value.comment,
    );
    reviewForm.value = { rating: 5, comment: '' };
    reviewSuccess.value = true;
    setTimeout(() => { reviewSuccess.value = false; }, 3000);
  } catch (err) {
    console.error('[Reviews] Error enviando reseña:', err);
    reviewError.value = 'No se pudo enviar la reseña. Intenta de nuevo.';
  } finally {
    reviewSubmitting.value = false;
  }
}

function formatReviewDate(createdAt) {
  const ms = createdAt?.seconds ? createdAt.seconds * 1000 : createdAt;
  return new Date(ms).toLocaleDateString('es-PE');
}

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

const isSnack = computed(() =>
  product.value?.category === 'Carritos Snacks',
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
const todayDate = computed(() => new Date().toLocaleDateString('en-CA'));
const isSelectedDateAvailable = computed(() => {
  if (!reservationDate.value || !product.value || isInflable.value) return null;
  return isDateAvailable(product.value.id, reservationDate.value);
});
const availabilityLabel = computed(() => {
  if (!reservationDate.value) return 'Selecciona una fecha para verificar disponibilidad';
  return isSelectedDateAvailable.value ? '✅ Fecha disponible' : '🔴 Fecha reservada';
});

function handleAddToCartSnack() {
  if (!isAuthenticated.value) {
    router.push({ name: 'SignIn' });
    return;
  }
  // Para snacks: agregar directo sin fecha
  reservationError.value = '';
  addToCart(product.value.id, null); // null = sin fecha de reserva
  addedFeedback.value = true;
  setTimeout(() => {
    addedFeedback.value = false;
  }, 1500);
}

function handleAddToCartService() {
  if (!isAuthenticated.value) {
    router.push({ name: 'SignIn' });
    return;
  }
  if (!reservationDate.value) {
    reservationError.value = 'Selecciona la fecha del evento para continuar.';
    return;
  }
  if (!isDateAvailable(product.value.id, reservationDate.value)) {
    reservationError.value = 'La fecha seleccionada no está disponible para este servicio.';
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

function reserveServicio() {
  router.push({ path: '/Servicio-reserva', query: { id: product.value.id } });
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

onMounted(async () => {
  await fetchCompanyproducts();
  forceScrollTop();
  if (route.params.id) {
    await fetchReviews(route.params.id);
  }
});

watch(
  () => route.params.id,
  async (newId) => {
    forceScrollTop();
    reservationDate.value = '';
    reservationError.value = '';
    if (newId) {
      await fetchReviews(newId);
    }
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

        <!-- ===== INFLABLES: Botón especial ===== -->
        <div v-if="isInflable" class="inflable-actions">
          <button
            v-if="isAuthenticated"
            class="buy-button primary-action-btn"
            @click="reserveInflable"
          >
            📋 Reservar este inflable
          </button>

          <template v-else>
            <button class="wa-button" @click="consultInflableByWhatsApp">
              💬 Consultar disponibilidad
            </button>
            <button class="secondary-login-button" @click="router.push('/Sign-in')">
              🔑 Inicia sesión y obtener descuentos
            </button>
          </template>
        </div>

        <!-- ===== SNACKS: Agregar directo sin fecha ===== -->
        <div v-else-if="isSnack" class="snack-actions">
          <button
            v-if="isAuthenticated"
            class="buy-button primary-action-btn"
            @click="handleAddToCartSnack"
          >
            {{ addedFeedback ? '✓ Agregado al carrito' : '🛒 Agregar al carrito' }}
          </button>

          <template v-else>
            <button class="secondary-login-button" @click="router.push('/Sign-in')">
              🔑 Inicia sesión para comprar
            </button>
          </template>
        </div>

        <!-- ===== OTROS SERVICIOS: Con selector de fecha ===== -->
        <template v-else>
          <div class="reservation-date-section">
            <label class="label" for="reservation-date">📅 Fecha del evento</label>
            <input
              id="reservation-date"
              v-model="reservationDate"
              class="reservation-date-input"
              type="date"
              :min="todayDate"
              required
              aria-required="true"
            />
            <p
              class="availability-indicator"
              :class="{ available: isSelectedDateAvailable === true, unavailable: isSelectedDateAvailable === false }"
            >
              {{ availabilityLabel }}
            </p>
            <p v-if="reservationError" class="reservation-error" aria-live="polite">
              {{ reservationError }}
            </p>
          </div>

          <button class="buy-button reserve-service-btn primary-action-btn" @click="reserveServicio">
            📋 Reservar este servicio
          </button>

          <button
            v-if="isAuthenticated"
            class="buy-button"
            :disabled="!reservationDate || isSelectedDateAvailable !== true"
            :title="!reservationDate || isSelectedDateAvailable !== true ? 'Selecciona una fecha disponible para agregar al carrito' : 'Agregar al carrito'"
            aria-label="Agregar al carrito"
            @click="handleAddToCartService"
          >
            {{ addedFeedback ? '✓ Agregado' : 'Agregar al carrito' }}
          </button>

          <p v-else class="login-cart-hint">
            Para acceder a descuentos
            <router-link to="/Sign-in" class="login-cart-link">inicia sesión</router-link>
          </p>
        </template>
      </div>
    </div>

    <div v-else class="not-found">
      <p>Servicio no encontrado.</p>
    </div>
  </main>

  <!-- ===== SECCIÓN DE REVIEWS ===== -->
  <section class="reviews-section">
    <div class="reviews-container">
      <div class="reviews-header">
        <h2 class="reviews-title">⭐ Opiniones de clientes</h2>
        <div v-if="reviews.length > 0" class="reviews-avg">
          <span class="avg-number">{{ avgRating }}</span>
          <div class="avg-stars">
            <span v-for="n in 5" :key="n" :class="['star', n <= Math.round(avgRating) ? 'star--filled' : 'star--empty']">★</span>
          </div>
          <span class="avg-count">({{ reviews.length }} {{ reviews.length === 1 ? 'opinión' : 'opiniones' }})</span>
        </div>
      </div>

      <!-- Lista de reviews existentes -->
      <div v-if="reviews.length > 0" class="reviews-list">
        <div v-for="review in reviews" :key="review.id" class="review-card">
          <div class="review-top">
            <span class="review-author">👤 {{ review.userName }}</span>
            <div class="review-stars">
              <span v-for="n in 5" :key="n" :class="['star', n <= review.rating ? 'star--filled' : 'star--empty']">★</span>
            </div>
          </div>
          <p class="review-comment">{{ review.comment }}</p>
          <span class="review-date">{{ formatReviewDate(review.createdAt) }}</span>
        </div>
      </div>
      <div v-else class="reviews-empty">
        <p>Sé el primero en dejar tu opinión sobre este servicio ✨</p>
      </div>

      <!-- Formulario para dejar review -->
      <div class="review-form-wrapper">
        <h3 class="review-form-title">{{ isAuthenticated ? '📝 Deja tu opinión' : '🔑 Inicia sesión para comentar' }}</h3>

        <template v-if="isAuthenticated">
          <div class="review-rating-selector">
            <span class="rating-label">Tu calificación:</span>
            <div class="rating-stars-input">
              <button
                v-for="n in 5"
                :key="n"
                type="button"
                class="star-btn"
                :class="{ 'star-btn--active': n <= reviewForm.rating }"
                @click="reviewForm.rating = n"
              >★</button>
            </div>
          </div>
          <textarea
            v-model="reviewForm.comment"
            class="review-textarea"
            placeholder="Cuéntanos tu experiencia con este servicio..."
            rows="4"
            maxlength="500"
          ></textarea>
          <div class="review-form-footer">
            <span class="char-count">{{ reviewForm.comment.length }}/500</span>
            <p v-if="reviewError" class="review-error">{{ reviewError }}</p>
            <p v-if="reviewSuccess" class="review-success">✅ ¡Gracias por tu opinión!</p>
            <button
              class="review-submit-btn"
              :disabled="reviewSubmitting"
              @click="submitReview"
            >
              {{ reviewSubmitting ? 'Enviando...' : '📤 Enviar opinión' }}
            </button>
          </div>
        </template>
        <template v-else>
          <p class="review-login-prompt">
            <router-link to="/Sign-in" class="review-login-link">Inicia sesión</router-link> para dejar tu opinión.
          </p>
        </template>
      </div>
    </div>
  </section>

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
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
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

.availability-indicator {
  margin: 10px 0 0;
  font-size: 0.88rem;
  font-weight: 700;
}

.availability-indicator.available {
  color: #1b6b32;
}

.availability-indicator.unavailable {
  color: #b00020;
}

.inflable-actions,
.snack-actions {
  display: grid;
  gap: 12px;
}

.reserve-service-btn {
  margin-bottom: 10px;
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

.buy-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
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

.login-cart-hint {
  text-align: center;
  font-size: 0.95rem;
  color: #2D3E94;
  margin: 4px 0 0;
}

.login-cart-link {
  color: #E91E81;
  font-weight: 700;
  text-decoration: underline;
}

.login-cart-link:hover {
  opacity: 0.8;
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

  .primary-action-btn {
    position: sticky;
    bottom: 16px;
    z-index: 10;
    box-shadow: 0 8px 24px rgba(255, 210, 0, 0.6);
    width: 100%;
  }

  .primary-action-btn:hover {
    transform: none;
  }
}

/* ===== REVIEWS ===== */
.reviews-section {
  background: #FDF6EC;
  padding: 48px 20px;
  font-family: 'Nunito', sans-serif;
}
.reviews-container {
  max-width: 800px;
  margin: 0 auto;
}
.reviews-header {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}
.reviews-title {
  font-size: 1.6rem;
  font-weight: 800;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}
.reviews-avg {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 8px 16px;
  border-radius: 999px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}
.avg-number {
  font-size: 1.6rem;
  font-weight: 900;
  color: #FFD200;
}
.avg-stars { display: flex; gap: 2px; }
.avg-count { font-size: 0.85rem; color: #888; }
.star--filled { color: #FFD200; }
.star--empty { color: #ddd; }
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}
.review-card {
  background: white;
  border-radius: 16px;
  padding: 18px 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border-left: 4px solid #E91E81;
}
.review-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.review-author { font-weight: 700; color: #2D3E94; font-size: 0.95rem; }
.review-stars { display: flex; gap: 2px; font-size: 1.1rem; }
.review-comment { color: #444; line-height: 1.6; margin: 0 0 6px; font-size: 0.95rem; }
.review-date { font-size: 0.78rem; color: #aaa; }
.reviews-empty {
  text-align: center;
  padding: 32px;
  background: white;
  border-radius: 16px;
  color: #888;
  margin-bottom: 32px;
}
.review-form-wrapper {
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(233, 30, 129, 0.08);
  border: 2px solid rgba(233, 30, 129, 0.15);
}
.review-form-title { font-size: 1.1rem; font-weight: 800; color: #2D3E94; margin: 0 0 16px; }
.review-rating-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}
.rating-label { font-weight: 700; color: #2D3E94; font-size: 0.95rem; }
.rating-stars-input { display: flex; gap: 4px; }
.star-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #ddd;
  cursor: pointer;
  transition: color 0.15s, transform 0.15s;
  padding: 0;
  line-height: 1;
}
.star-btn--active { color: #FFD200; }
.star-btn:hover { transform: scale(1.2); color: #FFD200; }
.review-textarea {
  width: 100%;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 12px;
  font-family: 'Nunito', sans-serif;
  font-size: 0.95rem;
  resize: vertical;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.review-textarea:focus { outline: none; border-color: #E91E81; }
.review-form-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  margin-top: 12px;
}
.char-count { font-size: 0.78rem; color: #aaa; }
.review-error { color: #b00020; font-size: 0.88rem; font-weight: 600; margin: 0; }
.review-success { color: #1b6b32; font-size: 0.9rem; font-weight: 700; margin: 0; }
.review-submit-btn {
  background: linear-gradient(135deg, #E91E81, #C2185B);
  color: white;
  border: none;
  border-radius: 999px;
  padding: 12px 28px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 16px rgba(233, 30, 129, 0.35);
}
.review-submit-btn:hover:not(:disabled) { transform: scale(1.04); }
.review-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.review-login-prompt { color: #2D3E94; font-size: 0.95rem; }
.review-login-link { color: #E91E81; font-weight: 700; }
</style>
