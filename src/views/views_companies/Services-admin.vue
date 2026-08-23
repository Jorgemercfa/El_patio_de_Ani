<script setup>
import { computed, onMounted, ref, watch, nextTick } from 'vue';
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router';
import AdminLayout from '@/components/AdminLayout.vue';
import {
  fetchCompanyproducts,
  getCompanyproducts,
  resetCompanyproductToSeed,
  deleteCompanyproduct,
} from '@/auth/companyproductsRepo';
import { saveScrollPosition, popScrollPosition, getScrollY, setScrollY } from '@/constants/scrollMemory';

const router = useRouter();
const route = useRoute();

const search = ref('');
const activeFilter = ref('Todas');
const activeSubcategoryFilter = ref('Todas');
const isLoading = ref(true);
const isRestoringFromUrl = ref(true); // evita que el watch pise la URL mientras restauramos
const services = computed(() => getCompanyproducts());

const ESTETICA_INFANTIL_CATEGORY = 'Estética Infantil';
const LAST_EDITED_KEY = 'admin_services_last_edited_id';

const categories = [
  'Todas',
  'Shows Infantiles',
  'Inflables',
  'Juegos',
  'Carritos Snacks',
  ESTETICA_INFANTIL_CATEGORY,
];

const subcategoryMap = {
  'Shows Infantiles': ['Animación', 'Competencia', 'Magia'],
  Inflables: ['Bebes', 'Mediano', 'Grande', 'Acuáticos'],
  Juegos: ['Juegos Little Tikes', 'Trampolines', 'Juegos para Bebés'],
  'Carritos Snacks': ['Salados', 'Dulces', 'Dúo Packs', 'Combos'],
  [ESTETICA_INFANTIL_CATEGORY]: ['Pintacaritas', 'Glitter Bar'],
};

const availableSubcategories = computed(() =>
  activeFilter.value === 'Todas' ? [] : (subcategoryMap[activeFilter.value] || []),
);

// --- Persistir filtro en la URL (mismo patrón que Product-item.vue) ---
watch(activeFilter, (newCat) => {
  activeSubcategoryFilter.value = 'Todas';
  if (isRestoringFromUrl.value) return;
  router.replace({
    query: {
      ...(newCat !== 'Todas' ? { category: newCat } : {}),
    },
  });
});

watch(activeSubcategoryFilter, (newSub) => {
  if (isRestoringFromUrl.value) return;
  const currentCat = activeFilter.value;
  router.replace({
    query:
      currentCat !== 'Todas'
        ? { category: currentCat, ...(newSub !== 'Todas' ? { subcategory: newSub } : {}) }
        : {},
  });
});

async function loadServices() {
  isLoading.value = true;
  await fetchCompanyproducts();
  isLoading.value = false;
}

// --- helpers portados desde Product-item.vue ---
const normalizeText = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const getServiceName = (service) => service.name || 'Servicio sin nombre';

const parsePrice = (value) => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value !== 'string') return null;
  const cleaned = value.trim().replace(/[^\d.,-]/g, '');
  if (!cleaned) return null;
  const lastComma = cleaned.lastIndexOf(',');
  const lastDot = cleaned.lastIndexOf('.');
  const decimalIndex = Math.max(lastComma, lastDot);
  const normalizedValue =
    decimalIndex >= 0
      ? `${cleaned.slice(0, decimalIndex).replace(/[.,]/g, '')}.${cleaned.slice(decimalIndex + 1).replace(/[.,]/g, '')}`
      : cleaned.replace(/[.,]/g, '');
  const parsed = Number(normalizedValue);
  return Number.isFinite(parsed) ? parsed : null;
};

const formatPrice = (service) => {
  const price = parsePrice(service.price);
  return price === null ? 'Precio no disponible' : `S/ ${price.toFixed(2)}`;
};
// --- fin helpers ---

const totalServices = computed(() => services.value.length);
const totalModified = computed(
  () => services.value.filter((service) => service?._modified).length,
);

const filteredServices = computed(() => {
  const term = normalizeText(search.value);

  return services.value.filter((service) => {
    const matchesCategory =
      activeFilter.value === 'Todas' || service.category === activeFilter.value;

    const targetSub = normalizeText(activeSubcategoryFilter.value);
    const matchesSubcategory =
      activeSubcategoryFilter.value === 'Todas' ||
      normalizeText(service.subcategory) === targetSub ||
      normalizeText(service.subcategory2) === targetSub;

    const matchesName = normalizeText(service.name).includes(term);

    return matchesCategory && matchesSubcategory && matchesName;
  });
});

async function onReset(serviceId) {
  await resetCompanyproductToSeed(serviceId);
}

async function onDelete(serviceId) {
  if (!confirm('¿Seguro que deseas eliminar este servicio? Esta acción no se puede deshacer.')) return;
  await deleteCompanyproduct(serviceId);
  sessionStorage.removeItem(LAST_EDITED_KEY);
}

