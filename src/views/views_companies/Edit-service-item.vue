<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AdminLayout from '@/components/AdminLayout.vue';
import { uploadImage } from '@/auth/storageRepo';
import {
  fetchCompanyproducts,
  getCompanyproducts,
  updateCompanyproduct,
} from '@/auth/companyproductsRepo';

const route = useRoute();
const router = useRouter();

const serviceId = Number(route.params.id);
const titleName = ref('');
const error = ref('');
const currentImage = ref('');
const imageFile = ref(null);
const imagePreview = ref('');
const imageUploading = ref(false);
const revokeImagePreviewIfBlob = () => {
  if (imagePreview.value?.startsWith('blob:')) {
    URL.revokeObjectURL(imagePreview.value);
  }
};

// ─── Fotos adicionales (foto 2 y foto 3) ──────────────────
const extraImageFiles       = ref([null, null]);
const extraImagePreviews    = ref(['', '']);
const currentExtraImageUrls = ref(['', '']);

const onExtraImageChange = (event, index) => {
  const file = event.target.files[0];
  if (!file) return;
  if (extraImagePreviews.value[index]?.startsWith('blob:')) {
    URL.revokeObjectURL(extraImagePreviews.value[index]);
  }
  extraImageFiles.value[index] = file;
  extraImagePreviews.value[index] = URL.createObjectURL(file);
};

const removeExtraImage = (index) => {
  if (extraImagePreviews.value[index]?.startsWith('blob:')) {
    URL.revokeObjectURL(extraImagePreviews.value[index]);
  }
  extraImageFiles.value[index] = null;
  extraImagePreviews.value[index] = '';
  currentExtraImageUrls.value[index] = '';
};

