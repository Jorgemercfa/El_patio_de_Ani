<script setup>
// ✅ Un solo import con todo lo necesario
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'  // ← agregar useRoute
import Footer from '@/components/Footer-item.vue'
import Navbar from '@/components/Navbar-item.vue'
import { getCompanyproducts } from '@/auth/companyproductsRepo'

const router = useRouter()
const route = useRoute()  // ← declarar route

const ESTETICA_INFANTIL_CATEGORY = 'Estética Infantil'
const allProducts = computed(() => getCompanyproducts())

const categories = ['Todas', 'Shows Infantiles', 'Inflables', 'Juegos', 'Carritos Snacks', ESTETICA_INFANTIL_CATEGORY]
const activeFilter = ref('Todas')
const activeSubcategory = ref('')

// ✅ Eliminar activeCategory duplicado, usar activeFilter directamente
onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  if (route.query.category) {
    activeFilter.value = route.query.category  // ← conectar al filtro real
  }
})

const subcategoryMap = {
  'Shows Infantiles':  ['Animación', 'Competencia', 'Magia'],
  'Inflables':         ['Bebes', 'Mediano', 'Grande'],
  'Juegos':            ['Juegos Little Tikes', 'Trampolines', 'Juegos para Bebés'],
  [ESTETICA_INFANTIL_CATEGORY]: ['Pintacaritas', 'Glitter Bar'],
  'Carritos Snacks':   ['Salados', 'Dulces', 'Dúo Packs', 'Combos'],
}

const activeSubcategories = computed(() =>
  activeFilter.value !== 'Todas' ? (subcategoryMap[activeFilter.value] ?? []) : []
)

const filterScrollTimeout = ref(null)

