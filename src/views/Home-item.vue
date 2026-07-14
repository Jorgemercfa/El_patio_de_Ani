<script setup>
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useRouter } from 'vue-router';
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { fetchCompanyproducts, getCompanyproducts } from '@/auth/companyproductsRepo';
import { useSession } from '@/auth/session';
import { fetchGlobalReviews } from '@/auth/reviewServicesRepo';
const { isAuthenticated, state } = useSession();
const router = useRouter();


/* =============================
   POPUP DE BIENVENIDA
============================= */
const showWelcomePopup = ref(false);
const WELCOME_POPUP_SESSION_KEY = 'welcomePopupShown';


const closeWelcomePopup = () => {
  showWelcomePopup.value = false;
};


const goToProfileFromPopup = () => {
  showWelcomePopup.value = false;
  router.push('/Profile');
};


/* =============================
   CARRUSEL PRINCIPAL DE VIDEOS (LOCALES)
============================= */


const videos = [
  new URL('@/assets/videos/video1.mp4', import.meta.url).href,
  new URL('@/assets/videos/video2.mp4', import.meta.url).href,
  new URL('@/assets/videos/video3.mp4', import.meta.url).href,
  new URL('@/assets/videos/video4.mp4', import.meta.url).href,
  new URL('@/assets/videos/video5.mp4', import.meta.url).href
];
const VIDEO_AUTO_ADVANCE_INTERVAL = 20000;
const VIDEO_ENDED_DELAY = 1000;


const currentVideoIndex = ref(0);
const totalVideos = videos.length;
const videoIntervalId = ref(null);
const videoRef = ref(null);
const videoEndedTimeout = ref(null);
const mainWrapperRef = ref(null);


const currentVideoSrc = computed(() => videos[currentVideoIndex.value]);


const nextVideo = () => {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % totalVideos;
};


const goToVideo = (index) => {
  currentVideoIndex.value = index;
  restartVideoTimer();
};


const startVideoTimer = () => {
  videoIntervalId.value = setInterval(nextVideo, VIDEO_AUTO_ADVANCE_INTERVAL);
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


const onVideoEnded = () => {
  clearTimeout(videoEndedTimeout.value);
  videoEndedTimeout.value = setTimeout(() => {
    nextVideo();
    restartVideoTimer();
  }, VIDEO_ENDED_DELAY);
};


/* =============================
   ZOOM DINÁMICO DEL VIDEO PRINCIPAL
   Calcula, para cada video segun su proporcion real,
   cuanto "cover" moderado aplicar sin recortar de mas.
============================= */
const ZOOM_CAP = 1.9; // tope maximo de recorte permitido, calibrado para el contenedor de 80vh


const applyModerateZoom = (event) => {
  const videoEl = event.target;
  const wrapperEl = mainWrapperRef.value;
  if (!wrapperEl || !videoEl.videoWidth || !videoEl.videoHeight) return;


  const vw = videoEl.videoWidth;
  const vh = videoEl.videoHeight;
  const cw = wrapperEl.clientWidth;
  const ch = wrapperEl.clientHeight;


  const containScale = Math.min(cw / vw, ch / vh);
  const coverScale = Math.max(cw / vw, ch / vh);
  const fullCoverZoom = coverScale / containScale;


  const zoom = Math.min(fullCoverZoom, ZOOM_CAP);


  videoEl.style.setProperty('--video-zoom', zoom.toFixed(3));
};


const recalcZoomOnResize = () => {
  if (videoRef.value) applyModerateZoom({ target: videoRef.value });
};


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
   CARRUSEL TESTIMONIOS (scroll)
============================= */
const reviewsTrackRef = ref(null);
const reviews = ref([]);


const scrollReviewsLeft = () => {
  if (reviewsTrackRef.value) {
    reviewsTrackRef.value.scrollBy({ left: -320, behavior: 'smooth' });
  }
};


const scrollReviewsRight = () => {
  if (reviewsTrackRef.value) {
    reviewsTrackRef.value.scrollBy({ left: 320, behavior: 'smooth' });
  }
};


const formatDate = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('es-PE', { year: 'numeric', month: 'short' }).format(date);
};




