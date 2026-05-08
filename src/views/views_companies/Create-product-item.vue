<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AdminLayout from '@/components/AdminLayout.vue';
import { useSessionCompany } from '@/auth/session_companies';
import {
  addCompanyproduct,
  getCompanyproducts,
  saveCompanyproducts,
} from '@/auth/companyproductsRepo';

const route = useRoute();
const router = useRouter();
const { state } = useSessionCompany();
const editingId = computed(() => Number(route.query.edit));

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

  const payload = {
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
  };

  if (Number.isFinite(editingId.value) && editingId.value > 0) {
    const allProducts = getCompanyproducts();
    const updated = allProducts.map((product) =>
      product.id === editingId.value ? { ...product, ...payload } : product,
    );
    saveCompanyproducts(updated);
  } else {
    addCompanyproduct(payload);
  }

  success.value = Number.isFinite(editingId.value) && editingId.value > 0
    ? 'Producto actualizado correctamente.'
    : 'Producto creado correctamente.';

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

onMounted(() => {
  if (!Number.isFinite(editingId.value) || editingId.value <= 0) return;
  const existing = getCompanyproducts().find(
    (product) => product.id === editingId.value,
  );
  if (!existing) return;
  name.value = existing.name ?? '';
  shortDescription.value = existing.shortDescription ?? '';
  longDescription.value = existing.longDescription ?? '';
  category.value = existing.category ?? 'Restaurantes';
  percentage.value = existing.percentage ?? '';
  originalPrice.value = existing.price ?? '';
  expirationDate.value = existing.expiration_date ?? '';
  termsOfUse.value = existing.Terms_of_use ?? '';
  productCode.value = existing.product_code ?? '';
});
</script>

<template>
  <AdminLayout>
    <section class="panel">
      <h2 class="panel-title">
        {{ Number.isFinite(editingId) && editingId > 0 ? 'Editar producto' : 'Crear producto' }}
      </h2>
      <form class="form-area" @submit.prevent="onCreateproduct" autocomplete="on">
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
            <option v-for="option in categories" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Precio Original</label>
          <input v-model="originalPrice" type="number" min="1" required />
        </div>

        <div class="actions">
          <button type="button" class="secondary-btn" @click="generateproductCode">
            Generar código
          </button>
          <button type="submit" class="submit-btn">
            {{ Number.isFinite(editingId) && editingId > 0 ? 'Guardar cambios' : 'Crear producto' }}
          </button>
        </div>
      </form>
    </section>
  </AdminLayout>
</template>

<style scoped>
.panel {
  background: white;
  border: 2px solid #E91E81;
  border-radius: 14px;
  padding: 20px;
}

.panel-title {
  margin: 0 0 14px;
  color: #2D3E94;
}

.form-area {
  display: grid;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: #E91E81;
  font-weight: 600;
  margin-bottom: 4px;
}

.form-group input,
.form-group textarea,
.form-group select {
  border: 1.5px solid #ddd;
  border-radius: 12px;
  padding: 12px;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #E91E81;
  box-shadow: 0 0 0 3px rgba(233, 30, 129, 0.12);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.submit-btn,
.secondary-btn {
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  cursor: pointer;
  font-weight: 700;
}

.submit-btn {
  background: #FFD200;
  color: #2D3E94;
}

.secondary-btn {
  background: #E91E81;
  color: white;
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
  .actions {
    flex-direction: column;
  }
}
</style>
