<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionCompany } from '@/auth/session_companies';

const router = useRouter();
const { state, logout } = useSessionCompany();

const companyName = computed(() => state.company?.name || 'El Patio de Ani');

function closeSession() {
  logout();
  router.push({ name: 'SignInCompany' });
}
</script>

<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <h2 class="brand-title">El Patio de Ani</h2>
      <nav class="admin-nav">
        <router-link to="/Home-companies" class="admin-link">Inicio</router-link>
        <router-link to="/Company-products" class="admin-link"
          >Productos</router-link
        >
        <router-link to="/Orders-companies" class="admin-link">Pedidos</router-link>
        <router-link to="/Create-products" class="admin-link"
          >Crear producto</router-link
        >
        <router-link to="/Company-products" class="admin-link">Perfil</router-link>
        <button class="logout-btn" type="button" @click="closeSession">
          Cerrar sesión
        </button>
      </nav>
    </aside>

    <div class="admin-main">
      <header class="admin-header">
        <h1 class="admin-title">Panel Admin</h1>
        <p class="admin-business">{{ companyName }}</p>
      </header>
      <main class="admin-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr;
  background: #f4f6f3;
}

.admin-sidebar {
  background: #2d3e94;
  color: white;
  padding: 24px 16px;
  position: sticky;
  top: 0;
  height: 100vh;
}

.brand-title {
  margin: 0 0 24px;
  font-size: 1.2rem;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.admin-link,
.logout-btn {
  border: none;
  text-align: left;
  text-decoration: none;
  background: transparent;
  color: #fff;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
}

.admin-link:hover,
.admin-link.router-link-active,
.logout-btn:hover {
  background: #e91e81;
}

.admin-main {
  padding: 24px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.admin-title {
  margin: 0;
  font-size: 1.6rem;
  background: linear-gradient(135deg, #e91e81, #2d3e94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.admin-business {
  margin: 0;
  color: #2d3e94;
  font-weight: 700;
}

.admin-content {
  display: block;
}

@media (max-width: 900px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }

  .admin-sidebar {
    position: static;
    height: auto;
  }
}
</style>