/* =============================
   ÚNICO onMounted
============================= */
onMounted(async () => {
  await fetchCompanyproducts();
  startVideoTimer();
  reviews.value = await fetchGlobalReviews();
  window.addEventListener('resize', recalcZoomOnResize);
  window.addEventListener('orientationchange', recalcZoomOnResize); // los móviles rotan pantalla, hay que recalcular el zoom


  // Fallback contra una condición de carrera del PRIMER video: en algunos
  // navegadores (sobre todo móviles, que precargan/cachean video de forma
  // agresiva) el evento 'loadedmetadata' puede dispararse ANTES de que
  // Vue termine de enlazar el listener @loadedmetadata en el <video>.
  // Cuando eso pasa, el evento se pierde y --video-zoom se queda en su
  // valor por defecto, mostrando el video chico y "flotando" con mucho
  // blur alrededor. Aquí revisamos manualmente si el video ya tiene
  // metadata disponible (readyState >= 1) y, si es así, aplicamos el
  // zoom nosotros mismos en vez de esperar a un evento que ya pasó.
  await nextTick();
  if (videoRef.value && videoRef.value.readyState >= 1) {
    applyModerateZoom({ target: videoRef.value });
  }


  if (isAuthenticated.value && state.user) {
    const alreadyShown = sessionStorage.getItem(WELCOME_POPUP_SESSION_KEY);
    if (!alreadyShown) {
      showWelcomePopup.value = true;
      sessionStorage.setItem(WELCOME_POPUP_SESSION_KEY, 'true');
    }
  }
});


onBeforeUnmount(() => {
  stopVideoTimer();
  clearTimeout(videoEndedTimeout.value);
  window.removeEventListener('resize', recalcZoomOnResize);
  window.removeEventListener('orientationchange', recalcZoomOnResize);
});


