<script setup>
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { getCompanyproducts } from '@/auth/companyproductsRepo';

/* =============================
   CARRUSEL PRINCIPAL DE VIDEOS (LOCALES)
============================= */

// Importa aquí cada video. Renombra los archivos según tus nombres reales.
// Si el archivo es .mov, escribe video1.MOV, etc.
import video1 from '@/assets/videos/video1.mp4';
import video2 from '@/assets/videos/video2.mp4';
import video3 from '@/assets/videos/video3.mp4';
import video4 from '@/assets/videos/video4.mp4';
import video5 from '@/assets/videos/video5.mp4';

// Si alguno es .mov, cámbialo así:
// import video1 from '@/assets/videos/video1.mov';

const videos = [video1, video2, video3, video4, video5];

const currentVideoIndex = ref(0);
const totalVideos = videos.length;
const videoIntervalId = ref(null);
const videoRef = ref(null); // referencia al elemento <video>

const currentVideoSrc = computed(() => videos[currentVideoIndex.value]);

const nextVideo = () => {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % totalVideos;
};

// const prevVideo = () => {
//   currentVideoIndex.value = (currentVideoIndex.value - 1 + totalVideos) % totalVideos;
// };

const goToVideo = (index) => {
  currentVideoIndex.value = index;
  restartVideoTimer();
};

const startVideoTimer = () => {
  videoIntervalId.value = setInterval(nextVideo, 12000);
};

const stopVideoTimer = () => {
  if (videoIntervalId.value) {
    clearInterval(videoIntervalId.value);
    videoIntervalId.value = null;
  }
};

const restartVideoTimer = () => {
  stopVideoTimer();
  startVideoTimer();
};

// Cuando el video termina, pasa al siguiente automáticamente
const onVideoEnded = () => {
  nextVideo();
  restartVideoTimer();
};

onMounted(() => {
  startVideoTimer();
});