watch(activeFilter, () => {
  activeSubcategory.value = ''

  if (filterScrollTimeout.value) clearTimeout(filterScrollTimeout.value)

  filterScrollTimeout.value = setTimeout(() => {
    const el = document.querySelector('.products-container')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
})

onBeforeUnmount(() => {
  if (filterScrollTimeout.value) clearTimeout(filterScrollTimeout.value)
})

const products = computed(() => {
  let list = activeFilter.value === 'Todas'
    ? allProducts.value
    : allProducts.value.filter((p) => p.category === activeFilter.value)

  if (activeSubcategory.value) {
    list = list.filter((p) => p.subcategory === activeSubcategory.value)
  }
  return list
})

const getProductName = (product) => product.name || 'Producto sin nombre'
const getShortDescription = (product) => product.shortDescription || ''
const getCategory = (product) => product.category || ''
const getSubcategory = (product) => product.subcategory || ''

const parsePrice = (value) => {
  if (value === null || value === undefined || value === '') return null

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }

  if (typeof value !== 'string') return null

  const cleaned = value.trim().replace(/[^\d.,-]/g, '')
  if (!cleaned) return null

  const lastComma = cleaned.lastIndexOf(',')
  const lastDot = cleaned.lastIndexOf('.')
  const decimalIndex = Math.max(lastComma, lastDot)

  const normalizedValue =
    decimalIndex >= 0
      ? `${cleaned.slice(0, decimalIndex).replace(/[.,]/g, '')}.${cleaned
          .slice(decimalIndex + 1)
          .replace(/[.,]/g, '')}`
      : cleaned.replace(/[.,]/g, '')

  const parsed = Number(normalizedValue)
  return Number.isFinite(parsed) ? parsed : null
}

const getProductPrice = (product) => {
  const directPrice = parsePrice(product.price)
  if (directPrice !== null) return directPrice

  const originalPrice = parsePrice(product.originalPrice)
  if (originalPrice !== null) return originalPrice

  const discountPrice = parsePrice(product.discount_price)
  if (discountPrice !== null) return discountPrice

  const tributoPrice = parsePrice(product.tributo)
  if (tributoPrice !== null) return tributoPrice

  return null
}

const formatPrice = (product) => {
  const price = getProductPrice(product)
  if (price === null) return 'Precio no disponible'
  return `S/ ${price.toFixed(2)}`
}
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div class="products-area">
    <h1 class="title-products">Nuestros Servicios</h1>

    <!-- Filtro de categorías -->
    <div class="filter-pills">
      <button
        v-for="cat in categories"
        :key="cat"
        class="filter-pill"
        :class="{ active: activeFilter === cat }"
        @click="activeFilter = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Filtro de subcategorías (solo cuando hay categoría activa) -->
    <div v-if="activeSubcategories.length > 0" class="filter-subcategory-wrapper">
      <span class="filter-subcategory-label">↳ Subcategoría:</span>
      <div class="filter-pills filter-pills-sub">
        <button
          class="filter-pill filter-pill-sub"
          :class="{ active: activeSubcategory === '' }"
          @click="activeSubcategory = ''"
        >
          Todas las subcategorías
        </button>
        <button
          v-for="sub in activeSubcategories"
          :key="sub"
          class="filter-pill filter-pill-sub"
          :class="{ active: activeSubcategory === sub }"
          @click="activeSubcategory = sub"
        >
          {{ sub }}
        </button>
      </div>
    </div>

    <div class="products-container">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
        :class="{ 'product-card--estetica': product.category === ESTETICA_INFANTIL_CATEGORY }"
      >
        <img
          v-if="product.image"
          :src="product.image"
          :alt="getProductName(product)"
          class="product-image"
          loading="lazy"
        />

        <div class="product-content">
          <div class="product-badges" v-if="getCategory(product)">
            <span class="badge-category">{{ getCategory(product) }}</span>
            <span class="badge-subcategory" v-if="getSubcategory(product)">
              {{ getSubcategory(product) }}
            </span>
          </div>

          <h2 class="product-title">{{ getProductName(product) }}</h2>

          <p class="product-description" v-if="getShortDescription(product)">
            {{ getShortDescription(product) }}
          </p>

          <p class="product-price">{{ formatPrice(product) }}</p>
        </div>

        <button
          class="details-button"
          @click="router.push({ name: 'productsDetails', params: { id: product.id } })"
        >
          Ver detalles
        </button>
      </div>
    </div>
  </div>

  <div class="sticky-cta-bar">
    <span class="sticky-cta-text">¿Listo para reservar?</span>
    <router-link to="/Contact-item" class="sticky-cta-btn">📲 Cotizar ahora</router-link>
  </div>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
.products-area {
  font-family: 'Nunito', sans-serif;
  margin: 42px 6%;
}

.title-products {
  font-size: clamp(1.8rem, 2vw + 1rem, 2.5rem);
  margin-bottom: 32px;
  position: relative;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @apply font-black text-left;
}

.title-products::after {
  content: '';
  width: 64px;
  height: 4px;
  background-color: #E91E81;
  position: absolute;
  bottom: -10px;
  left: 0;
  border-radius: 5px;
}

.filter-pills {
  @apply flex flex-wrap gap-2 mb-4;
}

.filter-pills-sub {
  @apply mb-0;
}

.filter-subcategory-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 28px;
  padding: 10px 14px;
  background: #f0f4ff;
  border-radius: 12px;
  border-left: 3px solid #2D3E94;
}

.filter-subcategory-label {
  font-size: 0.82rem;
  font-weight: 800;
  color: #2D3E94;
  white-space: nowrap;
  opacity: 0.75;
}

.filter-pill {
  @apply px-5 py-2 rounded-full border-2 bg-white 
         font-extrabold text-sm cursor-pointer 
         transition-all duration-200 whitespace-nowrap;
  border-color: #E91E81;
  color: #E91E81;
}

