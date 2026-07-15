<template>
  <div class="navbar-wrapper font-nunito">
    <nav class="navbar-area">
      <!-- 1. LOGO -->
      <div class="nav-logo">
        <router-link to="/">
          <div class="logo-water-wrap">
            <div class="logo-water-bg"></div>
            <img class="logo" src="@/assets/company-logo.png" alt="Logo" />
          </div>
        </router-link>
      </div>

      <!-- 2. LINKS (IZQUIERDA) -->
      <div class="link-style" :class="{ 'show-menu': menuOpen }">

        <div class="mobile-menu-logo">
          <img src="@/assets/company-logo.png" alt="El Patio de Ani" />
        </div>

        <router-link @click="closeMenu" to="/" class="text-navbar">Inicio</router-link>
        <router-link @click="closeMenu" to="/Product-item" class="text-navbar">Servicios</router-link>
        <router-link @click="closeMenu" to="/Contact-item" class="text-navbar">Contacto</router-link>
        <router-link @click="closeMenu" to="/Reviews-item" class="text-navbar">Reseñas</router-link>
        <router-link @click="closeMenu" to="/About-item" class="text-navbar">Nosotros</router-link>

        <!-- CONTENEDOR DEL CARRITO -->
        <router-link @click="closeMenu" to="/Cart" class="text-navbar cart-link">
          <i class="pi pi-shopping-cart"></i>
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

        <!-- REDES SOCIALES DENTRO DEL MENÚ MÓVIL -->
        <div class="social-media-mobile">
          <a href="https://www.facebook.com/people/Alquiler-de-Juegos-Infantiles-El-Patio-de-Ani/100093147260858/" target="_blank"><i class="pi pi-facebook"></i></a>
          <a href="https://www.instagram.com/elpatiode.ani" target="_blank"><i class="pi pi-instagram"></i></a>
          <a href="https://www.tiktok.com/@elpatiode.ani" target="_blank"><i class="pi pi-tiktok"></i></a>
        </div>
      </div>

      <div class="pet-logo">
        <img src="@/assets/rhinoceros.jpeg" class="pet-image" alt="Mascota" />
      </div>

      <!-- 3. REDES SOCIALES (DERECHA) - solo desktop -->
      <div class="social-media">
        <a href="https://www.facebook.com/people/Alquiler-de-Juegos-Infantiles-El-Patio-de-Ani/100093147260858/" target="_blank"><i class="pi pi-facebook"></i></a>
        <a href="https://www.instagram.com/elpatiode.ani" target="_blank"><i class="pi pi-instagram"></i></a>
        <a href="https://www.tiktok.com/@elpatiode.ani" target="_blank"><i class="pi pi-tiktok"></i></a>
        <!-- <a href="https://www.youtube.com/@elpatiode.ani" target="_blank"><i class="pi pi-youtube"></i></a> -->
      </div>

      <!-- HAMBURGUESA / CIERRE ANIMADO -->
      <button
        class="hamburger"
        :class="{ 'is-active': menuOpen }"
        @click="toggleMenu"
        aria-label="Abrir menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
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
  font-family: 'Nunito', sans-serif;
  background: #E91E81;
  border-radius: 999px;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  box-shadow: 0 8px 32px rgba(233, 30, 129, 0.25);
  width: 100%;
  box-sizing: border-box;
}

/* ============================================= */
/* LOGO — ESTA ES LA CORRECCIÓN PRINCIPAL DEL BUG */
/* La imagen no tenía tamaño definido y se        */
/* renderizaba a su tamaño natural (enorme).      */
/* ============================================= */
.nav-logo {
  flex-shrink: 0; /* evita que el navbar lo comprima */
}

.logo-water-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 12px;
  overflow: hidden; /* recorta cualquier exceso de la imagen */
  margin-right: 25px;
  flex-shrink: 0;
}

