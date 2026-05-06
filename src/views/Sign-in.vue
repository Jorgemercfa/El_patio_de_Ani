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
      <div class="contact-container">
        <h1 class="main-title">Iniciar Sesión</h1>

        <div class="contact-card">
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
          </form>

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

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #325bcd;
  box-shadow: 0 0 0 3px rgba(66, 174, 26, 0.15);
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
  transition: 0.3s ease;
}

.submit-btn:hover {
  background-color: #2549ad;
  transform: translateY(-2px);
}

.other-btn {
  margin-top: 10px;
  padding: 14px;
  width: 50%;
  border-radius: 12px;
  border: none;
  background-color: #325bcd;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
}

.other-btn:hover {
  background-color: #2549ad;
  transform: translateY(-2px);
}

.contact-info {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  font-size: 15px;
}

.contact-info h2 {
  margin-bottom: 15px;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .contact-card {
    flex-direction: column;
    padding: 40px;
  }
}
</style>