function goToEdit(serviceId) {
  // Guardamos qué servicio se va a editar para poder ubicarlo al volver
  sessionStorage.setItem(LAST_EDITED_KEY, String(serviceId));
  router.push(`/Edit-service/${serviceId}`);
}

function scrollToService(serviceId) {
  const el = document.querySelector(`[data-service-id="${serviceId}"]`);
  if (!el) return false;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.classList.add('service-card--highlight');
  setTimeout(() => el.classList.remove('service-card--highlight'), 1600);
  return true;
}

onMounted(async () => {
  // 1. Restaurar filtro desde la URL
  if (route.query.category) {
    activeFilter.value = route.query.category;
  }
  if (route.query.subcategory) {
    activeSubcategoryFilter.value = route.query.subcategory;
  }

  // 2. Restaurar scroll aproximado guardado al salir hacia Edit-service
  const savedY = popScrollPosition(route.fullPath);
  if (savedY === null) setScrollY(0);

  await loadServices();
  await nextTick();

  // 3. Priorizar volver exactamente al servicio editado; si no existe
  //    (fue eliminado, o no venimos de una edición), caer al scroll guardado.
  const lastEditedId = sessionStorage.getItem(LAST_EDITED_KEY);
  const focused = lastEditedId ? scrollToService(lastEditedId) : false;

  if (!focused) {
    if (savedY !== null) setScrollY(savedY);
    else setScrollY(0);
  }

  isRestoringFromUrl.value = false;
});

onBeforeRouteLeave((to, from) => {
  // from.fullPath ya incluye category/subcategory en la query, así que la
  // posición queda ligada al filtro activo, igual que en Product-item.vue
  saveScrollPosition(from.fullPath, getScrollY());
});
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

      <div v-if="availableSubcategories.length" class="filters">
        <button
          type="button"
          class="filter-pill"
          :class="{ active: activeSubcategoryFilter === 'Todas' }"
          @click="activeSubcategoryFilter = 'Todas'"
        >
          Todas
        </button>
        <button
          v-for="subcategory in availableSubcategories"
          :key="subcategory"
          type="button"
          class="filter-pill"
          :class="{ active: activeSubcategoryFilter === subcategory }"
          @click="activeSubcategoryFilter = subcategory"
        >
          {{ subcategory }}
        </button>
      </div>

      <!-- Skeleton mientras carga -->
      <div v-if="isLoading" class="services-grid">
        <div v-for="n in 4" :key="n" class="skeleton-card">
          <div class="skeleton-img"></div>
          <div class="skeleton-body">
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
          </div>
        </div>
      </div>

      <div v-else-if="filteredServices.length === 0" class="empty-card">
        No se encontraron servicios con los filtros actuales.
      </div>

      <div v-else class="services-grid">
        <article
          v-for="service in filteredServices"
          :key="service.id"
          :data-service-id="service.id"
          class="service-card"
        >
          <img
            v-if="service.image"
            :src="service.image"
            :alt="getServiceName(service)"
            class="service-image"
            loading="lazy"
          />
          <div class="service-body">
            <div class="title-row">
              <h3>{{ getServiceName(service) }}</h3>
              <span v-if="service._modified" class="badge-modified">Modificado</span>
            </div>
            <p class="meta">
              {{ service.category || '-' }}
              <span v-if="service.subcategory">/ {{ service.subcategory }}</span>
              <span v-if="service.subcategory2"> / {{ service.subcategory2 }}</span>
            </p>
            <p class="price">{{ formatPrice(service) }}</p>
            <p class="description">{{ service.shortDescription || '-' }}</p>
            <div class="actions">
              <button
                type="button"
                class="edit-btn"
                @click="goToEdit(service.id)"
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
              <button type="button" class="delete-btn" @click="onDelete(service.id)">
                Eliminar
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
  background: #FDF6EC;
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
  background: #FDF6EC;
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

.service-card--highlight {
  animation: highlightPulse 1.6s ease;
}

@keyframes highlightPulse {
  0%   { box-shadow: 0 0 0 3px rgba(233, 30, 129, 0.6); }
  100% { box-shadow: 0 0 0 0 rgba(233, 30, 129, 0); }
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

.delete-btn {
  background: #d32f2f;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  cursor: pointer;
  font-weight: 700;
}

.delete-btn:hover {
  background: #b71c1c;
}

/* Skeleton loader */
.skeleton-card {
  border: 1px solid #f0d3e6;
  border-radius: 12px;
  background: #fff;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 0;
}

.skeleton-img {
  width: 160px;
  height: 160px;
  min-width: 160px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

.skeleton-body {
  flex: 1;
  padding: 14px;
}

.skeleton-line {
  height: 14px;
  border-radius: 8px;
  margin-top: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

.skeleton-line.short { width: 60%; }

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
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

  .skeleton-card {
    flex-direction: column;
  }

  .skeleton-img {
    width: 100%;
    height: 200px;
    min-width: 0;
  }
}
</style>