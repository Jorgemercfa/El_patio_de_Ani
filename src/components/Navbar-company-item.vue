<template>
  <nav class="navbar-company">
    <div class="nav-logo">
      <router-link to="/Home-companies">
        <img class="logo" src="@/assets/company-logo.png" />
      </router-link>
    </div>

    <div class="link-style-company" :class="{ 'show-menu': menuOpen }">
      <router-link
        @click="closeMenu"
        to="/Home-companies"
        class="text-navbar-company"
      >
        Inicio
      </router-link>
      <router-link
        @click="closeMenu"
        to="/Company-products"
        class="text-navbar-company"
      >
        Mis Productos
      </router-link>
      <router-link
        @click="closeMenu"
        to="/Create-products"
        class="text-navbar-company"
      >
        Crear Producto
      </router-link>
      <router-link
        @click="closeMenu"
        to="/Company-profile"
        class="text-navbar-company"
      >
        <i class="pi pi-building"></i>
      </router-link>
    </div>

    <div class="hamburger-company" @click="toggleMenu">☰</div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const menuOpen = ref(false);
const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const closeMenu = () => (menuOpen.value = false);
</script>

<style scoped>
.navbar-company {
  background: linear-gradient(90deg, #325bcd, #325bcd);
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-company .logo {
  height: 45px;
  width: auto;
  border-radius: 6px;
}

.link-style-company {
  display: flex;
  align-items: center;
  gap: 25px;
}

.text-navbar-company {
  color: #e0e0e0;
  text-decoration: none;
  font-size: 0.95rem;
  position: relative;
  transition: 0.3s ease;
}

.text-navbar-company:hover {
  color: #ffffff;
}

.text-navbar-company::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #4fc3f7;
  transition: 0.3s ease;
}

.text-navbar-company:hover::after {
  width: 100%;
}

.router-link-active.text-navbar-company {
  color: #ffffff;
  font-weight: 600;
}

.router-link-active.text-navbar-company::after {
  width: 100%;
}

.text-navbar-company .pi {
  font-size: 20px;
  color: #e0e0e0;
  transition: color 0.3s ease;
}

.text-navbar-company:hover .pi {
  color: #4fc3f7;
}

.hamburger-company {
  display: none;
  font-size: 26px;
  color: white;
  cursor: pointer;
}

@media (max-width: 900px) {
  .link-style-company {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background: linear-gradient(180deg, #1a1a2e, #0f3460);
    padding: 25px 0;
    gap: 20px;
    display: none;
    animation: fadeInCompany 0.3s ease;
  }

  .link-style-company.show-menu {
    display: flex;
  }

  .hamburger-company {
    display: block;
  }

  .text-navbar-company {
    text-align: center;
    padding: 10px 0;
  }

  .text-navbar-company::after {
    display: none;
  }
}

@keyframes fadeInCompany {
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
