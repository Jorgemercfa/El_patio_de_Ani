<script setup>
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { getCompanyproducts } from '@/auth/companyproductsRepo';

/* =============================
   CARRUSEL PRINCIPAL
============================= */
import img1 from '@/assets/picture1.png';
import img2 from '@/assets/picture2.png';
import img3 from '@/assets/picture3.png';
import img4 from '@/assets/picture4.png';

const images = [img1, img2, img3, img4];

const currentImageIndex = ref(0);
const intervalId = ref(null);

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

const startCarousel = () => {
  stopCarousel();
  intervalId.value = setInterval(nextImage, 5000);
};

const stopCarousel = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

onMounted(() => {
  startCarousel();
});

onBeforeUnmount(() => {
  stopCarousel();
});

/* =============================
   HELPERS
============================= */
const getProductPrice = (product) => Number(product.discount_price ?? product.price ?? 0);

const getProductName = (product) => product.name ?? 'Producto sin nombre';

const getProductCategory = (product) => product.category ?? '';

const getProductImage = (product) => product.image ?? '';

/* =============================
   CARRUSEL PRODUCTOS (HORIZONTAL)
============================= */
const productsTrackRef = ref(null);

const scrollproductsBy = (direction) => {
  const el = productsTrackRef.value;
  if (!el) return;
  const card = el.querySelector('.logs-item');
  const cardWidth = card ? card.getBoundingClientRect().width : 220;
  const gap = 20;
  const step = cardWidth + gap;
  el.scrollBy({ left: direction * step, behavior: 'smooth' });
};

const scrollproductsLeft = () => scrollproductsBy(-1);
const scrollproductsRight = () => scrollproductsBy(1);

/* =============================
   FILTRO POR CATEGORÍA
============================= */
const products = computed(() => getCompanyproducts());

const restaurantproducts = computed(() =>
  products.value.filter((c) => c.category === 'Shows Infantiles'),
);

const restaurantproducts2 = computed(() =>
  products.value.filter((c) => c.category === 'Juegos e Inflables'),
);

/* =============================
   CARRUSEL SHOWS (scroll)
============================= */
const restaurantTrackRef = ref(null);

const scrollRestaurantsBy = (direction) => {
  const el = restaurantTrackRef.value;
  if (!el) return;
  const card = el.querySelector('.logs-item');
  const cardWidth = card ? card.getBoundingClientRect().width : 220;
  const gap = 20;
  const step = cardWidth + gap;
  el.scrollBy({ left: direction * step, behavior: 'smooth' });
};

const scrollRestaurantsLeft = () => scrollRestaurantsBy(-1);
const scrollRestaurantsRight = () => scrollRestaurantsBy(1);

/* =============================
   CARRUSEL Juegos e Inflables (scroll)
============================= */
const restaurantTrackRef2 = ref(null);

const scrollRestaurantsBy2 = (direction) => {
  const el = restaurantTrackRef2.value;
  if (!el) return;
  const card = el.querySelector('.logs-item');
  const cardWidth = card ? card.getBoundingClientRect().width : 220;
  const gap = 20;
  const step = cardWidth + gap;
  el.scrollBy({ left: direction * step, behavior: 'smooth' });
};

