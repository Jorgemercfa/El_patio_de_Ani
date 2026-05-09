<template>
  <div class="navbar-wrapper">
    <nav class="navbar-area">
      <!-- 1. LOGO -->
      <div class="nav-logo">
        <router-link to="/">
          <img class="logo" src="@/assets/company-logo.png" alt="Logo" />
        </router-link>
      </div>

      <!-- 2. LINKS (IZQUIERDA) -->
      <div class="link-style" :class="{ 'show-menu': menuOpen }">
        <router-link @click="closeMenu" to="/" class="text-navbar">Inicio</router-link>
        <router-link @click="closeMenu" to="/product-item" class="text-navbar">Servicios</router-link>
        <router-link @click="closeMenu" to="/Contact-item" class="text-navbar">Contacto</router-link>

        <!-- CONTENEDOR DEL CARRITO -->
        <router-link @click="closeMenu" to="/Cart" class="text-navbar cart-link">
          <i class="pi pi-shopping-cart"></i>
          <!-- El puntito de notificación -->
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </router-link>

        <!-- BOTÓN PERFIL -->
        <router-link
          v-if="!isAuthenticated"
          @click="closeMenu"
          to="/Sign-in"
          class="text-navbar btn-perfil"
        >
          <i class="pi pi-sign-in"></i> Iniciar sesión
        </router-link>

        <router-link
          v-else
          @click="closeMenu"
          to="/Profile"
          class="text-navbar btn-perfil"
        >
          <i class="pi pi-user"></i> Mi perfil
        </router-link>
      </div>

      <!-- 3. REDES SOCIALES (DERECHA) -->
      <div class="social-media">
          <a href="https://www.facebook.com/people/Alquiler-de-Juegos-Infantiles-El-Patio-de-Ani/100093147260858/" target="_blank"><i class="pi pi-facebook"></i></a>
          <a href="https://www.instagram.com/elpatiode.ani" target="_blank"><i class="pi pi-instagram"></i></a>
          <a href="https://www.tiktok.com/@elpatiode.ani" target="_blank"><i class="pi pi-tiktok"></i></a>
          <!-- <a href="https://wa.me/51975495623" target="_blank"><i class="pi pi-whatsapp"></i></a> -->
      </div>

      <div class="hamburger" @click="toggleMenu">☰</div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSession } from '@/auth/session';
import { useCart } from '@/store/cart.js';

const menuOpen = ref(false);
const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const closeMenu = () => (menuOpen.value = false);

const { isAuthenticated } = useSession();
const { cartCount } = useCart();
</script>

<style scoped>
.navbar-wrapper {
  position: sticky;
  top: 16px;
  z-index: 1000;
  padding: 0 24px;
  margin-top: 16px;
}

.navbar-area {
  background: #E91E81;
  border-radius: 999px;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  box-sizing: border-box;
}

.nav-logo img.logo {
  height: 50px;
  border-radius: 8px;
  margin-right: 25px;
}

.link-style {
  display: flex;
  align-items: center;
  gap: 22px;
}

.text-navbar {
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
}

/* --- SOLUCIÓN AL CARRITO --- */
.cart-link {
  position: relative; /* ESTO ES LO MÁS IMPORTANTE: Ancla la notificación */
  display: flex;
  align-items: center;
  padding: 5px;
}

.cart-badge {
  position: absolute;
  top: -6px;      /* Ajusta hacia arriba */
  right: -8px;    /* Ajusta hacia la derecha */
  background: #ff4757; /* Rojo */
  color: white;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  font-size: 0.65rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 2px solid #2D3E94; */
}
/* --------------------------- */

.btn-perfil {
  background: rgba(255, 255, 255, 0.15);
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
}

.social-media {
  margin-left: auto; /* Empuja redes a la derecha */
  display: flex;
  gap: 15px;
}

.social-media i {
  color: white;
  font-size: 24px;
}

.hamburger {
  display: none;
  color: white;
  font-size: 24px;
}

@media (max-width: 950px) {
  .link-style { display: none; }
  .hamburger { display: block; margin-left: auto; }
  .social-media { display: none; }
}
</style>