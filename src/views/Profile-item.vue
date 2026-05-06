<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useSession } from '@/auth/session';
import { useCart } from '@/store/cart.js';

const router = useRouter();
const { state, logout } = useSession();
const { getPurchasedproducts } = useCart();

const purchasedproducts = computed(() =>
  state.user ? getPurchasedproducts(state.user.id) : [],
);

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const onLogout = () => {
  logout();
  router.push({ name: 'Home' });
};
</script>

<template>
  <div class="page-wrapper">
    <header>
      <Navbar />
    </header>

    <section class="contact-section">
      <div class="contact-container">
        <h1 class="main-title">Perfil</h1>

        <div class="contact-card">
          <div class="form-area">
            <div class="form-group">
              <label>Nombre</label>
              <input :value="state.user?.name" disabled />
            </div>

            <div class="form-group">
              <label>Email</label>
              <input :value="state.user?.email" disabled />
            </div>

            <button class="submit-btn" type="button" @click="onLogout">
              Cerrar sesión
            </button>
          </div>
        </div>

        <!-- Purchased products -->
        <div class="products-section">
          <h2 class="section-title">Mis cupones adquiridos</h2>
          <div v-if="purchasedproducts.length > 0" class="products-grid">
            <div
              v-for="(c, i) in purchasedproducts"
              :key="i"
              class="product-card"
            >
              <img :src="c.image" :alt="c.name" class="product-img" />
              <div class="product-body">
                <h3 class="product-name">{{ c.name }}</h3>
                <div class="product-code-box">{{ c.product_code }}</div>
                <p class="product-date">
                  Comprado el {{ formatDate(c.purchasedAt) }}
                </p>
                <p class="product-price">
                  S/ {{ c.discount_price?.toFixed(2) }}
                </p>
              </div>
            </div>
          </div>
          <div v-else class="no-products">
            <p>Aún no tienes cupones adquiridos.</p>
            <router-link to="/product-item">
              <button class="browse-btn">Ver cupones disponibles</button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
/* puedes reutilizar estilos parecidos a Sign-in */
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f6f3;
}
.contact-section {
  flex: 1;
  padding: 120px 0 80px 0;
}
.contact-container {
  width: 90%;
  max-width: 1100px;
  margin: auto;
}
.main-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 50px;
  position: relative;
}
.main-title::after {
  content: '';
  width: 80px;
  height: 4px;
  background-color: #325bcd;
  display: block;
  margin-top: 10px;
  border-radius: 2px;
}
.contact-card {
  display: flex;
  gap: 60px;
  background: white;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
}
.form-area {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-weight: 500;
  margin-bottom: 6px;
  color: #333;
}
.form-group input {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
}
.submit-btn {
  margin-top: 10px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background-color: #325bcd;
  color: white;
  font-weight: 600;
  cursor: pointer;
}
.submit-btn:hover {
  background-color: #2549ad;
  transform: translateY(-2px);
}

/* Purchased products section */
.products-section {
  margin-top: 50px;
}

.section-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #111;
  position: relative;
}

.section-title::after {
  content: '';
  width: 60px;
  height: 3px;
  background-color: #325bcd;
  display: block;
  margin-top: 8px;
  border-radius: 2px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.product-card {
  background: white;
  border-radius: 14px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.product-body {
  padding: 16px;
}

.product-name {
  font-size: 1rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 10px;
}

.product-code-box {
  background: #325bcd;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 1px;
  margin-bottom: 10px;
  cursor: default;
  user-select: all;
}

.product-date {
  font-size: 0.8rem;
  color: #888;
  margin: 0 0 4px;
}

.product-price {
  font-size: 0.95rem;
  font-weight: 600;
  color: #325bcd;
  margin: 0;
}

.no-products {
  text-align: center;
  padding: 50px 20px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
}

.no-products p {
  font-size: 1.05rem;
  color: #666;
  margin-bottom: 20px;
}

.browse-btn {
  padding: 12px 28px;
  background: #325bcd;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s;
}

.browse-btn:hover {
  background: #2549ad;
  transform: translateY(-2px);
}
</style>
