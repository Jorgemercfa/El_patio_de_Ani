<script setup>
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
</script>

<template>
  <div class="page-wrapper">
    <header>
      <Navbar />
    </header>

    <section class="confirmation-section">
      <div class="confirmation-container">
        <div class="success-card">
          <div class="success-icon">✓</div>
          <h1 class="success-title">¡Compra exitosa!</h1>
          <p class="success-msg">
            Tu pedido fue procesado correctamente. Puedes ver tus productos
            adquiridos en tu perfil.
          </p>

          <div class="action-buttons">
            <router-link to="/Profile">
              <button class="primary-btn">Ver mis productos</button>
            </router-link>
            <router-link to="/product-item">
              <button class="secondary-btn">Seguir comprando</button>
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
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f6f3;
}

.confirmation-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
}

.confirmation-container {
  width: 100%;
  max-width: 560px;
  text-align: center;
}

.success-card {
  background: white;
  padding: 60px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.success-icon {
  width: 80px;
  height: 80px;
  background: #325bcd;
  color: white;
  border-radius: 50%;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.success-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 14px;
}

.success-msg {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 36px;
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.primary-btn {
  padding: 13px 28px;
  background: #325bcd;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s;
}

.primary-btn:hover {
  background: #2549ad;
  transform: translateY(-2px);
}

.secondary-btn {
  padding: 13px 28px;
  background: white;
  color: #325bcd;
  border: 2px solid #325bcd;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s, color 0.25s, transform 0.2s;
}

.secondary-btn:hover {
  background: #325bcd;
  color: white;
  transform: translateY(-2px);
}
</style>
