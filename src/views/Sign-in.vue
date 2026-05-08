<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

import { getUsers } from '@/auth/usersRepo';
import { useSession } from '@/auth/session';

const router = useRouter();
const { login } = useSession();

const email = ref('');
const password = ref('');
const error = ref('');

const onLogin = () => {
  error.value = '';

  const emailNormalized = email.value.trim().toLowerCase();

  // 1) Usuarios registrados vía Sign-up (localStorage)
  const localUsers = getUsers();

  const allUsers = localUsers;

  const found = allUsers.find(
    (u) => (u.email || '').trim().toLowerCase() === emailNormalized,
  );

  if (!found) {
    error.value = 'El correo no está registrado.';
    return;
  }

  if (found.password !== password.value) {
    error.value = 'Contraseña incorrecta.';
    return;
  }

  login(found);
  router.push({ name: 'Home' });
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
          <h1 class="main-title">Iniciar Sesión</h1>
          <p class="auth-subtitle">El Patio de Ani</p>
          <form class="form-area" @submit.prevent="onLogin" autocomplete="on">
            <div v-if="error" style="color: #b00020; font-weight: 600">
              {{ error }}
            </div>

            <div class="form-group">
              <label>Email</label>
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
            <div class="contact-info">
              <router-link to="/Sign-up">
                <button class="other-btn" type="button">Registrar usuario</button>
              </router-link>
              <router-link to="/Forget-Password">
                <button class="other-btn" type="button">Olvide Contraseña</button>
              </router-link>
              <router-link to="/Sign-in-companies">
                <button class="other-btn" type="button">Empresas</button>
              </router-link>
            </div>
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
  max-width: 520px;
}

.auth-card {
  background: white;
  border: 2px solid #E91E81;
  border-radius: 16px;
  box-shadow: 0 14px 35px rgba(45, 62, 148, 0.12);
  padding: 34px;
}

.main-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 6px;
  text-align: center;
  color: #2D3E94;
}

.auth-subtitle {
  margin: 0 0 22px;
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
  padding: 12px 14px;
  border-radius: 12px;
  border: 1.5px solid #d9d9d9;
}

.form-group input:focus {
  outline: none;
  border-color: #E91E81;
  box-shadow: 0 0 0 3px rgba(233, 30, 129, 0.12);
}

.submit-btn {
  margin-top: 4px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background-color: #FFD200;
  color: #2D3E94;
  font-weight: 700;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #f2c500;
}

.other-btn {
  margin-top: 8px;
  padding: 11px;
  width: 100%;
  border-radius: 12px;
  border: 2px solid #E91E81;
  background-color: #fff;
  color: #E91E81;
  font-weight: 600;
  cursor: pointer;
}

.other-btn:hover {
  background: #E91E81;
  color: #fff;
}

.contact-info {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 500px) {
  .auth-card {
    padding: 24px;
  }
}
</style>
