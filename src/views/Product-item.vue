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

const getInflableSizeBadge = (product) => {
  const sub = (product.subcategory || '').toLowerCase()
  if (sub.includes('bebé') || sub.includes('bebe') || sub.includes('baby') || sub.includes('pequeño')) {
    return { label: '👶 Bebés', cls: 'badge-size-bebes' }
  }
  if (sub.includes('grande')) {
    return { label: '🏰 Grande', cls: 'badge-size-grande' }
  }
  if (product.category === 'Juegos e Inflables') {
    return { label: '🎪 Mediano', cls: 'badge-size-mediano' }
  }
  return null
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
        <div class="product-image-wrapper">
          <img
            v-if="product.image"
            :src="product.image"
            :alt="getProductName(product)"
            class="product-image"
          />
        </div>

        <div class="product-content">

          <!-- badges de categoría -->
          <div class="product-badges" v-if="getCategory(product)">
            <span class="badge-category">{{ getCategory(product) }}</span>
            <span class="badge-subcategory" v-if="getSubcategory(product)">
              {{ getSubcategory(product) }}
            </span>
          </div>

          <!-- badge de tamaño inflable -->
          <span
            v-if="getInflableSizeBadge(product)"
            class="badge-size"
            :class="getInflableSizeBadge(product).cls"
          >
            {{ getInflableSizeBadge(product).label }}
          </span>

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
  background: linear-gradient(90deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 30px;
  font-weight: bold;
  text-align: left;
  position: relative;
  display: inline-block;
}

.title-products::after {
  content: '';
  width: 60px;
  height: 4px;
  background-color: #E91E81;
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
  margin-top: 20px;
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  justify-items: center;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFFFFF;
  color: #2D3E94;
  border-radius: 14px;
  overflow: hidden;
  width: 320px;
  border: 2px solid #E91E81;
  box-shadow: 0 10px 25px rgba(233, 30, 129, 0.1);
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 30px rgba(233, 30, 129, 0.25);
}

/* imagen con aspect-ratio 4/3 */
.product-image-wrapper {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 14px 14px 0 0;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px 14px 0 0;
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
  background: linear-gradient(90deg, #E91E81, #2D3E94);
  color: #FFFFFF;
}

.badge-subcategory {
  background: #dbe4ff;
  color: #2D3E94;
}

/* badge tamaño inflable */
.badge-size {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 0.03em;
}

.badge-size-bebes {
  background: #f3e8ff;
  color: #7c3aed;
}

.badge-size-grande {
  background: #fff3e0;
  color: #e65100;
}

.badge-size-mediano {
  background: #e8f5e9;
  color: #2e7d32;
}

.product-title {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  color: #2D3E94;
}

.product-description {
  font-size: 0.9rem;
  text-align: center;
  color: #2D3E94;
  opacity: 0.75;
  margin: 0;
  line-height: 1.5;
}

.product-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #E91E81;
  margin: 4px 0 0;
}

/* botón */
.details-button {
  margin: 20px;
  background-color: #FFD200;
  color: #2D3E94;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: calc(100% - 40px);
}

.details-button:hover {
  background-color: #e6bd00;
  transform: scale(1.03);
}
</style>