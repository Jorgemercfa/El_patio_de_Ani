<script setup>
import { computed, onMounted, ref, watch } from 'vue';
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

// ─── Campos base ───────────────────────────────────────────
const name             = ref('');
const shortDescription = ref('');
const longDescription  = ref('');
const category         = ref('Shows Infantiles');
const subcategory      = ref('');
const price            = ref('');
const duration         = ref('');
const ageRange         = ref('');
const dimensions       = ref('');
const termsOfUse       = ref('');
const productCode      = ref('');

// ─── Options dinámicas ─────────────────────────────────────
const options    = ref([]);
const newOption  = ref('');

const addOption = () => {
  const val = newOption.value.trim();
  if (val && !options.value.includes(val)) {
    options.value.push(val);
  }
  newOption.value = '';
};

const removeOption = (index) => {
  options.value.splice(index, 1);
};

// ─── Catálogo de categorías y subcategorías ────────────────
const categoryMap = {
  'Shows Infantiles':   ['Animación', 'Competencia', 'Magia'],
  'Juegos e Inflables': ['Inflables', 'Juegos Little Tikes', 'Trampolines', 'Juegos para Bebés'],
  'Estética Infantil':  ['Pintacaritas', 'Glitter Bar'],
  'Carritos Snacks':    ['Salados', 'Dulces', 'Dúo Packs', 'Combos'],
};

const categories    = Object.keys(categoryMap);
const subcategories = computed(() => categoryMap[category.value] ?? []);

// Resetear subcategoría al cambiar categoría
watch(category, () => { subcategory.value = ''; });

// ─── Términos predefinidos por categoría ───────────────────
const TERMS_JUEGOS =
  'Contrato sujeto a disponibilidad. Reserva con el 50% del total. Los juegos se instalan horas antes y se retiran al finalizar el evento. No se instalan en vía pública. Precios por alquiler por evento. Costo de movilidad varía según distrito.';

const TERMS_SNACKS =
  'Reserva con el 50% del total. Los carritos se instalan 1 hora antes y se retiran al finalizar el evento. No se instalan en vía pública. Costo de movilidad varía según distrito.';

const TERMS_SHOWS =
  'Reserva con 50%. No incluye movilidad. Válido para 10 a 20 niños.';

const TERMS_ESTETICA =
  'Contrato sujeto a disponibilidad. Reserva con el 50% del total. El personal se instala 15 minutos antes. No aplica movilidad (costo aparte según distrito). No se instala en vía pública.';

const defaultTermsMap = {
  'Shows Infantiles':   TERMS_SHOWS,
  'Juegos e Inflables': TERMS_JUEGOS,
  'Estética Infantil':  TERMS_ESTETICA,
  'Carritos Snacks':    TERMS_SNACKS,
};

const applyDefaultTerms = () => {
  termsOfUse.value = defaultTermsMap[category.value] ?? '';
};

// ─── Campos visibles según categoría ──────────────────────
const showDuration   = computed(() =>
  ['Shows Infantiles', 'Estética Infantil'].includes(category.value));

const showAgeRange   = computed(() =>
  ['Shows Infantiles', 'Juegos e Inflables'].includes(category.value));

const showDimensions = computed(() =>
  category.value === 'Juegos e Inflables');

// ─── Mensajes ──────────────────────────────────────────────
const error   = ref('');
const success  = ref('');

// ─── Código de producto ────────────────────────────────────
const generateProductCode = () => {
  const prefix = name.value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 6);
  const random = Math.floor(1000 + Math.random() * 9000);
  productCode.value = `${prefix || 'PROD'}${random}`;
};