.logo-water-bg {
  position: absolute;
  inset: -30%;
  background:
    radial-gradient(circle at 30% 40%, rgba(255,255,255,0.35) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(255,255,255,0.28) 0%, transparent 45%),
    linear-gradient(135deg, #2D3E94, #E91E81);
  animation: logoWaterMove 6s ease-in-out infinite;
  z-index: 1;
}

.logo-water-wrap .logo {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: contain; /* mantiene proporción, ya no se desborda */
  margin-right: 0;
}

@keyframes logoWaterMove {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(8%, -5%) scale(1.08); }
}

.link-style {
  display: flex;
  align-items: center;
  gap: 22px;
}

.text-navbar {
  font-family: 'Nunito', sans-serif;
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 800;
}

/* --- SOLUCIÓN AL CARRITO --- */
.cart-link {
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px;
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  font-size: 0.65rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-perfil {
  background: rgba(255, 255, 255, 0.15);
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
}

.pet-logo {
  height: 50px;
  border-radius: 8px;
  margin: 0 25px;
  flex-shrink: 0;
}

.pet-image {
  height: 50px;
  width: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.social-media {
  margin-left: auto;
  display: flex;
  gap: 15px;
}

.social-media i {
  color: white;
  font-size: 24px;
}

/* Redes sociales dentro del menú móvil: ocultas en desktop */
.social-media-mobile {
  display: none;
}

/* ============================================= */
/* HAMBURGUESA ANIMADA (☰ -> ✕)                   */
/* ============================================= */
.hamburger {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 24px;
  padding: 0;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1001;
  flex-shrink: 0;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 3px;
  border-radius: 3px;
  background: white;
  transition: transform 0.25s ease, opacity 0.2s ease;
}

.hamburger.is-active span:nth-child(1) {
  transform: translateY(10.5px) rotate(45deg);
}
.hamburger.is-active span:nth-child(2) {
  opacity: 0;
}
.hamburger.is-active span:nth-child(3) {
  transform: translateY(-10.5px) rotate(-45deg);
}

@media (max-width: 950px) {
  .link-style { display: none; }

  .link-style.show-menu {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: #E91E81;
    z-index: 999;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 80px 30px 40px;
    overflow-y: auto;
    animation: fadeInMenu 0.2s ease;
  }

  @keyframes fadeInMenu {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .mobile-menu-logo {
    display: none;
  }

  .link-style.show-menu .mobile-menu-logo {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
  }

  .link-style.show-menu .mobile-menu-logo img {
    height: 64px;
    width: auto;
    border-radius: 12px;
    background: white;
    padding: 6px;
    object-fit: contain;
  }

  .link-style.show-menu .text-navbar {
    font-size: 1.1rem;
    font-weight: 800;
    color: white;
    background: transparent;
    padding: 14px 24px;
    width: 80%;
    max-width: 320px;
    text-align: center;
    border-radius: 999px;
    border: 2px solid white;
    transition: transform 0.15s ease, background 0.15s ease;
  }

  .link-style.show-menu .text-navbar:active {
    transform: scale(0.97);
    background: rgba(255, 255, 255, 0.1);
  }

  .link-style.show-menu .text-navbar.router-link-exact-active {
    background: white;
    color: #E91E81;
  }

  .link-style.show-menu .cart-link {
    justify-content: center;
    border: none;
    width: auto;
    padding: 14px;
  }

  .link-style.show-menu .cart-link i {
    font-size: 1.6rem;
  }

  .link-style.show-menu .btn-perfil {
    background: transparent;
    color: white;
    border: 2px solid white;
    justify-content: center;
    width: 80%;
    max-width: 320px;
    padding: 14px 24px;
    font-weight: 800;
    margin-top: 8px;
  }

  /* Redes sociales visibles solo dentro del menú móvil abierto */
  .link-style.show-menu .social-media-mobile {
    display: flex;
    gap: 24px;
    margin-top: 20px;
  }

  .social-media-mobile i {
    color: white;
    font-size: 28px;
  }

  /* Oculta las redes de la barra fija en mobile (ya están en el menú) */
  .social-media {
    display: none;
  }

  .hamburger {
    display: flex;
    margin-left: auto;
  }
}
</style>