<script setup>
import { computed } from 'vue';

import NavbarCompanies from '@/components/Navbar-company-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useSessionCompany } from '@/auth/session_companies';
import { getproductsByCompany } from '@/auth/companyproductsRepo';

const { state } = useSessionCompany();

const products = computed(() => getproductsByCompany(state.company));

const formatDate = (isoOrDate) => {
  if (!isoOrDate) return '-';

  const date = new Date(isoOrDate);
  if (Number.isNaN(date.getTime())) return isoOrDate;

  return date.toLocaleDateString('es-PE');
};
</script>

<template>
  <div class="page-wrapper-company">
    <header>
      <NavbarCompanies />
    </header>

    <main class="dashboard-section">
      <div class="dashboard-container">
        <h1 class="page-title">Productos subidos</h1>

        <div v-if="products.length === 0" class="empty-state">
          <p>Aún no has creado productos.</p>
          <router-link to="/Create-products" class="create-link">
            Crear mi primer producto
          </router-link>
        </div>

        <div v-else class="products-grid">
          <article
            v-for="product in products"
            :key="product.id"
            class="product-card"
          >
            <div class="badge">{{ product.percentage || 'Oferta' }}</div>
            <h3>{{ product.name }}</h3>
            <p class="short">{{ product.shortDescription }}</p>
            <div class="meta-row">
              <strong>Categoría:</strong>
              <span>{{ product.category }}</span>
            </div>
            <div class="meta-row">
              <strong>Precio:</strong>
              <span>S/ {{ product.price }}</span>
            </div>
            <div class="meta-row">
              <strong>Creado:</strong>
              <span>{{ formatDate(product.createdAt) }}</span>
            </div>
          </article>
        </div>
      </div>
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
.page-wrapper-company {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f6f3;
}

.dashboard-section {
  flex: 1;
  padding: 100px 0 60px 0;
}

.dashboard-container {
  width: 90%;
  max-width: 1100px;
  margin: auto;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 26px;
}

.empty-state {
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
}

.create-link {
  display: inline-block;
  margin-top: 8px;
  color: #325bcd;
  font-weight: 600;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.product-card {
  position: relative;
  background: #fff;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.07);
}

.badge {
  position: absolute;
  right: 12px;
  top: 12px;
  background: #325bcd;
  color: #fff;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.8rem;
}

.short {
  color: #555;
  margin-bottom: 10px;
}

.meta-row {
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 5px;
}
</style>
