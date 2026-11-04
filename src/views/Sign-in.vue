<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

import { loginUser } from '@/auth/usersRepo';
import { useSession } from '@/auth/session';

const router = useRouter();
const { login } = useSession();
const showPassword = ref(false);

const email = ref('');
const password = ref('');
const error = ref('');

const onLogin = async () => {
  error.value = '';

  try {
    const user = await loginUser({
      email: email.value,
      password: password.value,
    });

    login(user);
    router.push({ name: 'Home' });
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
      <!-- Ojo abierto (contraseña visible) -->
      <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <!-- Ojo tachado (contraseña oculta) -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    </button>
  </div>
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
  background-color: #FDF6EC;
  font-family: 'Nunito', sans-serif;
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
  border: none;
  border-radius: 28px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.10);
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
  border-radius: 16px;
  border: 1.5px solid #d9d9d9;
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
  padding-right: 46px; /* espacio para que el texto no quede debajo del ojo */
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
  margin-top: 4px;
  padding: 14px;
  border-radius: 999px;
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
  border-radius: 999px;
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