const scrollRestaurantsLeft2 = () => scrollRestaurantsBy2(-1);
const scrollRestaurantsRight2 = () => scrollRestaurantsBy2(1);
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div class="home-area">
    <div class="carousel-container">
      <img class="img-home" :src="images[currentImageIndex]" alt="Carrusel principal" />
      <div class="carousel-dots">
        <span
          v-for="(image, index) in images"
          :key="index"
          :class="{ active: index === currentImageIndex }"
          @click="currentImageIndex = index"
        ></span>
      </div>
    </div>

    <div class="text-home">
      Encuentra todo lo que necesitas para una celebración inolvidable: desde shows mágicos y juegos inflables hasta deliciosos carritos de snacks. Nos encargamos de la diversión para que tú solo te preocupes por disfrutar
    </div>

    <!-- ===== HERO SECTION ===== -->
    <section class="hero-section">
      <h1 class="hero-title">Tu aliada perfecta para celebrar 🎉</h1>
      <p class="hero-subtitle">Animación, juegos, snacks y estética infantil para que cada fiesta sea única e inolvidable en Lima</p>
      <div class="hero-stats">
        <div class="hero-stat">
          <span class="hero-stat-number">500+</span>
          <span class="hero-stat-label">🎉 Eventos realizados</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-number">20+</span>
          <span class="hero-stat-label">🎨 Artistas creativos</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-number">0-12</span>
          <span class="hero-stat-label">👶 Edades atendidas</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-number">Lima</span>
          <span class="hero-stat-label">📍 Cobertura</span>
        </div>
      </div>
    </section>

    <!-- ===== NUESTROS SERVICIOS ===== -->
    <h1 class="title-home">Nuestros Servicios</h1>

    <div class="services-grid">
      <router-link to="/Product-item" class="service-card service-card-shows">
        <span class="service-icon">🎭</span>
        <h3 class="service-name">Shows Infantiles</h3>
        <p class="service-desc">Animación, magia y mucha diversión</p>
      </router-link>
      <router-link to="/Product-item" class="service-card service-card-games">
        <span class="service-icon">🎪</span>
        <h3 class="service-name">Juegos e Inflables</h3>
        <p class="service-desc">Inflables, trampolines y juegos para todos</p>
      </router-link>
      <router-link to="/Product-item" class="service-card service-card-snacks">
        <span class="service-icon">🍿</span>
        <h3 class="service-name">Carritos Snacks</h3>
        <p class="service-desc">Delicias saladas, dulces y combos</p>
      </router-link>
      <router-link to="/Product-item" class="service-card service-card-estetica">
        <span class="service-icon">🎨</span>
        <h3 class="service-name">Estética Infantil</h3>
        <p class="service-desc">Pintacaritas y glitter bar para los peques</p>
      </router-link>
    </div>

    <h1 class="title-home">Más populares</h1>

    <div class="our-products-wrapper">
      <button
        class="products-nav products-nav-left"
        type="button"
        aria-label="Anterior"
        @click="scrollproductsLeft"
      >
        ‹
      </button>

      <div class="our-products" ref="productsTrackRef">
        <router-link
          v-for="product in products"
          :key="product.id"
          :to="{ name: 'productsDetails', params: { id: product.id } }"
          class="logs-item"
        >
          <span v-if="product.age_range" class="product-mini-badge">
            {{ product.age_range }}
          </span>

          <img
            class="card-icons"
            :src="getProductImage(product)"
            :alt="getProductName(product)"
          />

          <div class="product-mini-info">
            <h4 class="product-mini-title">{{ getProductName(product) }}</h4>

            <div class="product-mini-category" v-if="getProductCategory(product)">
              {{ getProductCategory(product) }}
            </div>

            <div class="product-mini-price">
              S/ {{ getProductPrice(product).toFixed(2) }}
            </div>
          </div>
        </router-link>
      </div>

      <button
        class="products-nav products-nav-right"
        type="button"
        aria-label="Siguiente"
        @click="scrollproductsRight"
      >
        ›
      </button>
    </div>

    <h1 class="title-home">Shows</h1>

    <div class="our-products-wrapper">
      <button
        class="products-nav products-nav-left"
        type="button"
        aria-label="Anterior"
        @click="scrollRestaurantsLeft"
      >
        ‹
      </button>

      <div class="our-products" ref="restaurantTrackRef">
        <router-link
          v-for="product in restaurantproducts"
          :key="product.id"
          :to="{ name: 'productsDetails', params: { id: product.id } }"
          class="logs-item"
        >
          <span v-if="product.age_range" class="product-mini-badge">
            {{ product.age_range }}
          </span>

          <img
            class="card-icons"
            :src="getProductImage(product)"
            :alt="getProductName(product)"
          />

          <div class="product-mini-info">
            <h4 class="product-mini-title">{{ getProductName(product) }}</h4>
            <div class="product-mini-price">
              S/ {{ getProductPrice(product).toFixed(2) }}
            </div>
          </div>
        </router-link>

        <div v-if="restaurantproducts.length === 0" class="empty-carousel">
          No hay productos en esta categoría todavía.
        </div>
      </div>

      <button
        class="products-nav products-nav-right"
        type="button"
        aria-label="Siguiente"
        @click="scrollRestaurantsRight"
      >
        ›
      </button>
    </div>

    <h1 class="title-home">Juegos e Inflables</h1>

    <div class="our-products-wrapper">
      <button
        class="products-nav products-nav-left"
        type="button"
        aria-label="Anterior"
        @click="scrollRestaurantsLeft2"
      >
        ‹
      </button>

      <div class="our-products" ref="restaurantTrackRef2">
        <router-link
          v-for="product in restaurantproducts2"
          :key="product.id"
          :to="{ name: 'productsDetails', params: { id: product.id } }"
          class="logs-item"
        >
          <span v-if="product.age_range" class="product-mini-badge">
            {{ product.age_range }}
          </span>

          <img
            class="card-icons"
            :src="getProductImage(product)"
            :alt="getProductName(product)"
          />

          <div class="product-mini-info">
            <h4 class="product-mini-title">{{ getProductName(product) }}</h4>
            <div class="product-mini-price">
              S/ {{ getProductPrice(product).toFixed(2) }}
            </div>
          </div>
        </router-link>

        <div v-if="restaurantproducts2.length === 0" class="empty-carousel">
          No hay productos en esta categoría todavía.
        </div>
      </div>

      <button
        class="products-nav products-nav-right"
        type="button"
        aria-label="Siguiente"
        @click="scrollRestaurantsRight2"
      >
        ›
      </button>
    </div>
  </div>

  <footer>
    <Footer />
  </footer>
