<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

import { addCompany } from '@/auth/companiesRepo';
import { useSessionCompany } from '@/auth/session_companies';

const router = useRouter();
const { login } = useSessionCompany();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');

const onSignUp = () => {
  error.value = '';

  if (!name.value.trim()) {
    error.value = 'Ingresa el nombre de la vendedor.';
    return;
  }

  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden.';
    return;
  }

  try {
    const company = addCompany({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    login(company);

    router.push({ name: 'HomeCompanies' });
  } catch (e) {
    error.value = e?.message || 'No se pudo registrar la vendedor.';
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
          <p class="subtitle">Registro de acceso - El Patio de Ani</p>
          <form class="form-area" @submit.prevent="onSignUp" autocomplete="on">
            <div v-if="error" style="color: #b00020; font-weight: 600">
              {{ error }}
            </div>

            <div class="form-group">
              <label>Nombre del vendedor</label>
              <input
                v-model="name"
                type="text"
                required
                autocomplete="organization"
              />
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
                minlength="6"
                autocomplete="new-password"
              />
            </div>

            <div class="form-group">
              <label>Confirmar Contraseña</label>
              <input
                v-model="confirmPassword"
                type="password"
                required
                minlength="6"
                autocomplete="new-password"
              />
            </div>

            <button type="submit" class="submit-btn">Registrarme</button>

            <router-link
              to="/Sign-in-companies"
              class="text-navbar"
              style="margin-top: 10px"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </router-link>
          </form>
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
  margin: 8px 0 20px;
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
  background-color: #FFD200;
  color: #2D3E94;
  border: none;
  padding: 14px;
  font-size: 1rem;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #f2c500;
}

.text-navbar {
  color: #2D3E94;
  text-decoration: none;
  font-weight: 600;
}
</style>