onBeforeUnmount(() => {
  stopVideoTimer();
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
  el.scrollBy({ left: direction * (cardWidth + 20), behavior: 'smooth' });
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
  products.value.filter((c) => c.category === 'Inflables' || c.category === 'Juegos'),
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
  el.scrollBy({ left: direction * (cardWidth + 20), behavior: 'smooth' });
};

const scrollRestaurantsLeft = () => scrollRestaurantsBy(-1);
const scrollRestaurantsRight = () => scrollRestaurantsBy(1);

/* =============================
   CARRUSEL Inflables y Juegos (scroll)
============================= */
const restaurantTrackRef2 = ref(null);

const scrollRestaurantsBy2 = (direction) => {
  const el = restaurantTrackRef2.value;
  if (!el) return;
  const card = el.querySelector('.logs-item');
  const cardWidth = card ? card.getBoundingClientRect().width : 220;
  el.scrollBy({ left: direction * (cardWidth + 20), behavior: 'smooth' });
};

const scrollRestaurantsLeft2 = () => scrollRestaurantsBy2(-1);
const scrollRestaurantsRight2 = () => scrollRestaurantsBy2(1);

/* =============================
   TARIFAS DE MOVILIDAD
============================= */
const tarifas = [
  { distrito: 'Miraflores / San Isidro', precio: 30 },
  { distrito: 'Surco / Barranco', precio: 30 },
  { distrito: 'San Borja / Surquillo', precio: 30 },
  { distrito: 'Jesús María / San Miguel / Pueblo Libre', precio: 35 },
  { distrito: 'La Molina / Santa Anita', precio: 40 },
  { distrito: 'Ate / Chaclacayo / La Victoria', precio: 45 },
  { distrito: 'Chorrillos / Pachacamac', precio: 45 },
  { distrito: 'Centro de Lima', precio: 60 },
  { distrito: 'Callao / Los Olivos', precio: 70 },
];
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div class="home-area">

    <!-- ===== CARRUSEL PRINCIPAL DE VIDEOS LOCALES ===== -->
    <div class="main-video-carousel">
      <div class="main-video-overlay">
        <h1 class="main-video-title">Productora de eventos infantiles</h1>
      </div>

    

      <div class="main-video-wrapper">
        <video
          ref="videoRef"
          :key="currentVideoIndex"
          :src="currentVideoSrc"
          class="main-video-player"
          autoplay
          muted
          playsinline
          @ended="onVideoEnded"
        ></video>
      </div>

      <div class="main-video-dots">
        <span
          v-for="(v, index) in videos"
          :key="index"
          :class="{ active: index === currentVideoIndex }"
          @click="goToVideo(index)"
        ></span>
      </div>
    </div>

    <!-- Wave divider -->
    <div class="wave-divider">
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FDF6EC"/>
      </svg>
    </div>

    <div class="text-home">
      Encuentra todo lo que necesitas para una celebración inolvidable: desde shows mágicos y juegos inflables hasta deliciosos carritos de snacks. Nos encargamos de la diversión para que tú disfrutes cada momento especial.
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

    <div class="wave-divider-hero">
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#FDF6EC"/>
      </svg>
    </div>

    <!-- ===== NUESTROS SERVICIOS ===== -->
    <h1 class="title-home">Nuestros Servicios</h1>

    <div class="services-grid">
      <router-link to="/Product-item?category=Shows Infantiles" class="service-card service-card-shows">
        <span class="service-icon">🎭</span>
        <h3 class="service-name">Shows Infantiles</h3>
        <p class="service-desc">Animación, magia y mucha diversión</p>
      </router-link>
      <router-link to="/Product-item?category=Inflables" class="service-card service-card-games">
        <span class="service-icon">🎪</span>
        <h3 class="service-name">Inflables</h3>
        <p class="service-desc">Inflables para bebés, medianos y grandes</p>
      </router-link>
      <router-link to="/Product-item?category=Juegos" class="service-card service-card-juegos">
        <span class="service-icon">🎠</span>
        <h3 class="service-name">Juegos</h3>
        <p class="service-desc">Little Tikes, trampolines y juegos para bebés</p>
      </router-link>
      <router-link to="/Product-item?category=Carritos Snacks" class="service-card service-card-snacks">
        <span class="service-icon">🍿</span>
        <h3 class="service-name">Carritos Snacks</h3>
        <p class="service-desc">Delicias saladas, dulces y combos</p>
      </router-link>
      <router-link to="/Product-item?category=Estética Infantil" class="service-card service-card-estetica">
        <span class="service-icon">🎭</span>
        <h3 class="service-name">Pintacaritas 🎨</h3>
        <p class="service-desc">Pintacaritas y glitter bar para los peques</p>
      </router-link>
    </div>

    <h1 class="title-home">Más populares</h1>

    <div class="our-products-wrapper">
      <button class="products-nav products-nav-left" type="button" aria-label="Anterior" @click="scrollproductsLeft">‹</button>
      <div class="our-products" ref="productsTrackRef">
        <router-link
          v-for="product in products"
          :key="product.id"
          :to="{ name: 'productsDetails', params: { id: product.id } }"
          class="logs-item"
        >
          <span v-if="product.age_range" class="product-mini-badge">{{ product.age_range }}</span>
          <img class="card-icons" :src="getProductImage(product)" :alt="getProductName(product)" loading="lazy" />
          <div class="product-mini-info">
            <h4 class="product-mini-title">{{ getProductName(product) }}</h4>
            <div class="product-mini-category" v-if="getProductCategory(product)">{{ getProductCategory(product) }}</div>
            <div class="product-mini-price">S/ {{ getProductPrice(product).toFixed(2) }}</div>
          </div>
        </router-link>
      </div>
      <button class="products-nav products-nav-right" type="button" aria-label="Siguiente" @click="scrollproductsRight">›</button>
    </div>

    <h1 class="title-home">Shows</h1>

    <div class="our-products-wrapper">
      <button class="products-nav products-nav-left" type="button" aria-label="Anterior" @click="scrollRestaurantsLeft">‹</button>
      <div class="our-products" ref="restaurantTrackRef">
        <router-link
          v-for="product in restaurantproducts"
          :key="product.id"
          :to="{ name: 'productsDetails', params: { id: product.id } }"
          class="logs-item"
        >
          <span v-if="product.age_range" class="product-mini-badge">{{ product.age_range }}</span>
          <img class="card-icons" :src="getProductImage(product)" :alt="getProductName(product)" loading="lazy" />
          <div class="product-mini-info">
            <h4 class="product-mini-title">{{ getProductName(product) }}</h4>
            <div class="product-mini-price">S/ {{ getProductPrice(product).toFixed(2) }}</div>
          </div>
        </router-link>
        <div v-if="restaurantproducts.length === 0" class="empty-carousel">No hay productos en esta categoría todavía.</div>
      </div>
      <button class="products-nav products-nav-right" type="button" aria-label="Siguiente" @click="scrollRestaurantsRight">›</button>
    </div>

    <h1 class="title-home">Inflables y Juegos</h1>

    <div class="our-products-wrapper">
      <button class="products-nav products-nav-left" type="button" aria-label="Anterior" @click="scrollRestaurantsLeft2">‹</button>
      <div class="our-products" ref="restaurantTrackRef2">
        <router-link
          v-for="product in restaurantproducts2"
          :key="product.id"
          :to="{ name: 'productsDetails', params: { id: product.id } }"
          class="logs-item"
        >
          <span v-if="product.age_range" class="product-mini-badge">{{ product.age_range }}</span>
          <img class="card-icons" :src="getProductImage(product)" :alt="getProductName(product)" loading="lazy" />
          <div class="product-mini-info">
            <h4 class="product-mini-title">{{ getProductName(product) }}</h4>
            <div class="product-mini-price">S/ {{ getProductPrice(product).toFixed(2) }}</div>
          </div>
        </router-link>
        <div v-if="restaurantproducts2.length === 0" class="empty-carousel">No hay productos en esta categoría todavía.</div>
      </div>
      <button class="products-nav products-nav-right" type="button" aria-label="Siguiente" @click="scrollRestaurantsRight2">›</button>
    </div>

    <!-- ===== TARIFAS DE MOVILIDAD ===== -->
    <section class="movilidad-section">
      <div class="movilidad-badge">COBERTURA EN LIMA</div>
      <h2 class="title-home">Tarifas de Movilidad 🚚</h2>
      <p class="movilidad-subtitle">Costo de traslado según distrito en Lima</p>
      <div class="movilidad-grid">
        <div v-for="tarifa in tarifas" :key="tarifa.distrito" class="movilidad-card">
          <p class="movilidad-distrito">{{ tarifa.distrito }}</p>
          <p class="movilidad-precio">S/ {{ tarifa.precio }}</p>
        </div>
      </div>
      <p class="movilidad-nota">* Los precios pueden variar según disponibilidad y tipo de evento.</p>
    </section>
  </div>

  <footer>
    <Footer />
  </footer>
</template>

<style>
.main-video-carousel,
.our-products-wrapper,
.hero-section,
.services-grid,
.movilidad-section {
  font-family: 'Nunito', sans-serif;
}

/* ===== CARRUSEL PRINCIPAL DE VIDEOS ===== */
.main-video-carousel {
  position: relative;
  width: 100%;
  margin-top: -98px;
  background: #000;
  overflow: hidden;
}

.main-video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  pointer-events: none;
  background: linear-gradient(
    to right,
    rgba(45, 62, 148, 0.55) 0%,
    rgba(45, 62, 148, 0.15) 50%,
    transparent 100%
  );
  display: flex;
  align-items: center;
}

