<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import AdminLayout from '@/components/AdminLayout.vue';

import { addCompany } from '@/auth/companiesRepo';

const router = useRouter();
const showPassword = ref(false);

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const success = ref('');

const onCancel = () => {
  router.push({ name: 'HomeCompanies' });
};

const onSignUp = async () => {
  error.value = '';
  success.value = '';

  if (!name.value.trim()) {
    error.value = 'Ingresa el nombre del administrador.';
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
    // No iniciamos sesión con el administrador recién creado: se registra su
    // perfil (rol) en Firestore y podrá iniciar sesión por su cuenta luego.
    // Esto evita reemplazar la sesión del administrador que lo está creando.
    await addCompany({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    success.value = `Administrador "${name.value.trim()}" registrado correctamente. Ya puede iniciar sesión con su email y contraseña.`;
    name.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
  } catch (e) {
    error.value = e?.message || 'No se pudo registrar el administrador.';
  }
};
</script>

<template>
  <AdminLayout>
    <section class="contact-section">
      <div class="auth-container">
        <div class="auth-card">
          <h1 class="main-title">Registrar nuevo administrador</h1>
          <p class="subtitle">Panel Administrativo - El Patio de Ani</p>
          <form class="form-area" @submit.prevent="onSignUp" autocomplete="on">
            <div v-if="error" style="color: #b00020; font-weight: 600">
              {{ error }}
            </div>
            <div v-if="success" style="color: #177245; font-weight: 600">
              {{ success }}
            </div>

            <div class="form-group">
              <label>Nombre del administrador</label>
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
  <div class="password-wrapper">
    <input
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      required
      minlength="6"
      autocomplete="new-password"
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

<div class="form-group">
  <label>Confirmar Contraseña</label>
  <div class="password-wrapper">
    <input
      v-model="confirmPassword"
      :type="showPassword ? 'text' : 'password'"
      required
      minlength="6"
      autocomplete="new-password"
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

            <button type="submit" class="submit-btn">Registrarme</button>
            <button type="button" class="secondary-btn" @click="onCancel">Cancelar</button>
          </form>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>

<style scoped>
.contact-section {
  display: grid;
  place-items: center;
  padding: 20px;
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

.secondary-btn {
  border: none;
  border-radius: 12px;
  background: #2D3E94;
  color: white;
  padding: 12px;
  font-weight: 700;
  cursor: pointer;
}

.secondary-btn:hover {
  background: #1f2f73;
}
</style>