/* =============================
   TARIFAS DE MOVILIDAD
============================= */
const tarifas = [
  { distrito: 'Miraflores / San Isidro', precio: 80 },
  { distrito: 'Surco / Barranco / San Luis', precio: 80 },
  { distrito: 'San Borja / Surquillo', precio: 80 },
  { distrito: 'Jesús María / San Miguel / Lince', precio: 90 },
  { distrito: 'La Molina / Santa Anita*', precio: 100 },
  { distrito: 'Chorrillos* / Villa', precio: 90 },
  { distrito: 'Cieneguilla* / Pachacamac', precio: 110 },
  { distrito: 'Centro de Lima', precio: 100 },
  { distrito: 'Callao', precio: 120 },
  { distrito: 'Chaclacayo / Lurin', precio: 170 },
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


      <div class="main-video-wrapper" ref="mainWrapperRef">
        <transition name="fade-video">
          <div v-if="currentVideoIndex % 2 === 0" class="video-layer-group">
            <video
              class="main-video-bg"
              :src="currentVideoSrc"
              autoplay muted playsinline preload="auto"
            ></video>
            <video
              ref="videoRef"
              :src="currentVideoSrc"
              class="main-video-player"
              autoplay muted playsinline preload="auto"
              @ended="onVideoEnded"
              @loadedmetadata="applyModerateZoom"
            ></video>
          </div>
        </transition>


        <transition name="fade-video">
          <div v-if="currentVideoIndex % 2 !== 0" class="video-layer-group">
            <video
              class="main-video-bg"
              :src="currentVideoSrc"
              autoplay muted playsinline preload="auto"
            ></video>
            <video
              ref="videoRef"
              :src="currentVideoSrc"
              class="main-video-player"
              autoplay muted playsinline preload="auto"
              @ended="onVideoEnded"
              @loadedmetadata="applyModerateZoom"
            ></video>
          </div>
        </transition>
      </div>


      <div class="main-video-dots">
        <span
          v-for="(v, index) in videos"
          :key="index"
          :class="{ active: index === currentVideoIndex }"
          @click="goToVideo(index)"
        ></span>
      </div>
      <div class="pet-area">
         <img src="@/assets/transparent_pet_logo.png" class="pet-logo" alt="Mascota" />
      </div>
    </div>


    <!-- Wave divider -->
    <div class="wave-divider">
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FDF6EC"/>
      </svg>
    </div>


    <!-- ===== BIENVENIDA PERSONALIZADA ===== -->
    <!-- ===== POPUP DE BIENVENIDA ===== -->
<transition name="fade-popup">
  <div v-if="showWelcomePopup" class="welcome-popup-overlay" @click.self="closeWelcomePopup">
    <div class="welcome-popup-card">
      <button class="welcome-popup-close" type="button" @click="closeWelcomePopup" aria-label="Cerrar">
        ✕
      </button>
      <span class="welcome-popup-icon">👋</span>
      <h2 class="welcome-popup-title">
        ¡Hola <strong>{{ state.user?.name }}</strong>,<br />bienvenido de nuevo!
      </h2>
      <p class="welcome-popup-subtitle">Nos alegra tenerte de vuelta 🎉</p>
      <div class="welcome-popup-actions">
        <button class="welcome-popup-profile-btn" type="button" @click="goToProfileFromPopup">
          Ver mi perfil →
        </button>
        <button class="welcome-popup-dismiss-btn" type="button" @click="closeWelcomePopup">
          Seguir explorando
        </button>
      </div>
    </div>
  </div>
</transition>


    <!-- ===== INTRO + MASCOTA ===== -->
    <div class="intro-section">
      <p class="text-home">
        Encuentra todo lo que necesitas para una celebración inolvidable: desde shows mágicos y juegos inflables hasta deliciosos carritos de snacks. Nos encargamos de la diversión para que tú disfrutes cada momento especial.
      </p>
    </div>


    <div class="proms-area">
      <button @click="$router.push('/Promotions-item')" class="prom-access-button">
        <img src="@/assets/transparent_pet_logo.png" alt="" class="prom-rhino-icon" />
        Promociones
      </button>
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


    <!-- ===== BENEFICIOS DE TENER CUENTA ===== -->
    <section v-if="!isAuthenticated" class="beneficios-section">
      <div class="movilidad-badge">CREA TU CUENTA</div>
      <h2 class="title-home">Ahorra hasta 50% en cada evento 🎁</h2>
      <p class="movilidad-subtitle">Acumula reservas y sube de nivel automáticamente, sin costo</p>


      <div class="beneficios-grid">
        <div class="beneficio-card beneficio-card-plata">
          <span class="beneficio-icon">🥈</span>
          <span class="beneficio-nivel">Plata</span>
          <span class="beneficio-descuento">15% dto.</span>
        </div>
        <div class="beneficio-card beneficio-card-oro">
          <span class="beneficio-icon">🥇</span>
          <span class="beneficio-nivel">Oro</span>
          <span class="beneficio-descuento">25% dto.</span>
        </div>
        <div class="beneficio-card beneficio-card-vip">
          <span class="beneficio-icon">💎</span>
          <span class="beneficio-nivel">VIP</span>
          <span class="beneficio-descuento">50% dto.</span>
        </div>
      </div>


      <router-link to="/Sign-in" class="beneficios-cta-btn">Crear cuenta gratis</router-link>
    </section>


    <!-- ===== NUESTROS SERVICIOS ===== -->
    <h1 class="title-home">Nuestros Servicios</h1>


    <div class="services-grid">
      <router-link :to="{ path: '/Product-item', query: { category: 'Shows Infantiles' } }" class="service-card service-card-shows">
        <span class="service-icon">🎭</span>
        <h3 class="service-name">Shows Infantiles</h3>
        <p class="service-desc">Animación, magia y mucha diversión</p>
      </router-link>
      <router-link :to="{ path: '/Product-item', query: { category: 'Inflables' } }" class="service-card service-card-games">
        <span class="service-icon">🎪</span>
        <h3 class="service-name">Inflables</h3>
        <p class="service-desc">Inflables para bebés, medianos y grandes</p>
      </router-link>
      <router-link :to="{ path: '/Product-item', query: { category: 'Juegos' } }" class="service-card service-card-juegos">
        <span class="service-icon">🎠</span>
        <h3 class="service-name">Juegos</h3>
        <p class="service-desc">Little Tikes, trampolines y juegos para bebés</p>
      </router-link>
      <router-link :to="{ path: '/Product-item', query: { category: 'Carritos Snacks' } }" class="service-card service-card-snacks">
        <span class="service-icon">🍿</span>
        <h3 class="service-name">Carritos Snacks</h3>
        <p class="service-desc">Delicias saladas, dulces y combos</p>
      </router-link>
      <router-link :to="{ path: '/Product-item', query: { category: 'Estética Infantil' } }" class="service-card service-card-estetica">
        <span class="service-icon">🎨</span>
        <h3 class="service-name">Pintacaritas</h3>
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


    <!-- Reviews carrusel -->
    <section class="reviews-section">
      <h2 class="section-title" style="text-align: center; font-size: 32px; font-weight: 800; color: #2D3E94; margin-bottom: 40px;">
        Lo que dicen nuestros clientes
      </h2>
     
      <div class="our-products-wrapper">
        <button class="products-nav products-nav-left" type="button" aria-label="Anterior" @click="scrollReviewsLeft">‹</button>


        <div class="our-products" ref="reviewsTrackRef">
          <div
            v-for="review in reviews"
            :key="review._docId"
            class="logs-item review-card"
            style="flex: 0 0 280px; min-width: 280px; max-width: 320px; text-align: left;"
          >
            <div class="review-stars">
              <span v-for="star in review.stars" :key="star" class="star-icon">⭐</span>
            </div>
            <p class="review-text">"{{ review.text }}"</p>
            <div class="product-mini-info review-meta">
              <h4 class="product-mini-title review-author" style="margin: 0;">{{ review.author }}</h4>
              <span v-if="review.createdAt" class="review-date">{{ formatDate(review.createdAt) }}</span>
            </div>
          </div>


          <div v-if="reviews.length === 0" class="empty-carousel">
            No hay testimonios todavía.
          </div>
        </div>


        <button class="products-nav products-nav-right" type="button" aria-label="Siguiente" @click="scrollReviewsRight">›</button>
      </div>
    </section>


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
      <p class="movilidad-nota">* Otros distritos consultar costo</p>
      <p class="movilidad-nota">Los precios pueden variar según disponibilidad y tipo de evento.</p>
      <div class="faq-cta">
        <p>¿Tienes dudas? Revisa nuestras <router-link to="/FAQ">Preguntas Frecuentes</router-link></p>
      </div>
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


/* ===== POPUP DE BIENVENIDA ===== */
.welcome-popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(45, 62, 148, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}


.welcome-popup-card {
  position: relative;
  background: #FFFFFF;
  border-radius: 28px;
  padding: 40px 32px 32px;
  max-width: 380px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  font-family: 'Nunito', sans-serif;
}


.welcome-popup-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #FDF6EC;
  color: #2D3E94;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 0.2s ease;
}