.main-video-title {
  font-size: 48px;
  color: #ffffff;
  margin: 0 0 0 32px;
  line-height: 1.2;
  max-width: 260px;
  text-shadow: 0 2px 12px rgba(0,0,0,0.4);
  pointer-events: none;
}

.main-video-wrapper {
  position: relative;
  width: 100%;
  height: 80vh;
  min-height: 500px;
}

.main-video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;     /* igual que las imágenes anteriores */
  object-position: center;
  display: block;
}

.main-video-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.8);
  cursor: pointer;
  background: rgba(0,0,0,0.35);
  color: #fff;
  font-size: 32px;
  line-height: 1;
  display: grid;
  place-items: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.main-video-nav:hover {
  background: rgba(233, 30, 129, 0.85);
  border-color: transparent;
  transform: translateY(-50%) scale(1.08);
}

.main-video-nav-left  { left: 16px; }
.main-video-nav-right { right: 16px; }

.main-video-dots {
  position: absolute;
  bottom: 18px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 20;
  pointer-events: none;
}

.main-video-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  background: rgba(255, 255, 255, 0.45);
  pointer-events: all;
}

.main-video-dots .active {
  background: #FFD200;
  transform: scale(1.2);
}

/* ===== RESTO ===== */
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
  font-weight: 800;
  margin: 80px 0 40px 0;
  position: relative;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-home::after {
  content: '';
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
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
  overflow: visible;
}