// ─── Submit ────────────────────────────────────────────────
const onCreateProduct = () => {
  error.value   = '';
  success.value = '';

  if (!state.company) {
    error.value = 'Tu sesión de empresa no está activa.';
    return;
  }

  if (!name.value.trim() || !shortDescription.value.trim()) {
    error.value = 'Completa el nombre y la descripción corta.';
    return;
  }

  const priceNumber = Number(price.value);
  if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
    error.value = 'Ingresa un precio válido.';
    return;
  }

  if (!productCode.value.trim()) generateProductCode();

  const payload = {
    name:             name.value.trim(),
    shortDescription: shortDescription.value.trim(),
    longDescription:  longDescription.value.trim(),
    category:         category.value,
    subcategory:      subcategory.value,
    price:            priceNumber,
    duration:         duration.value.trim(),
    age_range:        ageRange.value.trim(),
    dimensions:       dimensions.value.trim(),
    options:          [...options.value],
    Terms_of_use:     termsOfUse.value.trim(),
    product_code:     productCode.value.trim().toUpperCase(),
    companyId:        state.company.id,
    companyName:      state.company.name,
    companyRuc:       state.company.ruc,
    companyemail:     state.company.email,
  };

  const isEditing = Number.isFinite(editingId.value) && editingId.value > 0;

  if (isEditing) {
    const all     = getCompanyproducts();
    const updated = all.map((p) =>
      p.id === editingId.value ? { ...p, ...payload, _modified: true } : p,
    );
    saveCompanyproducts(updated);
  } else {
    addCompanyproduct(payload);
  }

  success.value = isEditing
    ? 'Producto actualizado correctamente.'
    : 'Producto creado correctamente.';

  resetForm();
  setTimeout(() => router.push({ name: 'Companyproducts' }), 500);
};

// ─── Reset ─────────────────────────────────────────────────
const resetForm = () => {
  name.value             = '';
  shortDescription.value = '';
  longDescription.value  = '';
  category.value         = 'Shows Infantiles';
  subcategory.value      = '';
  price.value            = '';
  duration.value         = '';
  ageRange.value         = '';
  dimensions.value       = '';
  options.value          = [];
  newOption.value        = '';
  termsOfUse.value       = '';
  productCode.value      = '';
};

// ─── Cargar producto existente (edición) ───────────────────
onMounted(() => {
  if (!Number.isFinite(editingId.value) || editingId.value <= 0) return;
  const existing = getCompanyproducts().find((p) => p.id === editingId.value);
  if (!existing) return;

  name.value             = existing.name             ?? '';
  shortDescription.value = existing.shortDescription ?? '';
  longDescription.value  = existing.longDescription  ?? '';
  category.value         = existing.category         ?? 'Shows Infantiles';
  subcategory.value      = existing.subcategory      ?? '';
  price.value            = existing.price            ?? '';
  duration.value         = existing.duration         ?? '';
  ageRange.value         = existing.age_range        ?? '';
  dimensions.value       = existing.dimensions       ?? '';
  options.value          = Array.isArray(existing.options) ? [...existing.options] : [];
  termsOfUse.value       = existing.Terms_of_use     ?? '';
  productCode.value      = existing.product_code     ?? '';
});
</script>

