<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

import { loginCompany } from '@/auth/companiesRepo';
import { useSessionCompany } from '@/auth/session_companies';

const router = useRouter();
const { login } = useSessionCompany();
const showPassword = ref(false);

const email = ref('');
const password = ref('');
const error = ref('');

const onLogin = async () => {
  error.value = '';

  try {
    const company = await loginCompany({
      email: email.value,
      password: password.value,
    });

    login(company);
    router.push({ name: 'HomeCompanies' });
  } catch (e) {
    error.value = e?.message || 'No se pudo iniciar sesión.';
  }
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
  <div class="password-wrapper">
    <input
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      required
      autocomplete="current-password"
    />
    <button
      type="button"
      class="toggle-password"
      :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
      @click="showPassword = !showPassword"
    >
      <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    </button>
  </div>
</div>

            <button type="submit" class="submit-btn">Iniciar sesión</button>
          </form>

          <div class="contact-info">
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
  background-color: #FDF6EC;
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

.password-wrapper {
  position: relative;
  display: flex;
}

.password-wrapper input {
  width: 100%;
  padding-right: 46px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #E91E81;
  display: flex;
  align-items: center;
}

.toggle-password:hover {
  color: #2D3E94;
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