.our-products {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  overflow-y: visible;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding: 20px 0;
}

.our-products::-webkit-scrollbar { height: 8px; }
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
  background: linear-gradient(135deg, #E91E81, #C2185B);
  color: #FFFFFF;
  border-color: transparent;
}

.products-nav-left  { left: 14px; }
.products-nav-right { right: 14px; }

.logs-item {
  scroll-snap-align: start;
  flex: 0 0 220px;
  min-height: 300px;
  position: relative;
  background: #FFFFFF;
  border: none;
  border-radius: 24px;
  padding: 15px;
  overflow: visible;
  padding-top: 18px;
  margin-top: 40px;
  text-align: center;
  text-decoration: none;
  color: #2D3E94;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: 0.25s;
}

.logs-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.14);
}

.card-icons {
  width: calc(100% - 20px);
  height: 130px;
  object-fit: contain;
  border-radius: 12px;
  margin: -60px auto 10px;
  display: block;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
  position: relative;
  z-index: 2;
}

.product-mini-info { display: flex; flex-direction: column; gap: 4px; }

.product-mini-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2D3E94;
  margin-bottom: 4px;
}

.product-mini-category {
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #E91E81, #C2185B);
  padding: 2px 8px;
  border-radius: 20px;
  display: inline-block;
}

.product-mini-price {
  font-weight: bold;
  color: #E91E81;
  font-size: 1rem;
}

.product-mini-badge {
  position: absolute;
  top: 22px;
  right: 10px;
  background: linear-gradient(135deg, #FFD200, #FF9800);
  color: #2D3E94;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 800;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.35);
}


.wave-divider {
  position: relative;
  margin-top: -2px;
  line-height: 0;
  background: #000;
}

.wave-divider svg {
  width: 100%;
  height: 80px;
  display: block;
}

.wave-divider-hero {
  margin-top: -2px;
  line-height: 0;
  background: linear-gradient(135deg, #E91E81 0%, #7B2D8B 50%, #2D3E94 100%);
}

.wave-divider-hero svg {
  width: 100%;
  height: 60px;
  display: block;
}

/* ===== HERO SECTION ===== */
.hero-section {
  background: linear-gradient(135deg, #E91E81 0%, #A130B0 45%, #2D3E94 100%);
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
  text-align: center;
  gap: 6px;
}

.hero-stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: #FFD200;
  line-height: 1;
}

.hero-stat-label { font-size: 0.9rem; opacity: 0.9; }

/* ===== NUESTROS SERVICIOS ===== */
.services-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  padding: 0 60px 40px;
}

.service-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 28px 16px;
  border-radius: 24px;
  text-decoration: none;
  color: #2D3E94;
  border: 2px solid transparent;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}