const form = ref({
  name: '',
  shortDescription: '',
  longDescription: '',
  price: '',
  category: 'Shows Infantiles',
  subcategory: '',
  subcategory2: '',
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
  'Inflables',
  'Juegos',
  'Carritos Snacks',
  'Estética Infantil',
];

const subcategoryMap = {
  'Shows Infantiles': ['Animación', 'Competencia', 'Magia'],
  Inflables: ['Bebes', 'Mediano', 'Grande', 'Acuáticos'],
  Juegos: ['Juegos Little Tikes', 'Trampolines', 'Juegos para Bebés'],
  'Carritos Snacks': ['Salados', 'Dulces', 'Dúo Packs', 'Combos'],
  'Estética Infantil': ['Pintacaritas', 'Glitter Bar'],
};

const availableSubcategories = computed(() => subcategoryMap[form.value.category] || []);
const usesSubcategorySelect = computed(() => availableSubcategories.value.length > 0);

watch(
  () => form.value.category,
  () => {
    if (
      usesSubcategorySelect.value &&
      !availableSubcategories.value.includes(form.value.subcategory)
    ) {
      form.value.subcategory = '';
    }
  },
);

onMounted(async () => {
  await fetchCompanyproducts();
  const service = getCompanyproducts().find((item) => item.id === serviceId);
  if (!service) {
    error.value = 'Servicio no encontrado.';
    return;
  }

  titleName.value = service.name || '';
  form.value = {
    name: service.name || '',
    shortDescription: service.shortDescription || '',
    longDescription: service.longDescription || '',
    price: service.price ?? '',
    category: service.category || 'Shows Infantiles',
    subcategory: service.subcategory || '',
    subcategory2: service.subcategory2 || '',
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
  currentImage.value = service.image || '';

  // Cargar fotos adicionales existentes (images[1] = foto 2, images[2] = foto 3)
  currentExtraImageUrls.value = [
    service.images?.[1] || '',
    service.images?.[2] || '',
  ];
  extraImagePreviews.value = [...currentExtraImageUrls.value];
});

const onImageChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  revokeImagePreviewIfBlob();
  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

onBeforeUnmount(() => {
  revokeImagePreviewIfBlob();
  extraImagePreviews.value.forEach((url) => {
    if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
  });
});

function onCancel() {
  router.push('/Services-admin');
}

async function onSave() {
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

  let finalImageUrl = currentImage.value;
  if (imageFile.value) {
    imageUploading.value = true;
    try {
      finalImageUrl = await uploadImage(imageFile.value, 'products');
    } catch (e) {
      error.value = e?.message || 'No se pudo subir la imagen.';
      imageUploading.value = false;
      return;
    }
    imageUploading.value = false;
  }

  // Subir fotos adicionales (solo las que cambiaron)
  const extraUrls = [...currentExtraImageUrls.value];
  for (let i = 0; i < extraImageFiles.value.length; i++) {
    if (extraImageFiles.value[i]) {
      imageUploading.value = true;
      try {
        extraUrls[i] = await uploadImage(extraImageFiles.value[i], 'products');
      } catch (e) {
        error.value = `No se pudo subir la foto adicional ${i + 2}.`;
        imageUploading.value = false;
        return;
      }
      imageUploading.value = false;
    }
  }

  // Array completo de imágenes (foto 1 + extras, sin vacíos) — mantiene sincronía con images[0]
  const allImages = [finalImageUrl, ...extraUrls].filter(Boolean);

  try {
    await updateCompanyproduct(serviceId, {
      name: form.value.name.trim(),
      shortDescription: form.value.shortDescription.trim(),
      longDescription: form.value.longDescription.trim(),
      image: finalImageUrl,
      images: allImages,
      price,
      category: form.value.category,
      subcategory: form.value.subcategory.trim(),
      subcategory2: form.value.subcategory2.trim(),
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
  } catch (e) {
    error.value = e?.message || 'No se pudo guardar el servicio.';
  }
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
          <select v-if="usesSubcategorySelect" v-model="form.subcategory">
            <option value="">— Seleccionar —</option>
            <option v-for="option in availableSubcategories" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <input v-else v-model="form.subcategory" type="text" />
        </div>

        <!-- Subcategoría adicional (siempre visible, opcional) -->
        <div class="form-group">
          <label>
            Subcategoría adicional
            <span class="optional">(opcional)</span>
          </label>
          <input
            v-model="form.subcategory2"
            type="text"
            placeholder="Ej: Tropical, Splash, Lava, Curve Little Tikes"
          />
          <p class="field-hint">
            Úsalo si quieres dar un detalle extra de clasificación, además de la subcategoría principal.
          </p>
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

        <!-- Foto 1 — Imagen principal -->
        <div class="form-group">
          <label>Foto 1 — Imagen principal</label>
          <img
            v-if="currentImage && !imagePreview"
            :src="currentImage"
            alt="Imagen actual"
            class="image-preview"
          />
          <img
            v-if="imagePreview"
            :src="imagePreview"
            alt="Nueva imagen"
            class="image-preview"
          />
          <input
            type="file"
            accept="image/*"
            class="file-input"
            @change="onImageChange"
          />
          <p class="field-hint">
            {{ currentImage || imagePreview ? 'Selecciona otra para reemplazar' : 'Selecciona una imagen (JPG, PNG, WEBP o GIF — máx. 5MB)' }}
          </p>
        </div>

        <!-- Fotos adicionales (foto 2 y foto 3) -->
        <div
          v-for="(_, i) in extraImageFiles"
          :key="`extra-${i}`"
          class="form-group"
        >
          <label>
            Foto {{ i + 2 }}
            <span class="optional">(opcional)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            class="file-input"
            @change="onExtraImageChange($event, i)"
          />
          <div v-if="extraImagePreviews[i]" class="extra-preview-row">
            <img
              :src="extraImagePreviews[i]"
              alt="Preview adicional"
              class="image-preview"
            />
            <button type="button" class="remove-image-btn" @click="removeExtraImage(i)">
              ✕ Quitar foto
            </button>
          </div>
          <p v-else class="field-hint">Sin foto en este espacio.</p>
        </div>

        <div class="actions">
          <button type="button" class="cancel-btn" @click="onCancel">Cancelar</button>
          <button type="submit" class="submit-btn" :disabled="imageUploading">
            {{ imageUploading ? 'Subiendo imagen...' : 'Guardar' }}
          </button>
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.optional {
  font-weight: 400;
  color: #aaa;
  font-size: 0.8rem;
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

.file-input {
  border: 1.5px solid #ddd;
  border-radius: 12px;
  padding: 10px 12px;
  cursor: pointer;
  background: white;
}

.image-preview {
  width: 100%;
  max-width: 280px;
  border-radius: 10px;
  margin-top: 8px;
  object-fit: cover;
  border: 2px solid #f0d3e6;
}

.extra-preview-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.remove-image-btn {
  background: #fff0f0;
  border: 1px solid #f0b8b8;
  color: #b00020;
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
}

.remove-image-btn:hover { background: #ffe0e0; }

.field-hint {
  font-size: 0.8rem;
  color: #888;
  margin: 4px 0 0;
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