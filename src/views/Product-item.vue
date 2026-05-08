<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Footer from '@/components/Footer-item.vue'
import Navbar from '@/components/Navbar-item.vue'
import { getCompanyproducts } from '@/auth/companyproductsRepo'
import { PREMIUM_INFLABLE_PRICE } from '@/constants/inflables'

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

const isInflable = (product) => {
  const category = (product.category || '').toLowerCase()
  const subcategory = (product.subcategory || '').toLowerCase()
  const name = (product.name || '').toLowerCase()

  return (
    category.includes('juegos e inflables') &&
    (subcategory.includes('inflable') || name.includes('inflable'))
  )
}

const getInflableSize = (product) => {
  const sub = (product.subcategory || '').toLowerCase()
  const name = (product.name || '').toLowerCase()
  const ageRange = (product.age_range || '').toLowerCase()
  const price = getProductPrice(product) || 0

  if (
    sub.includes('bebé') ||
    sub.includes('bebe') ||
    sub.includes('baby') ||
    name.includes('bebé') ||
    name.includes('bebe') ||
    name.includes('baby') ||
    name.includes('cubito') ||
    ageRange.includes('0-2') ||
    ageRange.includes('0-3')
  ) {
    return 'Bebés 👶'
  }

  if (sub.includes('grande') || price > PREMIUM_INFLABLE_PRICE) {
    return 'Grande 🏰'
  }

  return 'Mediano 🎪'
}
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div class="products-area">
    <h1 class="title-products">Nuestros Servicios</h1>

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
        <img
          v-if="product.image"
          :src="product.image"
          :alt="getProductName(product)"
          class="product-image"
        />

        <div class="product-content">
          <div class="product-badges" v-if="getCategory(product)">
            <span class="badge-category">{{ getCategory(product) }}</span>
            <span class="badge-subcategory" v-if="getSubcategory(product)">
              {{ getSubcategory(product) }}
            </span>
            <span
              v-if="isInflable(product)"
              class="badge-inflable-size"
            >
              {{ getInflableSize(product) }}
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

  <footer>
    <Footer />
  </footer>
</template>

<style>
.products-area {
  margin: 42px 6%;
}

.title-products {
  font-size: clamp(1.8rem, 2vw + 1rem, 2.5rem);
  margin-bottom: 32px;
  font-weight: 800;
  text-align: left;
  position: relative;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.filter-pill {
  padding: 8px 20px;
  border-radius: 999px;
  border: 2px solid #E91E81;
  background: #FFFFFF;
  color: #E91E81;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
  white-space: nowrap;
}

.filter-pill.active,
.filter-pill:hover {
  background: #E91E81;
  color: #FFFFFF;
}

.products-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.product-card {
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  color: #2D3E94;
  border-radius: 14px;
  overflow: hidden;
  border: 2px solid #E91E81;
  box-shadow: 0 4px 16px rgba(233, 30, 129, 0.10);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(233, 30, 129, 0.18);
}

.product-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 14px 14px 0 0;
}

.product-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  padding: 18px 18px 0;
}

.product-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge-category,
.badge-subcategory,
.badge-inflable-size {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.03em;
}

.badge-category {
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  color: #FFFFFF;
}

.badge-subcategory {
  background: #e7efff;
  color: #2D3E94;
}

.badge-inflable-size {
  background: #fff0f7;
  color: #c0144e;
  border: 1px solid #f7b7d5;
}

.product-title {
  font-size: 1.18rem;
  font-weight: 800;
  margin: 0;
  color: #2D3E94;
  text-align: left;
}

.product-description {
  font-size: 0.92rem;
  text-align: left;
  color: #2D3E94;
  opacity: 0.82;
  margin: 0;
  line-height: 1.5;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #E91E81;
  margin: 4px 0 0;
}

.details-button {
  margin: 18px;
  margin-top: 16px;
  background-color: #FFD200;
  color: #2D3E94;
  border: none;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  width: calc(100% - 36px);
  box-shadow: 0 4px 14px rgba(255, 210, 0, 0.35);
}

.details-button:hover {
  transform: scale(1.03);
  box-shadow: 0 7px 18px rgba(255, 210, 0, 0.5);
}

@media (max-width: 600px) {
  .filter-pills {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 4px;
  }
}

@media (min-width: 720px) {
  .products-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1080px) {
  .products-container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