.service-card-shows   { background: #FFF9C4; }
.service-card-games   { background: #E8F5E9; }
.service-card-juegos  { background: #E3F2FD; }
.service-card-snacks  { background: #FFF3E0; }
.service-card-estetica {
  background: linear-gradient(135deg, rgba(233, 30, 129, 0.18), rgba(45, 62, 148, 0.12));
  border-color: rgba(233, 30, 129, 0.4);
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.12);
}

.service-icon { font-size: 2.8rem; line-height: 1; }
.service-name { font-size: 1rem; font-weight: 700; margin: 0; text-align: center; }
.service-desc { font-size: 0.82rem; margin: 0; text-align: center; opacity: 0.75; }

/* ===== TARIFAS DE MOVILIDAD ===== */
.movilidad-section { background: #ffffff; border-radius: 32px; margin: 0 40px 80px; padding: 60px; text-align: center; }

.movilidad-badge {
  display: inline-block;
  background: linear-gradient(135deg, #2D3E94, #5C6BC0);
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 5px 16px;
  border-radius: 20px;
  margin-bottom: 8px;
}

.movilidad-subtitle { font-size: 0.95rem; color: #888; margin: 14px 0 36px; }

.movilidad-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.movilidad-card {
  background: white;
  border-radius: 20px;
  padding: 20px 20px 20px 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  border-left: 4px solid #FFD200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.movilidad-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(45, 62, 148, 0.12);
}

.movilidad-distrito { font-weight: 600; color: #2D3E94; font-size: 0.9rem; margin: 0; flex: 1; }
.movilidad-precio { font-size: 1.2rem; font-weight: 800; color: #E91E81; margin: 0; white-space: nowrap; margin-left: 12px; }
.movilidad-nota { margin-top: 24px; font-size: 0.82rem; color: #aaa; }

.empty-carousel { padding: 40px 20px; color: #2D3E94; opacity: 0.5; font-size: 0.95rem; }

/* ===== RESPONSIVE ===== */
@media (max-width: 1200px) {
  .services-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 900px) {
  .services-grid { grid-template-columns: repeat(2, 1fr); padding: 0 30px 40px; }
  .hero-title { font-size: 1.8rem; }
  .hero-stats { gap: 24px; }
  .movilidad-grid { grid-template-columns: repeat(2, 1fr); }
  .movilidad-section { margin: 0 30px 60px; padding: 40px 30px 60px; }
}

@media (max-width: 768px) {
  .main-video-wrapper { height: 55vh; min-height: 280px; }
  .main-video-title { font-size: 28px; max-width: 160px; margin-left: 16px; }
  .main-video-nav { width: 36px; height: 36px; font-size: 22px; }
  .text-home { font-size: 16px; padding: 0 20px; margin: 40px auto; }
  .title-home { font-size: 26px; margin: 60px 0 30px 0; }
  .our-products-wrapper { padding: 30px 45px; }
  .logs-item { flex-basis: 180px; min-height: 220px; }
}

@media (max-width: 700px) {
  .our-products-wrapper { padding: 20px 10px; }
  .hero-stats { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .services-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .main-video-wrapper { height: 45vh; min-height: 220px; }
  .main-video-title { font-size: 20px; max-width: 130px; }
  .main-video-nav { display: none; }
  .services-grid { grid-template-columns: 1fr; padding: 0 20px 40px; }
  .hero-title { font-size: 1.5rem; }
  .hero-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px 24px;
    margin: 0 auto;
    align-items: start;
  }
  .hero-stat-number { font-size: 1.6rem; }
  .movilidad-grid { grid-template-columns: 1fr; }
  .movilidad-section { margin: 0 20px 50px; padding: 32px 20px 50px; }
  .title-home { font-size: 22px; }
  .logs-item { flex-basis: 160px; }
}
</style>