.welcome-popup-close:hover {
  background: #ffe8f4;
  color: #E91E81;
}


.welcome-popup-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 12px;
}


.welcome-popup-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #2D3E94;
  margin: 0 0 8px;
  line-height: 1.35;
}


.welcome-popup-title strong {
  color: #E91E81;
}


.welcome-popup-subtitle {
  font-size: 0.95rem;
  color: #666;
  margin: 0 0 28px;
}


.welcome-popup-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}


.welcome-popup-profile-btn {
  padding: 14px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #E91E81, #C2185B);
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(233, 30, 129, 0.3);
  transition: transform 0.2s ease;
}


.welcome-popup-profile-btn:hover {
  transform: translateY(-2px);
}


.welcome-popup-dismiss-btn {
  padding: 12px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #2D3E94;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
}


.welcome-popup-dismiss-btn:hover {
  text-decoration: underline;
}


/* Transición del popup */
.fade-popup-enter-active,
.fade-popup-leave-active {
  transition: opacity 0.25s ease;
}


.fade-popup-enter-from,
.fade-popup-leave-to {
  opacity: 0;
}


.fade-popup-enter-active .welcome-popup-card,
.fade-popup-leave-active .welcome-popup-card {
  transition: transform 0.25s ease;
}


.fade-popup-enter-from .welcome-popup-card {
  transform: scale(0.92) translateY(10px);
}


