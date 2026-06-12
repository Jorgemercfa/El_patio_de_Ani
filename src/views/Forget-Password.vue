<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

import { sendUserResetPassword } from '@/auth/usersRepo';
import { useSession } from '@/auth/session';

const router = useRouter();
const { logout } = useSession();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const success = ref('');

const onRequestPasswordReset = async () => {
  error.value = '';
  success.value = '';

  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden.';
    return;
  }

  try {
    await logout();
    await sendUserResetPassword(email.value);
    success.value = 'Te enviamos un enlace para restablecer tu contraseña.';
    password.value = '';
    confirmPassword.value = '';
    setTimeout(() => {
      router.push({ name: 'SignIn' });
    }, 1200);
  } catch (e) {
    error.value = e?.message || 'No se pudo enviar el correo de recuperación.';
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
          <div class="lock-icon">🔒</div>
          <h1 class="main-title">Olvidé mi contraseña</h1>
          <form class="form-area" @submit.prevent="onRequestPasswordReset" autocomplete="on">
            <div v-if="error" style="color: #b00020; font-weight: 600">
              {{ error }}
            </div>
            <div v-if="success" style="color: #177245; font-weight: 600">
              {{ success }}
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
              <label>Nueva Contraseña</label>
              <input
                v-model="password"
                type="password"
                required
                minlength="6"
                autocomplete="new-password"
              />
            </div>

            <div class="form-group">
              <label>Confirmar Nueva Contraseña</label>
              <input
                v-model="confirmPassword"
                type="password"
                required
                minlength="6"
                autocomplete="new-password"
              />
            </div>

            <button type="submit" class="submit-btn">
              Restablecer Contraseña
            </button>

            <router-link
              to="/Sign-in"
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
  max-width: 540px;
}

.auth-card {
  background: white;
  border-radius: 28px;
  border: none;
  box-shadow: 0 8px 40px rgba(0,0,0,0.10);
  padding: 34px;
}

.lock-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 12px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 2rem;
  background: #2D3E94;
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

.submit-btn {
  background-color: #FFD200;
  color: #2D3E94;
  border: none;
  padding: 14px;
  font-size: 1rem;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #f2c500;
}

.main-title {
  font-size: 2rem;
  margin: 0 0 16px;
  color: #2D3E94;
  text-align: center;
}

.text-navbar {
  color: #2D3E94;
  font-weight: 600;
  text-decoration: none;
}
</style>
