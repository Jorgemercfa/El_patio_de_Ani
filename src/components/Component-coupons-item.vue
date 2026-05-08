<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { getCompanyproducts } from '@/auth/companyproductsRepo';
import { useCart } from '@/store/cart.js';
import { useSession } from '@/auth/session';
import {
  getInflableBadge,
  getInflableSize,
  getProductPrice,
  isInflableProduct,
} from '@/utils/inflables';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();
const { isAuthenticated } = useSession();

const products = computed(() => getCompanyproducts());

const product = computed(() =>
  products.value.find((s) => s.id === Number(route.params.id)),
);

const displayPrice = computed(() => getProductPrice(product.value));
const isInflable = computed(() => isInflableProduct(product.value));
const inflableSize = computed(() => getInflableSize(product.value));
const inflableBadge = computed(() => getInflableBadge(inflableSize.value));

const addedFeedback = ref(false);

function handleAddToCart() {
  if (!isAuthenticated.value) {
    router.push({ name: 'SignIn' });
    return;
  }
  addToCart(product.value.id);
  addedFeedback.value = true;
  setTimeout(() => {
    addedFeedback.value = false;
  }, 1500);
}

function openWhatsAppInquiry() {
  if (!product.value) return;

  const message =
    `Hola! Quiero consultar por el servicio "${product.value.name}".\n` +
    `Precio referencial: S/ ${displayPrice.value !== null ? displayPrice.value.toFixed(2) : 'Por confirmar'}.\n` +
    'Es mi primera reserva y quisiera coordinar los detalles por WhatsApp.';

  window.open(
    `https://wa.me/51975495623?text=${encodeURIComponent(message)}`,
    '_blank',
  );
}

function goToInflableReservation() {
  if (!product.value) return;

  router.push(`/Inflable-reserva?id=${product.value.id}`);
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
  },
);
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main class="container">
    <div v-if="product" class="product-wrapper">

      <!-- regresar -->
      <router-link to="/product-item" class="return-area">
        <button class="card-button">Regresar</button>
      </router-link>

      <!-- titulo -->
      <h1 class="title">{{ product.name }}</h1>

      <div class="hero-badges">
        <span v-if="product.category" class="badge badge-category">
          {{ product.category }}
        </span>
        <span v-if="product.subcategory" class="badge badge-subcategory">
          {{ product.subcategory }}
        </span>
        <span
          v-if="isInflable"
          class="badge badge-size"
          :style="{
            background: inflableBadge.background,
            color: inflableBadge.color,
          }"
        >
          {{ inflableBadge.label }}
        </span>
      </div>

      <!-- imagen -->
      <img
        v-if="product.image"
        class="product-image-details"
        :src="product.image"
      />

      <!-- precios -->
      <div class="product-prices">
        <span class="discount-price">
          S/ {{ displayPrice !== null ? displayPrice.toFixed(2) : '-' }}
        </span>
      </div>

      <!-- descripción -->
      <div class="text-product-type">
        {{ product.longDescription }}
      </div>

      <!-- info -->
      <div class="product-details">

        <!-- campos generales -->
        <div class="product-info">
          <div class="info-item" v-if="product.category">
            <span class="label">Categoría</span>
            <span class="value">{{ product.category }}</span>
          </div>
          <div class="info-item" v-if="product.subcategory">
            <span class="label">Subcategoría</span>
            <span class="value">{{ product.subcategory }}</span>
          </div>
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

        <!-- opciones incluidas -->
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

        <!-- términos de uso -->
        <div class="product-terms" v-if="product.Terms_of_use">
          <span class="label">Términos de uso</span>
          <p class="terms-text">{{ product.Terms_of_use }}</p>
        </div>

      <div class="action-area">
        <template v-if="isInflable">
          <button
            v-if="isAuthenticated"
            class="buy-button"
            @click="goToInflableReservation"
          >
            📋 Reservar este inflable
          </button>
          <template v-else>
            <button class="whatsapp-button" @click="openWhatsAppInquiry">
              💬 Consultar por WhatsApp
            </button>
            <button
              class="secondary-button"
              @click="router.push({ name: 'SignIn' })"
            >
              🔑 Iniciar sesión para reservar
            </button>
          </template>
        </template>
        <button v-else class="buy-button" @click="handleAddToCart">
          {{ addedFeedback ? '✓ Agregado' : 'Agregar al carrito' }}
        </button>
      </div>

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
}

