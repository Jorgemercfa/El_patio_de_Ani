<script setup>
import { computed } from 'vue';
import AdminLayout from '@/components/AdminLayout.vue';
import { getCompanyproducts } from '@/auth/companyproductsRepo';
import { useCart } from '@/store/cart';

const { getPurchasedproducts } = useCart();

const totalProducts = computed(() => getCompanyproducts().length);
const modifiedServices = computed(
  () => getCompanyproducts().filter((product) => product._modified).length,
);
const totalOrders = computed(() => getPurchasedproducts().length);
const activeOrders = computed(() =>
  getPurchasedproducts().filter((item) => !item.completedAt).length,
);

const catalogServices = computed(() => getCompanyproducts().slice(0, 6));
</script>

<template>
  <AdminLayout>
    <section class="stats-grid">
      <article class="stat-card">
        <p>Total de servicios</p>
        <h3>{{ totalProducts }}</h3>
      </article>
      <article class="stat-card">
        <p>Pedidos recibidos</p>
        <h3>{{ totalOrders }}</h3>
      </article>
      <article class="stat-card">
        <p>Pedidos activos</p>
        <h3>{{ activeOrders }}</h3>
      </article>
      <article class="stat-card">
        <p>Servicios modificados</p>
        <h3>{{ modifiedServices }}</h3>
      </article>
    </section>

    <section class="products-panel">
      <div class="panel-header">
        <h2>Servicios del catálogo</h2>
        <router-link to="/Services-admin" class="create-btn">Ver todos →</router-link>
      </div>

      <div v-if="catalogServices.length === 0" class="empty-card">
        Aún no hay servicios en el catálogo.
      </div>

      <div v-else class="products-list">
        <article v-for="service in catalogServices" :key="service.id" class="product-row">
          <div>
            <h3>{{ service.name }}</h3>
            <p>{{ service.category }}</p>
          </div>
          <div class="product-meta">
            <span>S/ {{ Number(service.price ?? 0).toFixed(2) }}</span>
          </div>
          <div class="product-actions">
            <router-link :to="`/Edit-service/${service.id}`" class="edit-btn"
              >Editar</router-link
            >
          </div>
        </article>
      </div>
    </section>
  </AdminLayout>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 20px;
}

.stat-card {
  background: white;
  border: 2px solid #E91E81;
  border-radius: 14px;
  padding: 16px;
}

.stat-card p {
  margin: 0;
  color: #2D3E94;
}

.stat-card h3 {
  margin: 8px 0 0;
  color: #E91E81;
  font-size: 2rem;
}

.products-panel {
  background: white;
  border: 2px solid #E91E81;
  border-radius: 14px;
  padding: 18px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.panel-header h2 {
  margin: 0;
  color: #2D3E94;
}

.create-btn {
  background: #FFD200;
  color: #2D3E94;
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700;
}

.empty-card {
  border-radius: 10px;
  padding: 16px;
  background: #f4f6f3;
}

.products-list {
  display: grid;
  gap: 10px;
}

.product-row {
  border: 1px solid #f0d3e6;
  border-radius: 12px;
  padding: 12px;
  display: grid;
  grid-template-columns: 1.5fr 1fr auto;
  gap: 10px;
  align-items: center;
}

.product-row h3 {
  margin: 0;
  color: #2D3E94;
}

.product-row p {
  margin: 4px 0 0;
  color: #666;
  font-size: 0.9rem;
}

.product-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #E91E81;
  font-weight: 700;
}

.product-actions {
  display: flex;
  gap: 8px;
}

.edit-btn {
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  background: #FFD200;
  color: #2D3E94;
}

@media (max-width: 900px) {
  .product-row {
    grid-template-columns: 1fr;
  }
}
</style>
