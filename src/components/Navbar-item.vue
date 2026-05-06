<template>
  <nav class="navbar-area">
    <div class="nav-logo">
      <router-link to="/"
        ><img class="logo" src="@/assets/company-logo.png"
      /></router-link>
    </div>

    <div class="link-style" :class="{ 'show-menu': menuOpen }">
      <router-link @click="closeMenu" to="/" class="text-navbar"
        >Inicio</router-link
      >
      <router-link @click="closeMenu" to="/product-item" class="text-navbar"
        >Servicios</router-link
      >
      <router-link @click="closeMenu" to="/Contact-item" class="text-navbar"
        >Contacto</router-link
      >
      <router-link @click="closeMenu" to="/Cart" class="text-navbar cart-link">
        <i class="pi pi-shopping-cart"></i>
        <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
      </router-link>

      <!-- Auth buttons -->
      <router-link
        v-if="!isAuthenticated"
        @click="closeMenu"
        to="/Sign-in"
        class="text-navbar"
        aria-label="Iniciar sesión"
        title="Iniciar sesión"
      >
        <i class="pi pi-sign-in"></i>
      </router-link>

      <router-link
        v-else
        @click="closeMenu"
        to="/Profile"
        class="text-navbar"
        aria-label="Perfil"
        title="Perfil"
      >
        <i class="pi pi-user"></i>
      </router-link>
    </div>

    <div class="hamburger" @click="toggleMenu">☰</div>
  </nav>
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

<style>
/* ✅ NUEVO: Espaciado global para navbar sticky */
html {
  scroll-padding-top: 80px;
}

.navbar-area {
  background: linear-gradient(90deg, #2D3E94, #2D3E94);
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* LOGO */
.nav-logo img.logo {
  height: 45px;
  width: auto;
  border-radius: 6px;
}

/* LINKS DESKTOP */
.link-style {
  display: flex;
  align-items: center;
  gap: 25px;
}

.pi {
  font-size: 20px;
  color: white;
  transition: color 0.3s ease;
}

.text-navbar {
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  position: relative;
  transition: 0.3s ease;
}

/* Línea animada hover */
.text-navbar::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0%;
  height: 2px;
  background: white;
  transition: 0.3s ease;
}

.text-navbar:hover::after {
  width: 100%;
}

/* Ruta activa automática de Vue */
.router-link-active {
  font-weight: 600;
}

.router-link-active::after {
  width: 100%;
}

/* HAMBURGER */
.hamburger {
  display: none;
  font-size: 26px;
  color: white;
  cursor: pointer;
}

/* MOBILE */
@media (max-width: 900px) {
  .link-style {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background: linear-gradient(180deg, #2D3E94, #2549ad);
    padding: 25px 0;
    gap: 20px;
    display: none;
    animation: fadeIn 0.3s ease;
  }

  .link-style.show-menu {
    display: flex;
  }

  .hamburger {
    display: block;
  }

  .text-navbar {
    text-align: center;
    padding: 10px 0;
  }

  .text-navbar::after {
    display: none;
  }

  .router-link-active::after {
    width: 0;
  }
}

.cart-link {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background: #e53935;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