</template>

<style>
.img-home {
  width: 100%;
  height: 80vh;
  min-height: 500px;
  object-fit: cover;
  object-position: center 30%;
  transition: opacity 0.8s ease;
}

.carousel-container {
  position: relative;
  width: 100%;
}

.carousel-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(45, 62, 148, 0.3);
}

.carousel-dots {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 1;
}

.carousel-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  background: rgba(255, 255, 255, 0.45);
}

.carousel-dots .active {
  background: #FFD200;
  transform: scale(1.2);
}

.text-home {
  max-width: 900px;
  margin: 60px auto;
  text-align: center;
  font-size: 18px;
  line-height: 1.7;
  color: #2D3E94;
}

.title-home {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin: 80px 0 40px 0;
  position: relative;
  color: #2D3E94;
}

.title-home::after {
  content: '';
  width: 60px;
  height: 4px;
  background-color: #E91E81;
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

.our-products-wrapper {
  position: relative;
  width: 100%;
  padding: 40px 60px;
}

.our-products {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding: 20px 0;
}

.our-products::-webkit-scrollbar {
  height: 8px;
}

.our-products::-webkit-scrollbar-thumb {
  background: rgba(233, 30, 129, 0.3);
  border-radius: 10px;
}

.products-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid #E91E81;
  cursor: pointer;
  background: #FFFFFF;
  color: #E91E81;
  font-size: 28px;
  line-height: 1;
  display: grid;
  place-items: center;
  z-index: 2;
  transition: all 0.3s ease;
}

.products-nav:hover {
  background: #E91E81;
  color: #FFFFFF;
}

.products-nav-left  { left: 14px; }
.products-nav-right { right: 14px; }

.logs-item {
  scroll-snap-align: start;
  flex: 0 0 220px;
  min-height: 300px;
  position: relative;
  background: #FFFFFF;
  border: 2px solid #E91E81;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  color: #2D3E94;
  box-shadow: 0 6px 20px rgba(233, 30, 129, 0.1);
  transition: 0.25s;
}