@media (max-width: 480px) {
  .welcome-popup-card {
    padding: 32px 24px 24px;
    border-radius: 24px;
  }


  .welcome-popup-title {
    font-size: 1.2rem;
  }
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
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 10;
  pointer-events: none;
  background: linear-gradient(to right, rgba(45,62,148,0.55) 0%, rgba(45,62,148,0.15) 50%, transparent 100%);
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


/* Wrapper: le da altura real al bloque; sin esta regla base los videos
   (que estan en position:absolute) no aportan altura y todo colapsa. */
.main-video-wrapper {
  position: relative;
  width: 100%;
  height: 80vh;
  min-height: 500px;
  background: linear-gradient(135deg, #2D3E94, #E91E81);
  overflow: hidden;
}


.video-layer-group {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}


/* Capa de fondo: mismo video, cover + blur, rellena los espacios
   que deja el video principal sin recortar su contenido */
.main-video-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: blur(40px) brightness(0.55) saturate(1.3);
  transform: scale(1.2);
  z-index: 1;
}


/* Video principal: contain + zoom calculado dinamicamente por JS
   segun la proporcion real de cada video (variable --video-zoom).
   El valor por defecto (1.5) es un respaldo visual mientras el JS
   calcula el zoom exacto, para que el primer frame no se vea "chico". */
.main-video-player {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
  z-index: 3;
  transform: scale(var(--video-zoom, 1.5));
  transform-origin: center;
  transition: transform 0.3s ease;
}


/* Viñeta que disuelve el borde del video nitido hacia el fondo borroso */
.video-layer-group::after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(to right,
      rgba(0,0,0,0.35) 0%,
      rgba(0,0,0,0) 12%,
      rgba(0,0,0,0) 88%,
      rgba(0,0,0,0.35) 100%);
}


.main-video-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: 48px; height: 48px;
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
  background: rgba(233,30,129,0.85);
  border-color: transparent;
  transform: translateY(-50%) scale(1.08);
}


.main-video-nav-left  { left: 16px; }
.main-video-nav-right { right: 16px; }


.main-video-dots {
  position: absolute;
  bottom: 18px;
  left: 0; right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 20;
  pointer-events: none;
}


.main-video-dots span {
  width: 12px; height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  background: rgba(255,255,255,0.45);
  pointer-events: all;
}


.main-video-dots .active {
  background: #FFD200;
  transform: scale(1.2);
}


.pet-area{
  position: absolute;
  bottom: 0;
  right: 0;
  width: 80px;
  height: 60px;
  z-index: 15;
}


@media (max-width: 768px) {
  .pet-area{
    width: 40px;
    height: 30px;
  }
}


.fade-video-enter-active,
.fade-video-leave-active {
  transition: opacity 0.6s ease-in-out;
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}


.fade-video-enter-from,
.fade-video-leave-to { opacity: 0; }


.intro-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  max-width: 1000px;
  margin: 24px auto;
  padding: 0 24px;
}


.text-home {
  flex: 1;
  max-width: 560px;
  margin: 0;
  text-align: left;
  font-size: 18px;
  line-height: 1.7;
  color: #2D3E94;
}


@keyframes float-mascot {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}


/* ===== RESTO ===== */
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
  width: 60px; height: 4px;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}


.proms-area { text-align: center; margin: 40px 0; }


.prom-access-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}


/* Icono del rinoceronte, chiquito, con un balanceo suave e infinito
   para llamar la atención sin distraer del texto del botón */
.prom-rhino-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
  animation: rhino-bounce 1.8s ease-in-out infinite;
}


@keyframes rhino-bounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-3px) rotate(-6deg); }
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
  background: rgba(233,30,129,0.3);
  border-radius: 10px;
}


.products-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px; height: 42px;
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
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 14px;
  overflow: hidden;
  padding-top: 18px;
  margin-top: 40px;
  text-align: center;
  text-decoration: none;
  color: #2D3E94;
  box-shadow: 0 4px 16px rgba(233,30,129,0.10);
  transition: 0.25s;
}


.logs-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.14);
}


.card-icons {
  width: calc(100% - 20px);
  height: 140px;
  object-fit: contain;
  border-radius: 12px;
  margin: 8px auto 10px;
  display: block;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
  position: relative;
  z-index: 2;
}


.product-mini-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  justify-content: flex-start;
  padding-top: 8px;
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
  top: 22px; right: 10px;
  background: linear-gradient(135deg, #FFD200, #FF9800);
  color: #2D3E94;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 800;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(255,152,0,0.35);
}


.wave-divider {
  position: relative;
  margin-top: -2px;
  line-height: 0;
  background: #000;
}


