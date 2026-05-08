<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Footer from '@/components/Footer-item.vue'
import Navbar from '@/components/Navbar-item.vue'
import { getCompanyproducts } from '@/auth/companyproductsRepo'

const router = useRouter()
const allProducts = computed(() => getCompanyproducts())

const categories = ['Todas', 'Shows Infantiles', 'Juegos e Inflables', 'Carritos Snacks', 'Estética Infantil']
const activeFilter = ref('Todas')

const products = computed(() =>
  activeFilter.value === 'Todas'
    ? allProducts.value
    : allProducts.value.filter((p) => p.category === activeFilter.value),
)

const getProductName = (product) => product.name || 'Producto sin nombre'
const getButtonText = (product) => product.details_button || 'Ver detalles'
const getShortDescription = (product) => product.shortDescription || ''
const getCategory = (product) => product.category || ''
const getSubcategory = (product) => product.subcategory || ''

const getInflableSize = (product) => {
  if (product.category !== 'Juegos e Inflables') return null
  const sub = (product.subcategory || '').toLowerCase()
  if (sub.includes('bebé') || sub.includes('bebe') || sub.includes('baby') || sub.includes('pequeño') || sub.includes('peque')) return 'bebes'
  if (sub.includes('grande')) return 'grande'
  return 'mediano'
}

const inflableSizeLabel = (product) => {
  const size = getInflableSize(product)
  if (size === 'bebes') return '👶 Bebés'
  if (size === 'grande') return '🏰 Grande'
  if (size === 'mediano') return '🎪 Mediano'
  return null
}

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
    <h1 class="title-products">Nuestros Productos</h1>

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

    <div class="products-container">
      <div v-for="product in products" :key="product.id" class="product-card">

        <!-- imagen -->
        <img
          v-if="product.image"
          :src="product.image"
          :alt="getProductName(product)"
          class="product-image"
        />

        <div class="product-content">

          <!-- badges de categoría -->
          <div class="product-badges" v-if="getCategory(product)">
            <span class="badge-category">{{ getCategory(product) }}</span>
            <span class="badge-subcategory" v-if="getSubcategory(product)">
              {{ getSubcategory(product) }}
            </span>
            <span
              v-if="inflableSizeLabel(product)"
              class="badge-inflable-size"
              :class="`badge-inflable--${getInflableSize(product)}`"
            >{{ inflableSizeLabel(product) }}</span>
          </div>

          <!-- nombre -->
          <h2 class="product-title">{{ getProductName(product) }}</h2>

          <!-- descripción corta -->
          <p class="product-description" v-if="getShortDescription(product)">
            {{ getShortDescription(product) }}
          </p>

          <!-- precio -->
          <p class="product-price">{{ formatPrice(product) }}</p>

        </div>

        <!-- botón -->
        <button
          class="details-button"
          @click="router.push({ name: 'productsDetails', params: { id: product.id } })"
        >
          {{ getButtonText(product) }}
        </button>

      </div>
    </div>
  </div>

  <footer>
    <Footer />
  </footer>
</template>

<style>
.products-area {
  margin: 50px 7%;
  text-align: center;
}

.title-products {
  font-size: 2rem;
  color: #2D3E94; /* --azul-torres */
  margin-bottom: 30px;
  font-weight: bold;
  text-align: left;
  position: relative;
}

.title-products::after {
  content: '';
  width: 60px;
  height: 4px;
  background-color: #E91E81; /* --rosa-principal */
  position: absolute;
  bottom: -10px;
  left: 0;
  border-radius: 5px;
}

/* filtros pills */
.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 36px;
}

.filter-pill {
  padding: 8px 20px;
  border-radius: 50px;
  border: 2px solid #E91E81;
  background: #FFFFFF;
  color: #E91E81;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  white-space: nowrap;
}

.filter-pill.active,
.filter-pill:hover {
  background: #E91E81;
  color: #FFFFFF;
}

@media (max-width: 600px) {
  .filter-pills {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 4px;
  }
}


.products-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  justify-items: center;
}

@media (min-width: 600px) {
  .products-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .products-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFFFFF; /* --blanco-puro */
  color: #2D3E94; /* --azul-torres */
  border-radius: 14px;
  overflow: hidden;
  width: 100%;
  max-width: 360px;
  border: 2px solid #E91E81; /* --rosa-principal */
  box-shadow: 0 10px 25px rgba(233, 30, 129, 0.12);
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 30px rgba(233, 30, 129, 0.25);
}

/* imagen ocupa todo el ancho superior */
.product-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

.product-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding: 20px 20px 0;
  width: 100%;
}

/* badges */
.product-badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
}

.badge-category,
.badge-subcategory {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.03em;
}

.badge-category {
  background: #E91E81; /* --rosa-principal */
  color: #FFFFFF; /* --blanco-puro */
}

.badge-subcategory {
  background: rgba(233, 30, 129, 0.12);
  color: #E91E81; /* --rosa-principal */
}

.product-title {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  color: #2D3E94; /* --azul-torres */
}

.product-description {
  font-size: 0.9rem;
  text-align: center;
  color: #2D3E94; /* --azul-torres */
  opacity: 0.75;
  margin: 0;
  line-height: 1.5;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #E91E81; /* --rosa-principal */
  margin: 4px 0 0;
}

/* botón */
.details-button {
  margin: 20px;
  background-color: #FFD200; /* --amarillo-brillante */
  color: #2D3E94; /* --azul-torres */
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: calc(100% - 40px);
}

.details-button:hover {
  background-color: #e6bd00; /* amarillo ligeramente más oscuro para el hover */
  transform: scale(1.02);
}

/* inflable size badges */
.badge-inflable-size {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.03em;
}

.badge-inflable--bebes {
  background: #f3e8ff;
  color: #6b21a8;
}

.badge-inflable--mediano {
  background: #e8f5e9;
  color: #1b5e20;
}

.badge-inflable--grande {
  background: #fff3e0;
  color: #e65100;
}
</style>