.logs-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(233, 30, 129, 0.2);
}

.card-icons {
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-mini-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-mini-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2D3E94;
  margin-bottom: 4px;
}

.product-mini-category {
  font-size: 0.75rem;
  font-weight: 600;
  color: #E91E81;
  background: rgba(233, 30, 129, 0.08);
  padding: 2px 8px;
  border-radius: 20px;
  display: inline-block;
}

.product-mini-price {
  font-weight: bold;
  color: #E91E81;
  font-size: 1rem;
}

.product-mini-date {
  font-size: 0.8rem;
  color: #2D3E94;
  opacity: 0.65;
}

.product-mini-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #FFD200;
  color: #2D3E94;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: bold;
}

/* ===== HERO SECTION ===== */
.hero-section {
  background: linear-gradient(135deg, #E91E81 0%, #7B2D8B 50%, #2D3E94 100%);
  padding: 60px 20px;
  text-align: center;
  color: #FFFFFF;
}

.hero-title {
  font-size: 2.4rem;
  font-weight: 800;
  margin: 0 0 16px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.1rem;
  margin: 0 auto 40px;
  max-width: 620px;
  opacity: 0.92;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.hero-stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: #FFD200;
  line-height: 1;
}

.hero-stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* ===== NUESTROS SERVICIOS ===== */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 0 60px 40px;
}

.service-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 28px 16px;
  border-radius: 14px;
  text-decoration: none;
  color: #2D3E94;
  border: 2px solid transparent;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}

.service-card-shows   { background: #FFF9C4; }
.service-card-games   { background: #E8F5E9; }
.service-card-snacks  { background: #FFF3E0; }
.service-card-estetica { background: #FCE4EC; }

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(45, 62, 148, 0.15);
}

.service-icon {
  font-size: 2.8rem;
  line-height: 1;
}

.service-name {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
}

.service-desc {
  font-size: 0.82rem;
  margin: 0;
  text-align: center;
  opacity: 0.75;
}

@media (max-width: 900px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 30px 40px;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-stats {
    gap: 24px;
  }
}

@media (max-width: 480px) {
  .services-grid {
    grid-template-columns: 1fr;
    padding: 0 20px 40px;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-stat-number {
    font-size: 1.6rem;
  }
}

.empty-carousel {
  padding: 40px 20px;
  color: #2D3E94;
  opacity: 0.5;
  font-size: 0.95rem;
}

.our-customers {
  overflow: hidden;
  background: #E91E81;
  padding: 50px 0;
  position: relative;
}

.customers-track {
  display: flex;
  width: max-content;
  animation: scrollCustomers 25s linear infinite;
}

.customer-slide {
  flex: 0 0 auto;
  padding: 0 40px;
}

.customer-icons {
  height: 60px;
  width: auto;
  opacity: 0.85;
  transition: all 0.3s ease;
  filter: brightness(0) invert(1);
}

.customer-icons:hover {
  transform: scale(1.1);
  opacity: 1;
}

@keyframes scrollCustomers {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.our-sector {
  width: 100%;
  height: 300px;
  background: #2D3E94;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

@media (max-width: 768px) {
  .img-home {
    height: 55vh;
    min-height: 280px;
  }

  .text-home {
    font-size: 16px;
    padding: 0 20px;
    margin: 40px auto;
  }

  .title-home {
    font-size: 26px;
    margin: 60px 0 30px 0;
  }

  .our-products-wrapper {
    padding: 30px 45px;
  }

  .logs-item {
    flex-basis: 180px;
    min-height: 220px;
  }

  .our-sector {
    height: auto;
    flex-wrap: wrap;
    padding: 50px 20px;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .img-home {
    height: 45vh;
  }

  .title-home {
    font-size: 22px;
  }

  .logs-item {
    flex-basis: 160px;
  }

  .customer-icons {
    height: 45px;
  }
}
</style>