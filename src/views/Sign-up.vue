<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

import { addUser } from '@/auth/usersRepo';
import { useSession } from '@/auth/session';

const router = useRouter();
const { login } = useSession();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const successMessage = ref('');
const isSubmitting = ref(false);

const onSignUp = async () => {
  error.value = '';
  successMessage.value = '';

  if (!name.value.trim()) {
    error.value = 'Ingresa tu nombre.';
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
    isSubmitting.value = true;
    const user = await addUser({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    successMessage.value = 'Cuenta creada correctamente. Redirigiendo a tu perfil...';
    login(user);
    await router.replace({ name: 'Profile', query: { welcomeEmail: 'pending' } });
  } catch (e) {
    error.value = e?.message || 'No se pudo registrar el usuario.';
  } finally {
    isSubmitting.value = false;
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
          <h1 class="main-title">Crear cuenta</h1>
          <p class="auth-subtitle">Únete a El Patio de Ani</p>
          <form class="form-area" @submit.prevent="onSignUp" autocomplete="on">
            <div v-if="error" style="color: #b00020; font-weight: 600">
              {{ error }}
            </div>
            <div v-if="successMessage" style="color: #2D3E94; font-weight: 600">
              {{ successMessage }}
            </div>

            <div class="form-group">
              <label>Nombre</label>
              <input v-model="name" type="text" required autocomplete="name" />
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

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? 'Creando cuenta...' : 'Registrarme' }}
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
  max-width: 560px;
}

.auth-card {
  background: white;
  border-radius: 28px;
  border: none;
  box-shadow: 0 8px 40px rgba(0,0,0,0.10);
  padding: 34px;
}

.main-title {
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 6px;
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

.submit-btn {
  background-color: #E91E81;
  color: #fff;
  border: none;
  padding: 14px;
  font-size: 1rem;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
}

.submit-btn:disabled {
  cursor: wait;
  opacity: 0.8;
}

.submit-btn:hover {
  background-color: #d81b76;
}

.text-navbar {
  color: #2D3E94;
  font-weight: 600;
  text-decoration: none;
}
</style>