.wave-divider svg { width: 100%; height: 80px; display: block; }


.wave-divider-hero {
  margin-top: -2px;
  line-height: 0;
  background: linear-gradient(135deg, #E91E81 0%, #7B2D8B 50%, #2D3E94 100%);
}


.wave-divider-hero svg { width: 100%; height: 60px; display: block; }


/* ===== HERO SECTION ===== */
.hero-section {
  background: linear-gradient(135deg, #E91E81 0%, #A130B0 45%, #2D3E94 100%);
  padding: 60px 20px;
  text-align: center;
  color: #FFFFFF;
}


.hero-title { font-size: 2.4rem; font-weight: 800; margin: 0 0 16px; line-height: 1.2; }


.hero-subtitle {
  font-size: 1.1rem;
  margin: 0 auto 40px;
  max-width: 620px;
  opacity: 0.92;
  line-height: 1.6;
}


.hero-stats { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; }


.hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
  min-width: 110px;
}


.hero-stat-number { font-size: 2rem; font-weight: 800; color: #FFD200; line-height: 1; }
.hero-stat-label { font-size: 0.9rem; opacity: 0.9; white-space: nowrap; }


/* ===== BENEFICIOS DE CUENTA ===== */
.beneficios-section {
  background: #ffffff;
  border-radius: 32px;
  margin: 0 40px;
  padding: 56px 40px;
  text-align: center;
  font-family: 'Nunito', sans-serif;
}


.beneficios-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 760px;
  margin: 0 auto 32px;
}


.beneficio-card {
  background: #FDF6EC;
  border-radius: 20px;
  padding: 28px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border-top: 4px solid transparent;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}


/* --- Mobile --- */
@media (max-width: 600px) {
  .beneficios-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 0 16px;
    margin: 0 auto 20px;
  }


  .beneficio-card {
    padding: 14px 16px;
    border-radius: 14px;
    flex-direction: row;
    justify-content: flex-start;
    gap: 12px;
    text-align: left;
  }


  .beneficio-card img,
  .beneficio-card svg {
    width: 32px;
    height: 32px;
  }


  .beneficio-card h3 {
    font-size: 14px;
    margin: 0;
  }


  .beneficio-card p {
    font-size: 13px;
    margin: 0;
  }
}


