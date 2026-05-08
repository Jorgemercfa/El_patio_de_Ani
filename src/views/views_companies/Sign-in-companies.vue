<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

import { getCompanies } from '@/auth/companiesRepo';
import { useSessionCompany } from '@/auth/session_companies';

const router = useRouter();
const { login } = useSessionCompany();

const email = ref('');
const password = ref('');
const error = ref('');

const onLogin = () => {
  error.value = '';

  const emailNormalized = email.value.trim().toLowerCase();

  // 🔹 obtener vendedors locales de forma segura
  const localCompaniesRaw = getCompanies();
  const localCompanies = Array.isArray(localCompaniesRaw)
    ? localCompaniesRaw
    : [];

  const allCompanies = localCompanies;

  const found = allCompanies.find(
    (c) => (c.email || '').trim().toLowerCase() === emailNormalized,
  );

  if (!found) {
    error.value = 'El email no está registrado.';
    return;
  }

  if (found.password !== password.value) {
    error.value = 'Contraseña incorrecta.';
    return;
  }

  login(found);

  router.push({ name: 'HomeCompanies' });
};
</script>

<template>
  <div class="page-wrapper">
    <header>
      <Navbar />
    </header>

    <section class="contact-section">
      <div class="auth-container">
        <div class="auth-card">
          <h1 class="main-title">Panel Administrativo</h1>
          <p class="subtitle">El Patio de Ani</p>
          <form class="form-area" @submit.prevent="onLogin" autocomplete="on">
            <div v-if="error" style="color: #b00020; font-weight: 600">
              {{ error }}
            </div>

            <div class="form-group">
              <label>email</label>
              <input
                v-model="email"
                type="email"
                required
                autocomplete="email"
              />
            </div>

            <div class="form-group">
              <label>Contraseña</label>
              <input
                v-model="password"
                type="password"
                required
                autocomplete="current-password"
              />
            </div>

            <button type="submit" class="submit-btn">Iniciar sesión</button>
          </form>

          <div class="contact-info">
            <router-link to="/Sign-up-companies">
              <button class="other-btn" type="button">
                Registrar vendedor
              </button>
            </router-link>
            <router-link to="/Forget-Password-Companies">
              <button class="other-btn" type="button">
                Olvide Contraseña vendedor
              </button>
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

.contact-section {
  flex: 1;
  display: grid;
  place-items: center;
  padding: 120px 20px 80px;
}

.auth-container {
  width: 100%;
  max-width: 560px;
}

.auth-card {
  background: white;
  border-radius: 16px;
  border: 2px solid #E91E81;
  box-shadow: 0 14px 35px rgba(45, 62, 148, 0.12);
  padding: 34px;
}

.main-title {
  margin: 0;
  text-align: center;
  color: #2D3E94;
}

.subtitle {
  margin: 6px 0 20px;
  text-align: center;
  color: #2D3E94;
  font-weight: 600;
}

.form-area {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #E91E81;
}

.form-group input {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #E91E81;
  box-shadow: 0 0 0 3px rgba(233, 30, 129, 0.12);
}

.submit-btn {
  margin-top: 2px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background-color: #FFD200;
  color: #2D3E94;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
}

.submit-btn:hover {
  background-color: #f2c500;
  transform: translateY(-2px);
}

.other-btn {
  margin-top: 10px;
  padding: 14px;
  border-radius: 12px;
  border: 2px solid #325bcd;
  background: white;
  color: #325bcd;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
  width: 100%;
}

.other-btn:hover {
  background-color: #f0f4ff;
  transform: translateY(-2px);
}

.contact-info {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