<template>
  <AdminLayout>
    <section class="panel">
      <h2 class="panel-title">
        {{ Number.isFinite(editingId) && editingId > 0 ? 'Editar producto' : 'Crear producto' }}
      </h2>

      <form class="form-area" @submit.prevent="onCreateProduct" autocomplete="on">
        <div v-if="error"   class="message error">{{ error }}</div>
        <div v-if="success" class="message success">{{ success }}</div>

        <!-- Nombre -->
        <div class="form-group">
          <label>Nombre del producto</label>
          <input v-model="name" type="text" required placeholder="Ej: Show Infantil Paquete 1" />
        </div>

        <!-- Descripción corta -->
        <div class="form-group">
          <label>Descripción corta</label>
          <input v-model="shortDescription" type="text" required />
        </div>

        <!-- Descripción larga -->
        <div class="form-group">
          <label>Descripción larga</label>
          <textarea v-model="longDescription" rows="3" />
        </div>

        <!-- Categoría + Subcategoría -->
        <div class="form-row">
          <div class="form-group">
            <label>Categoría</label>
            <select v-model="category">
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Subcategoría</label>
            <select v-model="subcategory">
              <option value="">— Seleccionar —</option>
              <option v-for="sub in subcategories" :key="sub" :value="sub">{{ sub }}</option>
            </select>
          </div>
        </div>

        <!-- Precio -->
        <div class="form-group">
          <label>Precio (S/)</label>
          <input v-model="price" type="number" min="1" required placeholder="Ej: 1000" />
        </div>

        <!-- Duración (solo Shows e Estética) -->
        <div v-if="showDuration" class="form-group">
          <label>Duración</label>
          <input v-model="duration" type="text" placeholder="Ej: 90 min" />
        </div>

        <!-- Rango de edad (Shows y Juegos) -->
        <div v-if="showAgeRange" class="form-group">
          <label>Rango de edad</label>
          <input v-model="ageRange" type="text" placeholder="Ej: 2-6 años" />
        </div>

        <!-- Dimensiones (solo Juegos e Inflables) -->
        <div v-if="showDimensions" class="form-group">
          <label>Dimensiones</label>
          <input v-model="dimensions" type="text" placeholder="Ej: Alto: 3m | Base: 4m x 4m" />
        </div>

        <!-- Opciones dinámicas -->
        <div class="form-group">
          <label>Opciones / Variantes</label>
          <div class="option-input-row">
            <input
              v-model="newOption"
              type="text"
              placeholder="Ej: Con agua: S/ 650.00"
              @keydown.enter.prevent="addOption"
            />
            <button type="button" class="add-btn" @click="addOption">+ Agregar</button>
          </div>

          <ul v-if="options.length" class="options-list">
            <li v-for="(opt, i) in options" :key="i" class="option-item">
              <span>{{ opt }}</span>
              <button type="button" class="remove-btn" @click="removeOption(i)">✕</button>
            </li>
          </ul>
          <p v-else class="empty-hint">Aún no hay opciones agregadas.</p>
        </div>

        <!-- Términos de uso -->
        <div class="form-group">
          <label>
            Términos de uso
            <button type="button" class="terms-default-btn" @click="applyDefaultTerms">
              Usar predeterminado
            </button>
          </label>
          <textarea v-model="termsOfUse" rows="3" placeholder="Condiciones del servicio..." />
        </div>

        <!-- Acciones -->
        <div class="actions">
          <button type="button" class="secondary-btn" @click="generateProductCode">
            Generar código
          </button>
          <span v-if="productCode" class="code-preview">{{ productCode }}</span>
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

/* Fila de dos columnas para categoría/subcategoría */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-group input,
.form-group textarea,
.form-group select {
  border: 1.5px solid #ddd;
  border-radius: 12px;
  padding: 12px;
  font-size: 0.95rem;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #E91E81;
  box-shadow: 0 0 0 3px rgba(233, 30, 129, 0.12);
}

/* Options */
.option-input-row {
  display: flex;
  gap: 8px;
}

.option-input-row input {
  flex: 1;
  border: 1.5px solid #ddd;
  border-radius: 12px;
  padding: 10px 12px;
}

.option-input-row input:focus {
  outline: none;
  border-color: #E91E81;
  box-shadow: 0 0 0 3px rgba(233, 30, 129, 0.12);
}

.add-btn {
  background: #2D3E94;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 700;
  white-space: nowrap;
}

.add-btn:hover {
  background: #1e2d6e;
}

.options-list {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.option-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f0f6;
  border: 1px solid #f0c8e0;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.9rem;
}

.remove-btn {
  background: none;
  border: none;
  color: #E91E81;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1;
  padding: 0 4px;
}

.remove-btn:hover {
  color: #b00060;
}

.empty-hint {
  color: #aaa;
  font-size: 0.85rem;
  margin: 6px 0 0;
}

/* Botón términos predeterminados */
.terms-default-btn {
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 3px 10px;
  font-size: 0.78rem;
  cursor: pointer;
  color: #2D3E94;
  font-weight: 600;
}

.terms-default-btn:hover {
  background: #e0e8ff;
}

/* Acciones */
.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}

.code-preview {
  font-family: monospace;
  background: #f0f0f0;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.9rem;
  color: #2D3E94;
  font-weight: 700;
}

.submit-btn,
.secondary-btn {
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
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
  .form-row {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  .submit-btn,
  .secondary-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
