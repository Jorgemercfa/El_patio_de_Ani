<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AdminLayout from '@/components/AdminLayout.vue';
import {
  getCompanyproducts,
  updateCompanyproduct,
} from '@/auth/companyproductsRepo';

const route = useRoute();
const router = useRouter();

const serviceId = Number(route.params.id);
const currentImage = ref('');
const titleName = ref('');
const error = ref('');

const form = ref({
  name: '',
  shortDescription: '',
  longDescription: '',
  price: '',
  category: 'Shows Infantiles',
  subcategory: '',
  duration: '',
  age_range: '',
  dimensions: '',
  Terms_of_use: '',
  buy_button: '',
  details_button: '',
  optionsText: '',
});

const categories = [
  'Shows Infantiles',
  'Juegos e Inflables',
  'Carritos Snacks',
  'Estética Infantil',
];

onMounted(() => {
  const service = getCompanyproducts().find((item) => item.id === serviceId);
  if (!service) {
    error.value = 'Servicio no encontrado.';
    return;
  }

  titleName.value = service.name || '';
  currentImage.value = service.image || '';
  form.value = {
    name: service.name || '',
    shortDescription: service.shortDescription || '',
    longDescription: service.longDescription || '',
    price: service.price ?? '',
    category: service.category || 'Shows Infantiles',
    subcategory: service.subcategory || '',
    duration: service.duration || '',
    age_range: service.age_range || '',
    dimensions: service.dimensions || '',
    Terms_of_use: service.Terms_of_use || '',
    buy_button: service.buy_button || '',
    details_button: service.details_button || '',
    optionsText: Array.isArray(service.options)
      ? service.options.join('\n')
      : service.options || '',
  };
});

function onCancel() {
  router.push('/Services-admin');
}

function onSave() {
  error.value = '';

  if (!form.value.name.trim()) {
    error.value = 'El nombre es obligatorio.';
    return;
  }

  if (form.value.price === '' || form.value.price === null) {
    error.value = 'El precio es obligatorio.';
    return;
  }

  const price = Number(form.value.price);
  if (!Number.isFinite(price) || price < 0) {
    error.value = 'Ingresa un precio válido.';
    return;
  }

  updateCompanyproduct(serviceId, {
    name: form.value.name.trim(),
    shortDescription: form.value.shortDescription.trim(),
    longDescription: form.value.longDescription.trim(),
    price,
    category: form.value.category,
    subcategory: form.value.subcategory.trim(),
    duration: form.value.duration.trim(),
    age_range: form.value.age_range.trim(),
    dimensions: form.value.dimensions.trim(),
    Terms_of_use: form.value.Terms_of_use.trim(),
    buy_button: form.value.buy_button.trim(),
    details_button: form.value.details_button.trim(),
    options: form.value.optionsText
      .split('\n')
      .map((option) => option.trim())
      .filter(Boolean),
    _modified: true,
  });

  router.push('/Services-admin');
}
</script>

<template>
  <AdminLayout>
    <section class="panel">
      <h2 class="panel-title">Editando: {{ titleName || 'Servicio' }}</h2>

      <div v-if="error" class="message error">{{ error }}</div>

      <form class="form-area" @submit.prevent="onSave">
        <div class="form-group">
          <label>Nombre</label>
          <input v-model="form.name" type="text" required />
        </div>

        <div class="form-group">
          <label>Descripción corta</label>
          <input v-model="form.shortDescription" type="text" required />
        </div>

        <div class="form-group">
          <label>Descripción larga</label>
          <textarea v-model="form.longDescription" rows="4" />
        </div>

        <div class="form-group">
          <label>Precio base (S/)</label>
          <input v-model="form.price" type="number" min="0" required />
        </div>

        <div class="form-group">
          <label>Categoría</label>
          <select v-model="form.category">
            <option v-for="option in categories" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Subcategoría</label>
          <input v-model="form.subcategory" type="text" />
        </div>

        <div class="form-group">
          <label>Duración</label>
          <input v-model="form.duration" type="text" placeholder="Ej: 90 min" />
        </div>

        <div class="form-group">
          <label>Rango de edad</label>
          <input v-model="form.age_range" type="text" placeholder="Ej: 2-8 años" />
        </div>

        <div class="form-group">
          <label>Dimensiones</label>
          <input
            v-model="form.dimensions"
            type="text"
            placeholder="Ej: Alto: 3m | Base: 4m x 4m"
          />
        </div>

        <div class="form-group">
          <label>Términos de uso</label>
          <textarea v-model="form.Terms_of_use" rows="3" />
        </div>

        <div class="form-group">
          <label>Texto botón comprar</label>
          <input v-model="form.buy_button" type="text" placeholder="Ej: RESERVAR" />
        </div>

        <div class="form-group">
          <label>Texto botón detalles</label>
          <input
            v-model="form.details_button"
            type="text"
            placeholder="Ej: Ver Detalles"
          />
        </div>

        <div class="form-group">
          <label>Opciones (una por línea)</label>
          <textarea v-model="form.optionsText" rows="6" />
        </div>

        <div class="image-box">
          <p class="image-title">Imagen actual</p>
          <img v-if="currentImage" :src="currentImage" alt="Imagen del servicio" />
          <p class="image-help">
            La imagen se gestiona en los archivos de assets. Para cambiarla, actualiza
            el archivo en src/assets.
          </p>
        </div>

        <div class="actions">
          <button type="button" class="cancel-btn" @click="onCancel">Cancelar</button>
          <button type="submit" class="submit-btn">Guardar</button>
        </div>
      </form>
    </section>
  </AdminLayout>
</template>

<style scoped>
.panel {
  background: white;
  border: 2px solid #e91e81;
  border-radius: 14px;
  padding: 20px;
}

.panel-title {
  margin: 0 0 14px;
  color: #2d3e94;
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
  color: #e91e81;
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
  border-color: #e91e81;
  box-shadow: 0 0 0 3px rgba(233, 30, 129, 0.12);
}

.image-box {
  border: 1px solid #f0d3e6;
  border-radius: 12px;
  padding: 12px;
  background: #f4f6f3;
}

.image-title {
  margin: 0 0 8px;
  color: #2d3e94;
  font-weight: 700;
}

.image-box img {
  width: 100%;
  max-width: 340px;
  border-radius: 10px;
  margin-bottom: 8px;
}

.image-help {
  margin: 0;
  color: #555;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn,
.submit-btn {
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  cursor: pointer;
  font-weight: 700;
}

.cancel-btn {
  background: #2d3e94;
  color: white;
}

.submit-btn {
  background: #ffd200;
  color: #2d3e94;
}

.message {
  font-weight: 600;
}

.message.error {
  color: #b00020;
}

@media (max-width: 700px) {
  .actions {
    flex-direction: column;
  }
}
</style>
