<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import AdminLayout from '@/components/AdminLayout.vue';
import {
  getCompanyproducts,
  resetCompanyproductToSeed,
} from '@/auth/companyproductsRepo';

const router = useRouter();
const search = ref('');
const activeFilter = ref('Todas');
const services = ref([]);

const categories = [
  'Todas',
  'Shows Infantiles',
  'Juegos e Inflables',
  'Carritos Snacks',
  'Estética Infantil',
];

function loadServices() {
  services.value = getCompanyproducts();
}

const totalServices = computed(() => services.value.length);
const totalModified = computed(
  () => services.value.filter((service) => service?._modified).length,
);
const filteredServices = computed(() => {
  const term = search.value.trim().toLowerCase();

  return services.value.filter((service) => {
    const matchesCategory =
      activeFilter.value === 'Todas' || service.category === activeFilter.value;
    const matchesName = (service.name || '').toLowerCase().includes(term);
    return matchesCategory && matchesName;
  });
});

function onReset(serviceId) {
  resetCompanyproductToSeed(serviceId);
  loadServices();
}

onMounted(loadServices);
</script>

<template>
  <AdminLayout>
    <section class="services-panel">
      <div class="panel-header">
        <h2>Servicios del catálogo</h2>
        <div class="panel-counters">
          <span class="counter">Total: {{ totalServices }}</span>
          <span class="counter modified">Modificados: {{ totalModified }}</span>
        </div>
      </div>

      <input
        v-model="search"
        class="search-input"
        type="text"
        placeholder="Buscar por nombre..."
      />

      <div class="filters">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="filter-pill"
          :class="{ active: activeFilter === category }"
          @click="activeFilter = category"
        >
          {{ category }}
        </button>
      </div>

      <div v-if="filteredServices.length === 0" class="empty-card">
        No se encontraron servicios con los filtros actuales.
      </div>

      <div v-else class="services-grid">
        <article
          v-for="service in filteredServices"
          :key="service.id"
          class="service-card"
        >
          <img
            v-if="service.image"
            :src="service.image"
            :alt="service.name"
            class="service-image"
          />
          <div class="service-body">
            <div class="title-row">
              <h3>{{ service.name }}</h3>
              <span v-if="service._modified" class="badge-modified">Modificado</span>
            </div>
            <p class="meta">
              {{ service.category || '-' }}
              <span v-if="service.subcategory">/ {{ service.subcategory }}</span>
            </p>
            <p class="price">S/ {{ Number(service.price ?? 0).toFixed(2) }}</p>
            <p class="description">{{ service.shortDescription || '-' }}</p>
            <div class="actions">
              <button
                type="button"
                class="edit-btn"
                @click="router.push(`/Edit-service/${service.id}`)"
              >
                Editar
              </button>
              <button
                type="button"
                class="restore-btn"
                @click="onReset(service.id)"
              >
                Restaurar
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  </AdminLayout>
</template>

<style scoped>
.services-panel {
  background: #fff;
  border: 2px solid #e91e81;
  border-radius: 14px;
  padding: 18px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.panel-header h2 {
  margin: 0;
  color: #2d3e94;
}

.panel-counters {
  display: flex;
  gap: 8px;
}

.counter {
  background: #f4f6f3;
  border: 1px solid #e91e81;
  color: #2d3e94;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.85rem;
  font-weight: 700;
}

.counter.modified {
  background: #ffd200;
}

.search-input {
  width: 100%;
  border: 1.5px solid #ddd;
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 12px;
}

.search-input:focus {
  outline: none;
  border-color: #e91e81;
  box-shadow: 0 0 0 3px rgba(233, 30, 129, 0.12);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.filter-pill {
  border: 2px solid #e91e81;
  border-radius: 999px;
  background: #fff;
  color: #e91e81;
  padding: 7px 14px;
  cursor: pointer;
  font-weight: 600;
}

.filter-pill.active {
  background: #e91e81;
  color: #fff;
}

.empty-card {
  border-radius: 12px;
  background: #f4f6f3;
  padding: 16px;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.service-card {
  border: 1px solid #f0d3e6;
  border-radius: 12px;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  overflow: hidden;
}

.service-image {
  width: 160px;
  height: 160px;
  min-width: 160px;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 10px 0 0 10px;
}

.service-body {
  flex: 1;
  min-width: 0;
  padding: 14px;
}

.title-row {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
}

.title-row h3 {
  margin: 0;
  color: #2d3e94;
  word-break: break-word;
  overflow-wrap: break-word;
}

.badge-modified {
  background: #ffd200;
  color: #2d3e94;
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: 700;
}

.meta {
  margin: 6px 0 0;
  color: #2d3e94;
  font-size: 0.9rem;
}

.price {
  margin: 6px 0;
  color: #e91e81;
  font-weight: 800;
}

.description {
  margin: 0 0 12px;
  color: #555;
}

.actions {
  display: flex;
  gap: 8px;
}

.edit-btn,
.restore-btn {
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  cursor: pointer;
  font-weight: 700;
}

.edit-btn {
  background: #ffd200;
  color: #2d3e94;
}

.restore-btn {
  background: #e91e81;
  color: #fff;
}

@media (max-width: 600px) {
  .service-card {
    flex-direction: column;
  }

  .service-image {
    width: 100%;
    height: 200px;
    min-width: 0;
    border-radius: 10px 10px 0 0;
  }

  .service-body {
    padding: 0 12px 12px;
  }
}
</style>