.beneficio-card:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(0,0,0,0.08); }
.beneficio-card-plata { border-top-color: #9CA3AF; }
.beneficio-card-oro   { border-top-color: #FFD200; }
.beneficio-card-vip   { border-top-color: #E91E81; }
.beneficio-icon { font-size: 2.4rem; line-height: 1; }
.beneficio-nivel { font-size: 1.05rem; font-weight: 800; color: #2D3E94; }
.beneficio-descuento { font-size: 1.3rem; font-weight: 800; color: #E91E81; }


.beneficios-cta-btn {
  display: inline-block;
  background: linear-gradient(135deg, #E91E81, #C2185B);
  color: #fff;
  font-weight: 800;
  font-size: 1rem;
  text-decoration: none;
  padding: 14px 36px;
  border-radius: 999px;
  box-shadow: 0 6px 20px rgba(233,30,129,0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}


.beneficios-cta-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 10px 26px rgba(233,30,129,0.45);
}


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
  background: linear-gradient(135deg, rgba(233,30,129,0.12), rgba(255,152,0,0.1), rgba(45,62,148,0.08));
  border: 2px solid rgba(233,30,129,0.4);
  animation: shimmer-border 3s ease-in-out infinite;
}


@keyframes shimmer-border {
  0%, 100% { box-shadow: 0 2px 12px rgba(233,30,129,0.15); }
  50% { box-shadow: 0 2px 20px rgba(255,152,0,0.3); }
}


.service-card:hover { transform: translateY(-6px); box-shadow: 0 12px 28px rgba(0,0,0,0.12); }
.service-icon { font-size: 2.8rem; line-height: 1; }
.service-name { font-size: 1rem; font-weight: 700; margin: 0; text-align: center; }
.service-desc { font-size: 0.82rem; margin: 0; text-align: center; opacity: 0.75; }


/* ===== Reviews styles ===== */
.review-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 280px;
  max-width: 320px;
  padding: 1.25rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  text-decoration: none;
  color: inherit;
}


.review-stars { margin-bottom: 0.75rem; font-size: 0.9rem; }


.review-text {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #4a4a4a;
  font-style: italic;
  margin: 0 0 1rem 0;
  flex-grow: 1;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
}


.review-meta {
  margin-top: auto;
  border-top: 1px solid #f0f0f0;
  padding-top: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.review-author { font-weight: 600; color: #222222; }
.review-date { font-size: 0.8rem; color: #999999; }
.reviews-section { padding: 3rem 1rem; }


.section-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: #333;
}




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


.movilidad-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(45,62,148,0.12); }
.movilidad-distrito { font-weight: 600; color: #2D3E94; font-size: 0.9rem; margin: 0; flex: 1; }
.movilidad-precio { font-size: 1.2rem; font-weight: 800; color: #E91E81; margin: 0; white-space: nowrap; margin-left: 12px; }
.movilidad-nota { margin-top: 24px; font-size: 0.82rem; color: #aaa; }


.faq-cta { margin-top: 18px; font-size: 0.95rem; color: #2D3E94; }
.faq-cta a { color: #E91E81; font-weight: 700; text-decoration: none; }
.faq-cta a:hover { text-decoration: underline; }


.empty-carousel { padding: 40px 20px; color: #2D3E94; opacity: 0.5; font-size: 0.95rem; }


/* ===== RESPONSIVE ===== */
@media (max-width: 1200px) { .services-grid { grid-template-columns: repeat(3, 1fr); } }


@media (max-width: 900px) {
  .services-grid { grid-template-columns: repeat(2, 1fr); padding: 0 30px 40px; }
  .hero-title { font-size: 1.8rem; }
  .hero-stats { gap: 24px; }
  .movilidad-grid { grid-template-columns: repeat(2, 1fr); }
  .movilidad-section { margin: 0 30px 60px; padding: 40px 30px 60px; }
  .beneficios-section { margin: 0 30px; padding: 44px 24px; }
  .intro-section { gap: 28px; }
}


@media (max-width: 768px) {
  .main-video-wrapper { height: 55vh; min-height: 280px; }
  .main-video-title { font-size: 28px; max-width: 160px; margin-left: 16px; }
  .intro-section { flex-direction: column-reverse; text-align: center; margin: 40px auto; gap: 20px; }
  .text-home { text-align: center; font-size: 16px; padding: 0 20px; margin: 0; }
  .title-home { font-size: 26px; margin: 36px 0 16px 0; }
  .our-products-wrapper { padding: 8px 44px; }
  .logs-item { flex-basis: 180px; margin-top: 16px; }
  .card-icons { height: 110px; margin: 4px auto 8px; }
  .products-nav { width: 32px; height: 32px; font-size: 20px; top: auto; bottom: 0; transform: none; opacity: 0.85; }
  .products-nav-left  { left: 2px; }
  .products-nav-right { right: 2px; }
  .home-area { padding-bottom: 70px; }
  .beneficios-grid { grid-template-columns: 1fr; gap: 14px; max-width: 320px; }
  .welcome-banner { border-radius: 20px; padding: 14px 20px; margin: 12px 20px 0; }
}


@media (max-width: 700px) {
  .our-products-wrapper { padding: 8px 10px; }
  .hero-stats { grid-template-columns: repeat(2, 1fr); }
}


@media (max-width: 600px) { .services-grid { grid-template-columns: 1fr; } }


@media (max-width: 480px) {
  .main-video-wrapper { height: 45vh; min-height: 220px; }
  .main-video-title { font-size: 20px; max-width: 130px; }
  .main-video-nav { display: none; }
  .services-grid { grid-template-columns: 1fr; padding: 0 20px 40px; }
  .hero-title { font-size: 1.5rem; }
  .hero-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; margin: 0 auto; align-items: start; }
  .hero-stat-number { font-size: 1.6rem; }
  .movilidad-grid { grid-template-columns: 1fr; }
  .movilidad-section { margin: 0 20px 50px; padding: 32px 20px 50px; }
  .title-home { font-size: 22px; }
  .logs-item { flex-basis: 160px; }
  .beneficios-section { margin: 0 20px; padding: 36px 16px; }
}
</style>