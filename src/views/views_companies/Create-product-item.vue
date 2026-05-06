<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import NavbarCompanies from '@/components/Navbar-company-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useSessionCompany } from '@/auth/session_companies';
import { addCompanyproduct } from '@/auth/companyproductsRepo';

const router = useRouter();
const { state } = useSessionCompany();

const name = ref('');
const shortDescription = ref('');
const longDescription = ref('');
const category = ref('Restaurantes');
const percentage = ref('');
const originalPrice = ref('');
const expirationDate = ref('');
const termsOfUse = ref('');
const productCode = ref('');
const error = ref('');
const success = ref('');

const categories = [
  'Restaurantes',
  'Entretenimiento',
  'Tecnología',
  'Fitness',
  'Moda',
  'Salud y Bienestar',
  'Otros',
];

const generateproductCode = () => {
  const prefix = name.value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 6);

  const random = Math.floor(1000 + Math.random() * 9000);
  productCode.value = `${prefix || 'CUPON'}${random}`;
};

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
};

const onCreateproduct = () => {
  error.value = '';
  success.value = '';

  if (!state.company) {
    error.value = 'Tu sesión de empresa no está activa.';
    return;
  }

  if (!name.value.trim() || !shortDescription.value.trim()) {
    error.value = 'Completa el nombre y la descripción corta.';
    return;
  }

  const originalPriceNumber = toNumber(originalPrice.value);

  if (!Number.isFinite(originalPriceNumber) || originalPriceNumber <= 0) {
    error.value = 'Ingresa un precio original válido.';
    return;
  }

  if (!productCode.value.trim()) {
    generateproductCode();
  }

  addCompanyproduct({
    name: name.value.trim(),
    shortDescription: shortDescription.value.trim(),
    longDescription: longDescription.value.trim(),
    category: category.value,
    percentage: percentage.value.trim(),
    price: originalPriceNumber,
    expiration_date: expirationDate.value,
    Terms_of_use: termsOfUse.value.trim(),
    product_code: productCode.value.trim().toUpperCase(),
    companyId: state.company.id,
    companyName: state.company.name,
    companyRuc: state.company.ruc,
  });

  success.value = 'Cupón creado correctamente.';

  name.value = '';
  shortDescription.value = '';
  longDescription.value = '';
  category.value = 'Restaurantes';
  percentage.value = '';
  originalPrice.value = '';
  expirationDate.value = '';
  termsOfUse.value = '';
  productCode.value = '';

  setTimeout(() => {
    router.push({ name: 'Companyproducts' });
  }, 500);
};
</script>

<template>
  <div class="page-wrapper">
    <header>
      <NavbarCompanies />
    </header>

    <section class="contact-section">
      <div class="contact-container">
        <h1 class="main-title">Crear Productos</h1>

        <div class="contact-card">
          <form
            class="form-area"
            @submit.prevent="onCreateproduct"
            autocomplete="on"
          >
            <div v-if="error" class="message error">{{ error }}</div>
            <div v-if="success" class="message success">{{ success }}</div>

            <div class="form-group">
              <label>Nombre del producto</label>
              <input
                v-model="name"
                type="text"
                required
                placeholder="Ej: Combo parrillero"
              />
            </div>

            <div class="form-group">
              <label>Descripción corta</label>
              <input v-model="shortDescription" type="text" required />
            </div>

            <div class="form-group">
              <label>Descripción larga</label>
              <textarea v-model="longDescription" rows="3" />
            </div>

            <div class="form-group">
              <label>Categoría</label>
              <select v-model="category">
                <option
                  v-for="option in categories"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>

            <!-- <div class="form-group">
              <label>Porcentaje / Beneficio</label>
              <input
                v-model="percentage"
                type="text"
                placeholder="Ej: 20% o 2x1"
                required
              />
            </div> -->

            <div class="form-group">
              <label>Precio Original</label>
              <input v-model="originalPrice" type="number" min="1" required />
            </div>

            <!-- <div class="form-group">
              <label>Fecha de vencimiento</label>
              <input v-model="expirationDate" type="date" required />
            </div> -->

            <!-- <div class="form-group">
              <label>Términos de uso</label>
              <textarea v-model="termsOfUse" rows="2" />
            </div> -->

            <div class="code-row">
              <div class="form-group code-input">
                <!-- <label>Código del cupón</label>
                <input
                  v-model="productCode"
                  type="text"
                  placeholder="Se puede autogenerar"
                /> -->
              </div>
              <button
                type="button"
                class="secondary-btn"
                @click="generateproductCode"
              >
                Generar código
              </button>
            </div>

            <button type="submit" class="submit-btn">Crear Cupón</button>
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
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
}

.form-area {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
.form-group textarea,
.form-group select {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #325bcd;
}

.code-row {
  display: flex;
  gap: 12px;
  align-items: end;
}

.code-input {
  flex: 1;
}

.submit-btn,
.secondary-btn {
  border: none;
  padding: 12px 24px;
  font-size: 0.95rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn {
  background-color: #325bcd;
  color: white;
}

.submit-btn:hover {
  background-color: #2549ad;
}

.secondary-btn {
  background-color: #e8ecff;
  color: #325bcd;
}

.secondary-btn:hover {
  background-color: #d8e0ff;
}

.message {
  font-weight: 600;
}

.message.error {
  color: #b00020;
}

.message.success {
  color: #177245;
}

@media (max-width: 700px) {
  .code-row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
