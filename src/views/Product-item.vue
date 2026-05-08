<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Footer from '@/components/Footer-item.vue'
import Navbar from '@/components/Navbar-item.vue'
import { getCompanyproducts } from '@/auth/companyproductsRepo'
import {
  getInflableBadge,
  getInflableSize,
  getProductPrice,
  isInflableProduct,
} from '@/utils/inflables'

const router = useRouter()
const allProducts = computed(() => getCompanyproducts())
const enrichedProducts = computed(() =>
  allProducts.value.map((product) => ({
    ...product,
    inflableBadgeMeta: isInflableProduct(product)
      ? getInflableBadge(getInflableSize(product))
      : null,
  })),
)

const categories = [
  'Todas',
  'Shows Infantiles',
  'Juegos e Inflables',
  'Carritos Snacks',
  'Estética Infantil',
]
const activeFilter = ref('Todas')

const products = computed(() =>
  activeFilter.value === 'Todas'
    ? enrichedProducts.value
    : enrichedProducts.value.filter((p) => p.category === activeFilter.value),
)

const getProductName = (product) => product.name || 'Producto sin nombre'
const getButtonText = (product) => product.details_button || 'Ver detalles'
const getShortDescription = (product) => product.shortDescription || ''
const getCategory = (product) => product.category || ''
const getSubcategory = (product) => product.subcategory || ''

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
    <div class="title-wrap">
      <h1 class="title-products">Nuestros Servicios</h1>
      <p class="title-copy">
        Explora shows, inflables, snacks y experiencias pensadas para celebrar en grande.
      </p>
    </div>

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
              v-if="isInflableProduct(product)"
              class="badge-size"
              :style="{
                background: product.inflableBadgeMeta.background,
                color: product.inflableBadgeMeta.color,
              }"
            >
              {{ product.inflableBadgeMeta.shortLabel }}
            </span>
          </div>

          <h2 class="product-title">{{ getProductName(product) }}</h2>
          <p class="product-description" v-if="getShortDescription(product)">
            {{ getShortDescription(product) }}
          </p>
          <p class="product-price">{{ formatPrice(product) }}</p>
          <button
            class="details-button"
            @click="router.push({ name: 'productsDetails', params: { id: product.id } })"
          >
            {{ getButtonText(product) }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <footer>
    <Footer />
  </footer>
</template>

<style>
.products-area {
  margin: 50px 7% 70px;
  text-align: left;
}

.title-wrap {
  margin-bottom: 30px;
}

.title-products {
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.8rem);
  font-weight: 800;
  position: relative;
  display: inline-block;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-products::after {
  content: '';
  width: 78px;
  height: 4px;
  background-color: #E91E81;
  position: absolute;
  bottom: -10px;
  left: 0;
  border-radius: 5px;
}

.title-copy {
  max-width: 620px;
  margin: 22px 0 0;
  color: rgba(45, 62, 148, 0.78);
  line-height: 1.65;
}

.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 36px;
}

.filter-pill {
  padding: 10px 20px;
  border-radius: 50px;
  border: 2px solid #E91E81;
  background: #FFFFFF;
  color: #E91E81;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}

.filter-pill.active,
.filter-pill:hover {
  background: #E91E81;
  color: #FFFFFF;
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(233, 30, 129, 0.16);
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
  gap: 24px;
}

.product-card {
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  color: #2D3E94;
  border-radius: 14px;
  overflow: hidden;
  min-width: 0;
  border: 2px solid #E91E81;
  box-shadow: 0 4px 16px rgba(233, 30, 129, 0.10);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 28px rgba(233, 30, 129, 0.18);
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
  align-items: flex-start;
  gap: 12px;
  padding: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.product-badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.badge-category,
.badge-subcategory,
.badge-size {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 5px 11px;
  border-radius: 20px;
  letter-spacing: 0.03em;
}

.badge-category {
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  color: #FFFFFF;
}

.badge-subcategory {
  background: #edf4ff;
  color: #2D3E94;
}

.product-title {
  font-size: 1.2rem;
  font-weight: 800;
  margin: 0;
  color: #2D3E94;
}

.product-description {
  font-size: 0.92rem;
  color: rgba(45, 62, 148, 0.78);
  margin: 0;
  line-height: 1.6;
}

.product-price {
  font-size: 1.55rem;
  font-weight: 800;
  color: #E91E81;
  margin: auto 0 0;
}

.details-button {
  margin-top: 6px;
  background-color: #FFD200;
  color: #2D3E94;
  border: none;
  padding: 13px 18px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
  width: 100%;
  box-shadow: 0 10px 18px rgba(255, 210, 0, 0.24);
}

.details-button:hover {
  background-color: #e6bd00;
  transform: scale(1.02);
}

@media (min-width: 768px) {
  .products-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .products-container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .products-area {
    margin: 36px 20px 60px;
  }

  .product-content {
    padding: 18px;
  }
}
</style>
