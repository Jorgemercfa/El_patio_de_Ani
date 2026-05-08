<script setup>
import { computed } from 'vue';
import AdminLayout from '@/components/AdminLayout.vue';
import { useSessionCompany } from '@/auth/session_companies';
import {
  getproductsByCompany,
  getCompanyproducts,
  saveCompanyproducts,
} from '@/auth/companyproductsRepo';
import { useCart } from '@/store/cart';

const { state } = useSessionCompany();
const { getPurchasedproducts } = useCart();

const products = computed(() => getproductsByCompany(state.company));
const totalProducts = computed(() => products.value.length);
const totalOrders = computed(() => getPurchasedproducts().length);
const activeOrders = computed(() =>
  getPurchasedproducts().filter((item) => !item.completedAt).length,
);

function deleteProduct(productId) {
  const allProducts = getCompanyproducts();
  const filtered = allProducts.filter((product) => product.id !== productId);
  saveCompanyproducts(filtered);
}
</script>

<template>
  <AdminLayout>
    <section class="stats-grid">
      <article class="stat-card">
        <p>Total de productos</p>
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
    </section>

    <section class="products-panel">
      <div class="panel-header">
        <h2>Productos registrados</h2>
        <router-link to="/Create-products" class="create-btn"
          >+ Nuevo producto</router-link
        >
      </div>

      <div v-if="products.length === 0" class="empty-card">
        Aún no hay productos registrados.
      </div>

      <div v-else class="products-list">
        <article v-for="product in products" :key="product.id" class="product-row">
          <div>
            <h3>{{ product.name }}</h3>
            <p>{{ product.shortDescription }}</p>
          </div>
          <div class="product-meta">
            <span>S/ {{ Number(product.price ?? 0).toFixed(2) }}</span>
            <span>{{ product.category }}</span>
          </div>
          <div class="product-actions">
            <router-link to="/Company-products" class="edit-btn">Editar</router-link>
            <button class="delete-btn" type="button" @click="deleteProduct(product.id)">
              Eliminar
            </button>
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

.edit-btn,
.delete-btn {
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
}

.edit-btn {
  background: #FFD200;
  color: #2D3E94;
}

.delete-btn {
  background: #E91E81;
  color: white;
}

@media (max-width: 900px) {
  .product-row {
    grid-template-columns: 1fr;
  }
}
</style>