.filter-pill.active {
  background: linear-gradient(135deg, #E91E81, #7B2D8B);
  @apply text-white shadow-md -translate-y-px border-transparent;
}

.filter-pill:hover {
  background-color: #E91E81;
  @apply text-white;
}

.filter-pill-sub {
  @apply px-4 py-1.5 text-xs;
  border-color: #2D3E94;
  color: #2D3E94;
}

.product-card--estetica {
  background: linear-gradient(135deg, #fff0f7 0%, #fff9e6 50%, #f0f0ff 100%);
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 4px 20px rgba(233, 30, 129, 0.15);
}

.filter-pill-sub.active,
.filter-pill-sub:hover {
  background-color: #2D3E94;
  @apply text-white;
}

.products-container {
  @apply grid grid-cols-1 gap-6 items-stretch justify-center;
}

.product-card {
  @apply flex flex-col justify-between bg-white rounded-3xl 
         overflow-hidden shadow-md
         transition-all duration-200 hover:-translate-y-1 
         hover:shadow-xl;
  color: #2D3E94;
}

.product-image {
  @apply w-full object-cover;
  aspect-ratio: 4 / 3;
  border-radius: 24px 24px 0 0;
}

.product-content {
  @apply flex flex-col gap-3 items-start p-4 pb-0;
}

.product-badges {
  @apply flex gap-2 flex-wrap;
}

.badge-category {
  @apply text-xs font-bold px-3 py-1 rounded-full text-white;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  letter-spacing: 0.03em;
}

.product-card--estetica .badge-category {
  background: linear-gradient(135deg, #FF6B9D, #FFD200, #A66CFF);
  font-weight: 900;
  letter-spacing: 0.04em;
}

.badge-subcategory {
  @apply text-xs font-bold px-3 py-1 rounded-full;
  background: #e7efff;
  color: #2D3E94;
  letter-spacing: 0.03em;
}

.product-title {
  @apply text-lg font-black m-0 text-left;
  color: #2D3E94;
}

.product-card--estetica .product-title {
  background: linear-gradient(135deg, #E91E81, #FF9800, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.15rem;
}

.product-description {
  @apply text-sm text-left m-0 leading-relaxed;
  color: #2D3E94;
  opacity: 0.82;
}

.product-price {
  @apply text-2xl font-black mt-1;
  color: #E91E81;
}

.product-card--estetica .product-price {
  background: linear-gradient(135deg, #E91E81, #FF9800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.6rem;
}

.details-button {
  @apply mx-3.5 mt-4 mb-4 px-6 py-3.5 
         font-black text-sm tracking-wide
         rounded-full border-none cursor-pointer
         transition-all duration-200
         hover:scale-105;
  background-color: #FFD200;
  color: #2D3E94;
  width: calc(100% - 28px);
  box-shadow: 0 4px 14px rgba(255, 210, 0, 0.35);
}

.product-card--estetica .details-button {
  background: linear-gradient(135deg, #FF6B9D, #FFD200);
  color: #2D3E94;
  font-weight: 900;
}

/* Oculto por defecto para mostrarlo solo en mobile. */
.sticky-cta-bar {
  display: none;
}

.details-button:hover {
  box-shadow: 0 7px 18px rgba(255, 210, 0, 0.5);
}

@media (max-width: 600px) {
  .filter-pills {
    @apply overflow-x-auto flex-nowrap pb-1;
  }
}

@media (max-width: 768px) {
  .products-area {
    padding-bottom: 80px;
    margin-bottom: 96px;
  }

  .sticky-cta-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #2D3E94;
    padding: 12px 16px;
    z-index: 100;
    box-shadow: 0 -4px 16px rgba(45, 62, 148, 0.25);
  }

  .sticky-cta-text {
    color: white;
    font-weight: 700;
    font-size: 0.9rem;
    font-family: 'Nunito', sans-serif;
  }

  .sticky-cta-btn {
    background: #FFD200;
    color: #2D3E94;
    font-weight: 900;
    font-size: 0.9rem;
    padding: 10px 18px;
    border-radius: 999px;
    text-decoration: none;
    white-space: nowrap;
    font-family: 'Nunito', sans-serif;
  }
}

@media (min-width: 720px) {
  .products-container {
    @apply grid-cols-2;
  }
}

@media (min-width: 1080px) {
  .products-container {
    @apply grid-cols-3;
  }
}
</style>
