<script setup>
import { computed } from 'vue';
import AdminLayout from '@/components/AdminLayout.vue';
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
  <AdminLayout>
    <section class="panel">
      <h2 class="panel-title">Detalle de productos</h2>
      <div v-if="products.length === 0" class="empty-state">
        <p>Aún no has creado productos.</p>
        <router-link to="/Create-products" class="create-link">
          Crear mi primer producto
        </router-link>
      </div>

      <div v-else class="products-grid">
        <article v-for="product in products" :key="product.id" class="product-card">
          <h3>{{ product.name }}</h3>
          <p class="short">{{ product.shortDescription }}</p>
          <div class="meta-row">
            <strong>Categoría:</strong>
            <span>{{ product.category }}</span>
          </div>
          <div class="meta-row">
            <strong>Precio:</strong>
            <span>S/ {{ Number(product.price ?? 0).toFixed(2) }}</span>
          </div>
          <div class="meta-row">
            <strong>Creado:</strong>
            <span>{{ formatDate(product.createdAt) }}</span>
          </div>
        </article>
      </div>
    </section>
  </AdminLayout>
</template>

<style scoped>
.panel {
  background: white;
  border: 2px solid #E91E81;
  border-radius: 14px;
  padding: 18px;
}

.panel-title {
  margin: 0 0 16px;
  color: #2D3E94;
}

.empty-state {
  background: #f4f6f3;
  border-radius: 12px;
  padding: 18px;
}

.create-link {
  display: inline-block;
  margin-top: 8px;
  color: #E91E81;
  font-weight: 700;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
}

.product-card {
  background: #fff;
  border: 2px solid #E91E81;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 8px 22px rgba(45, 62, 148, 0.08);
}

.product-card h3 {
  margin: 0 0 8px;
  color: #2D3E94;
}

.short {
  color: #666;
  margin: 0 0 8px;
}

.meta-row {
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
}

.meta-row strong {
  color: #E91E81;
}
</style>