.hero-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin: -16px 0 20px;
}

.badge {
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.badge-category {
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  color: #fff;
}

.badge-subcategory {
  background: #f0f4ff;
  color: #2D3E94;
}

.return-area {
  align-self: flex-start;
  margin-bottom: 20px;
}

.title {
  font-size: 2.2rem;
  margin-bottom: 40px;
  color: #2D3E94; /* --azul-torres */
  position: relative;
  display: inline-block;
}

.title::after {
  content: '';
  width: 70px;
  height: 4px;
  background-color: #E91E81; /* --rosa-principal */
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 6px;
}

.product-image-details {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(233, 30, 129, 0.15);
}

.text-product-type {
  max-width: 800px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #2D3E94; /* --azul-torres */
  opacity: 0.8;
  margin-bottom: 40px;
}

.product-prices {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 20px;
}

.original-price {
  text-decoration: line-through;
  color: #dcdcdc;
  font-size: 0.95rem;
}

.discount-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #E91E81; /* --rosa-principal */
}

.product-details {
  width: 100%;
  max-width: 600px;
  margin-top: 30px;
}

/* grid de campos */
.product-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.info-item {
  background: rgba(233, 30, 129, 0.06); /* rosa muy suave */
  border: 1px solid rgba(233, 30, 129, 0.2);
  padding: 12px 16px;
  border-radius: 8px;
  text-align: left;
}

.label {
  display: block;
  font-size: 0.85rem;
  color: #E91E81; /* --rosa-principal */
  margin-bottom: 2px;
}

.value {
  font-weight: 600;
  color: #2D3E94; /* --azul-torres */
}

/* opciones como tags */
.product-options {
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
}

.options-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.option-tag {
  background: #FFD200; /* --amarillo-brillante */
  color: #2D3E94; /* --azul-torres */
  font-size: 0.85rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
}

/* términos de uso */
.product-terms {
  width: 100%;
  background: rgba(233, 30, 129, 0.05);
  border-left: 3px solid #E91E81; /* --rosa-principal */
  border-radius: 0 8px 8px 0;
  padding: 12px 16px;
  margin-bottom: 24px;
  text-align: left;
}

.terms-text {
  font-size: 0.9rem;
  color: #2D3E94; /* --azul-torres */
  opacity: 0.8;
  margin: 4px 0 0;
  line-height: 1.6;
}

/* botón agregar al carrito */
.buy-button {
  width: 100%;
  background: #FFD200; /* --amarillo-brillante */
  color: #2D3E94; /* --azul-torres */
  border: none;
  padding: 14px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.buy-button:hover {
  background-color: #e6bd00;
  transform: scale(1.01);
}

.action-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.secondary-button,
.whatsapp-button {
  width: 100%;
  border: none;
  padding: 14px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
}

.whatsapp-button {
  background: linear-gradient(135deg, #25D366, #128C7E);
  color: #fff;
  box-shadow: 0 12px 24px rgba(37, 211, 102, 0.24);
}

.whatsapp-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 28px rgba(37, 211, 102, 0.32);
}

.secondary-button {
  background: #fff;
  border: 2px solid #E91E81;
  color: #E91E81;
}

.secondary-button:hover {
  background: #E91E81;
  color: #fff;
}

/* botón regresar */
.card-button {
  background-color: #FFFFFF; /* --blanco-puro */
  color: #2D3E94; /* --azul-torres */
  border: 2px solid #E91E81; /* --rosa-principal */
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card-button:hover {
  background-color: #E91E81; /* --rosa-principal */
  color: #FFFFFF; /* --blanco-puro */
}

.product-badge {
  top: 10px;
  right: 10px;
  background: #FFD200; /* --amarillo-brillante */
  color: #2D3E94; /* --azul-torres */
  font-weight: bold;
  padding: 6px 10px;
  border-radius: 6px;
}

.not-found {
  text-align: center;
  padding: 40px 20px;
  font-size: 1.2rem;
  color: #2D3E94; /* --azul-torres */
  opacity: 0.6;
}

@media (max-width: 640px) {
  .hero-badges {
    margin-top: -10px;
  }

  .product-image-details {
    height: 260px;
  }
}
</style>
