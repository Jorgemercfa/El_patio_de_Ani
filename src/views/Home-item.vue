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

/* =============================
   CARRUSEL RESTAURANTES (scroll)
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
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div class="home-area">

    <!-- Carrusel automático -->
    <div class="carousel-container">
      <img class="img-home" :src="images[currentImageIndex]" />
      <div class="carousel-dots">
        <span
          v-for="(image, index) in images"
          :key="index"
          :class="{ active: index === currentImageIndex }"
          @click="currentImageIndex = index"
        ></span>
      </div>
    </div>

    <!-- Texto hero -->
    <div class="text-home">
      Second Hand donde le damos una segunda oportunidad a los productos.
    </div>

    <!-- Sección: Productos destacados -->
    <h1 class="title-home">Productos destacados</h1>

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
          <div class="product-mini-badge" v-if="product.percentage">
            {{ product.percentage }}
          </div>

          <img class="card-icons" :src="product.image" :alt="product.name" />

          <div class="product-mini-info">
            <h4 class="product-mini-title">{{ product.name }}</h4>
            <div class="product-mini-category" v-if="product.category">
              {{ product.category }}
            </div>
            <div class="product-mini-price">
              S/ {{ product.discount_price ?? product.price }}
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

    <!-- Sección: Electrodomésticos -->
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
          <div class="product-mini-badge" v-if="product.percentage">
            {{ product.percentage }}
          </div>

          <img class="card-icons" :src="product.image" :alt="product.name" />

          <div class="product-mini-info">
            <h4 class="product-mini-title">{{ product.name }}</h4>
            <div class="product-mini-price">
              S/ {{ product.discount_price ?? product.price }}
            </div>
            <div class="product-mini-date" v-if="product.expiration_date">
              Hasta {{ product.expiration_date }}
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

  </div>

  <footer>
    <Footer />
  </footer>
</template>

<style>
/* ===============================
   HERO / CARRUSEL PRINCIPAL
================================= */
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
  background: rgba(45, 62, 148, 0.3); /* --azul-torres con opacidad */
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
  background: #FFD200; /* --amarillo-brillante */
  transform: scale(1.2);
}

/* ===============================
   TEXTO + TÍTULOS
================================= */
.text-home {
  max-width: 900px;
  margin: 60px auto;
  text-align: center;
  font-size: 18px;
  line-height: 1.7;
  color: #2D3E94; /* --azul-torres */
}

.title-home {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin: 80px 0 40px 0;
  position: relative;
  color: #2D3E94; /* --azul-torres */
}

.title-home::after {
  content: '';
  width: 60px;
  height: 4px;
  background-color: #E91E81; /* --rosa-principal */
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

/* ===============================
   CARRUSEL HORIZONTAL
================================= */
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
  background: rgba(233, 30, 129, 0.3); /* --rosa-principal con opacidad */
  border-radius: 10px;
}

/* botones nav */
.products-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid #E91E81; /* --rosa-principal */
  cursor: pointer;
  background: #FFFFFF; /* --blanco-puro */
  color: #E91E81; /* --rosa-principal */
  font-size: 28px;
  line-height: 1;
  display: grid;
  place-items: center;
  z-index: 2;
  transition: all 0.3s ease;
}

.products-nav:hover {
  background: #E91E81; /* --rosa-principal */
  color: #FFFFFF; /* --blanco-puro */
}

.products-nav-left  { left: 14px; }
.products-nav-right { right: 14px; }

/* ===============================
   CARD (logs-item)
================================= */
.logs-item {
  scroll-snap-align: start;
  flex: 0 0 220px;
  min-height: 300px;
  position: relative;
  background: #FFFFFF; /* --blanco-puro */
  border: 2px solid #E91E81; /* --rosa-principal */
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  color: #2D3E94; /* --azul-torres */
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
  color: #2D3E94; /* --azul-torres */
  margin-bottom: 4px;
}

.product-mini-category {
  font-size: 0.75rem;
  font-weight: 600;
  color: #E91E81; /* --rosa-principal */
  background: rgba(233, 30, 129, 0.08);
  padding: 2px 8px;
  border-radius: 20px;
  display: inline-block;
}

.product-mini-price {
  font-weight: bold;
  color: #E91E81; /* --rosa-principal */
  font-size: 1rem;
}

.product-mini-date {
  font-size: 0.8rem;
  color: #2D3E94; /* --azul-torres */
  opacity: 0.65;
}

.product-mini-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #FFD200; /* --amarillo-brillante */
  color: #2D3E94; /* --azul-torres */
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: bold;
}

/* ===============================
   EMPTY STATE
================================= */
.empty-carousel {
  padding: 40px 20px;
  color: #2D3E94;
  opacity: 0.5;
  font-size: 0.95rem;
}

/* ===============================
   CLIENTES
================================= */
.our-customers {
  overflow: hidden;
  background: #E91E81; /* --rosa-principal */
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
  filter: brightness(0) invert(1); /* blanco sobre fondo rosa */
}

.customer-icons:hover {
  transform: scale(1.1);
  opacity: 1;
}

@keyframes scrollCustomers {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ===============================
   SECTOR
================================= */
.our-sector {
  width: 100%;
  height: 300px;
  background: #2D3E94; /* --azul-torres */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

/* ===============================
   RESPONSIVE
================================= */
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