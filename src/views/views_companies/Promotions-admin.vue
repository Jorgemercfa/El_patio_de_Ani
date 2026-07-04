<script setup>
import { ref, onMounted } from 'vue';
import AdminLayout from '@/components/AdminLayout.vue';
import {
  getAllPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
  togglePromotion,
} from '@/auth/promsRepo';

const promotions = ref([]);
const loading = ref(true);
const submitting = ref(false);
const deleteConfirmId = ref(null);
const editingId = ref(null);
const successMessage = ref('');
const errorMessage = ref('');

const emptyForm = () => ({
  title: '',
  description: '',
  price: '',
  originalPrice: '',
  image: '',
  deadline: '',
  active: true,
  order: 1,
});

const form = ref(emptyForm());

onMounted(async () => {
  await loadPromotions();
});

async function loadPromotions() {
  loading.value = true;
  try {
    promotions.value = await getAllPromotions();
  } catch (err) {
    errorMessage.value = 'Error cargando promociones.';
    console.error('[PromoAdmin]', err);
  } finally {
    loading.value = false;
  }
}

function startEdit(promo) {
  editingId.value = promo.id;
  form.value = {
    title: promo.title || '',
    description: promo.description || '',
    price: promo.price || '',
    originalPrice: promo.originalPrice || '',
    image: promo.image || '',
    deadline: promo.deadline
      ? (promo.deadline?.toDate
          ? promo.deadline.toDate().toISOString().split('T')[0]
          : String(promo.deadline).split('T')[0])
      : '',
    active: promo.active ?? true,
    order: promo.order ?? 1,
  };
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
  editingId.value = null;
  form.value = emptyForm();
  errorMessage.value = '';
}

function buildPayload() {
  return {
    title: form.value.title.trim(),
    description: form.value.description.trim(),
    price: Number(form.value.price) || 0,
    originalPrice: Number(form.value.originalPrice) || 0,
    image: form.value.image.trim(),
    deadline: form.value.deadline
      ? new Date(form.value.deadline + 'T23:59:59').toISOString()
      : null,
    active: form.value.active,
    order: Number(form.value.order) || 1,
  };
}

async function handleSave() {
  if (!form.value.title.trim()) {
    errorMessage.value = 'El título es obligatorio.';
    return;
  }
  if (!form.value.price) {
    errorMessage.value = 'El precio es obligatorio.';
    return;
  }
  submitting.value = true;
  errorMessage.value = '';
  try {
    const payload = buildPayload();
    if (editingId.value) {
      await updatePromotion(editingId.value, payload);
      successMessage.value = '✅ Promoción actualizada.';
    } else {
      await createPromotion(payload);
      successMessage.value = '✅ Promoción creada.';
    }
    cancelEdit();
    await loadPromotions();
    setTimeout(() => { successMessage.value = ''; }, 3000);
  } catch (err) {
    errorMessage.value = 'Error guardando la promoción. Intenta de nuevo.';
    console.error('[PromoAdmin]', err);
  } finally {
    submitting.value = false;
  }
}

async function handleDelete(id) {
  if (deleteConfirmId.value !== id) {
    deleteConfirmId.value = id;
    return;
  }
  try {
    await deletePromotion(id);
    deleteConfirmId.value = null;
    await loadPromotions();
    successMessage.value = '🗑️ Promoción eliminada.';
    setTimeout(() => { successMessage.value = ''; }, 3000);
  } catch (err) {
    errorMessage.value = 'Error eliminando la promoción.';
  }
}

async function handleToggle(promo) {
  try {
    await togglePromotion(promo.id, !promo.active);
    await loadPromotions();
  } catch (err) {
    errorMessage.value = 'Error actualizando el estado.';
  }
}

function formatDeadline(deadline) {
  if (!deadline) return null;
  const date = deadline?.toDate ? deadline.toDate() : new Date(deadline);
  return date.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
}

function isExpired(deadline) {
  if (!deadline) return false;
  const date = deadline?.toDate ? deadline.toDate() : new Date(deadline);
  return date < new Date();
}
</script>

<template>
  <AdminLayout>
  <div class="admin-wrapper">
    <h1 class="admin-title">Gestión de Promociones</h1>

    <p v-if="successMessage" class="feedback-success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="feedback-error">{{ errorMessage }}</p>

    <!-- ===== FORMULARIO ===== -->
    <div class="admin-card">
      <h2 class="section-title">
        {{ editingId ? '✏️ Editar promoción' : '➕ Nueva promoción' }}
      </h2>

      <div class="form-grid">
        <div class="form-group form-group--full">
          <label>Título *</label>
          <input v-model="form.title" type="text" placeholder="Ej: Inflable con Piscina de Pelotas" />
        </div>

        <div class="form-group form-group--full">
          <label>Descripción</label>
          <textarea v-model="form.description" rows="3" placeholder="Tobogán doble + piscina de pelotas. Cupón especial." />
        </div>

        <div class="form-group">
          <label>Precio promo (S/) *</label>
          <input v-model="form.price" type="number" min="0" placeholder="470" />
        </div>

        <div class="form-group">
          <label>Precio original (S/) <span class="optional">(opcional)</span></label>
          <input v-model="form.originalPrice" type="number" min="0" placeholder="600" />
        </div>

        <div class="form-group">
          <label>Fecha límite <span class="optional">(opcional)</span></label>
          <input v-model="form.deadline" type="date" />
        </div>

        <div class="form-group">
          <label>Orden de aparición</label>
          <input v-model="form.order" type="number" min="1" placeholder="1" />
        </div>

        <div class="form-group form-group--full">
          <label>URL de imagen <span class="optional">(opcional)</span></label>
          <input v-model="form.image" type="url" placeholder="https://..." />
        </div>

        <div class="form-group form-group--full toggle-row">
          <label class="toggle-label">
            <input v-model="form.active" type="checkbox" class="toggle-input" />
            <span class="toggle-track">
              <span class="toggle-thumb"></span>
            </span>
            <span>{{ form.active ? 'Promoción activa (visible al público)' : 'Promoción inactiva (oculta)' }}</span>
          </label>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn-secondary" v-if="editingId" @click="cancelEdit">Cancelar</button>
        <button class="btn-primary" :disabled="submitting" @click="handleSave">
          {{ submitting ? 'Guardando...' : editingId ? '💾 Guardar cambios' : '➕ Crear promoción' }}
        </button>
      </div>
    </div>

    <!-- ===== LISTA ===== -->
    <div class="admin-card">
      <h2 class="section-title">
        📋 Promociones
        <span class="count-badge">{{ promotions.length }}</span>
      </h2>

      <div v-if="loading" class="empty-state">Cargando promociones...</div>
      <div v-else-if="promotions.length === 0" class="empty-state">No hay promociones todavía.</div>

      <div v-else class="promos-list">
        <div
          v-for="promo in promotions"
          :key="promo.id"
          class="promo-row"
          :class="{ 'promo-row--inactive': !promo.active, 'promo-row--expired': isExpired(promo.deadline) }"
        >
          <div class="promo-row-info">
            <div class="promo-row-header">
              <span class="promo-row-title">{{ promo.title }}</span>
              <span class="status-pill" :class="promo.active ? 'status-active' : 'status-inactive'">
                {{ promo.active ? 'Activa' : 'Inactiva' }}
              </span>
              <span v-if="isExpired(promo.deadline)" class="status-pill status-expired">Vencida</span>
            </div>
            <p class="promo-row-desc">{{ promo.description }}</p>
            <div class="promo-row-meta">
              <span class="meta-price">S/ {{ promo.price }}</span>
              <span v-if="promo.originalPrice" class="meta-original">antes S/ {{ promo.originalPrice }}</span>
              <span v-if="promo.deadline" class="meta-deadline">📅 hasta {{ formatDeadline(promo.deadline) }}</span>
              <span class="meta-order">orden: {{ promo.order }}</span>
            </div>
          </div>

          <div class="promo-row-actions">
            <button class="btn-toggle" @click="handleToggle(promo)">
              {{ promo.active ? '⏸ Desactivar' : '▶ Activar' }}
            </button>
            <button class="btn-edit" @click="startEdit(promo)">✏️ Editar</button>
            <button
              class="btn-delete"
              :class="{ confirm: deleteConfirmId === promo.id }"
              @click="handleDelete(promo.id)"
            >
              {{ deleteConfirmId === promo.id ? '¿Confirmar?' : '🗑️' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </AdminLayout>

</template>

<style scoped>
.admin-wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 100px 20px 60px;
  font-family: 'Nunito', sans-serif;
}

.admin-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.admin-title::after {
  content: '';
  width: 64px;
  height: 4px;
  background: #E91E81;
  position: absolute;
  bottom: -10px;
  left: 0;
  border-radius: 5px;
  display: block;
}

.admin-card {
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  margin-bottom: 28px;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2D3E94;
  margin: 0 0 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.count-badge {
  background: #E91E81;
  color: white;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 0.85rem;
  font-weight: 700;
}

/* ===== FORMULARIO ===== */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group--full {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 700;
  font-size: 0.88rem;
  color: #333;
}

.form-group input,
.form-group textarea {
  padding: 11px 13px;
  border: 1.5px solid #ddd;
  border-radius: 12px;
  font-size: 0.93rem;
  font-family: 'Nunito', sans-serif;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #E91E81;
  box-shadow: 0 0 0 3px rgba(233, 30, 129, 0.08);
}

.form-group textarea { resize: vertical; }

.optional {
  font-weight: 400;
  color: #aaa;
  font-size: 0.8rem;
}

/* Toggle */
.toggle-row { align-items: flex-start; }

.toggle-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 0.93rem;
  color: #333;
  font-weight: 600;
}

.toggle-input { display: none; }

.toggle-track {
  width: 44px;
  height: 24px;
  background: #ddd;
  border-radius: 999px;
  position: relative;
  transition: background 0.2s;
  flex-shrink: 0;
}

.toggle-input:checked + .toggle-track {
  background: #E91E81;
}

.toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  transition: left 0.2s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}

.toggle-input:checked + .toggle-track .toggle-thumb {
  left: 23px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-primary {
  padding: 12px 28px;
  background: #FFD200;
  color: #2D3E94;
  border: none;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  transition: background 0.2s, transform 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background: #f2c500;
  transform: translateY(-2px);
}

.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-secondary {
  padding: 12px 24px;
  background: white;
  color: #E91E81;
  border: 2px solid #E91E81;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  transition: background 0.2s;
}

.btn-secondary:hover { background: #fff0f7; }

/* ===== LISTA ===== */
.promos-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.promo-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 18px;
  background: #fdf6ec;
  border-radius: 16px;
  border-left: 4px solid #E91E81;
  transition: opacity 0.2s;
}

.promo-row--inactive { border-left-color: #ccc; opacity: 0.75; }
.promo-row--expired { border-left-color: #aaa; }

.promo-row-info { flex: 1; }

.promo-row-header {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.promo-row-title {
  font-weight: 700;
  color: #2D3E94;
  font-size: 0.95rem;
}

.status-pill {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 999px;
}

.status-active { background: rgba(37,211,102,0.15); color: #1c8c46; }
.status-inactive { background: #f0f0f0; color: #888; }
.status-expired { background: #ffe0e0; color: #b00020; }

.promo-row-desc {
  font-size: 0.85rem;
  color: #555;
  margin: 0 0 8px;
  line-height: 1.4;
}

.promo-row-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.meta-price {
  font-weight: 800;
  color: #E91E81;
  font-size: 1rem;
}

.meta-original {
  font-size: 0.8rem;
  color: #aaa;
  text-decoration: line-through;
}

.meta-deadline, .meta-order {
  font-size: 0.78rem;
  color: #888;
}

.promo-row-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: flex-start;
  flex-wrap: wrap;
}

.btn-toggle {
  background: white;
  border: 2px solid #2D3E94;
  color: #2D3E94;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-toggle:hover { background: #f0f4ff; }

.btn-edit {
  background: white;
  border: 2px solid #FFD200;
  color: #2D3E94;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  transition: all 0.2s;
}

.btn-edit:hover { background: #fffbe6; }

.btn-delete {
  background: white;
  border: 2px solid #E91E81;
  color: #E91E81;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-delete:hover { background: #fff0f7; }
.btn-delete.confirm { background: #E91E81; color: white; }

.feedback-success {
  background: rgba(37,211,102,0.12);
  border: 1px solid rgba(37,211,102,0.4);
  color: #128C7E;
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: 700;
  margin-bottom: 20px;
}

.feedback-error {
  background: rgba(233,30,129,0.08);
  border: 1px solid rgba(233,30,129,0.3);
  color: #b00020;
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: 700;
  margin-bottom: 20px;
}

.empty-state {
  text-align: center;
  color: #888;
  padding: 32px;
  font-size: 0.95rem;
}

@media (max-width: 700px) {
  .form-grid { grid-template-columns: 1fr; }
  .form-group--full { grid-column: 1; }
  .promo-row { flex-direction: column; }
  .promo-row-actions { width: 100%; justify-content: flex-end; }
}
</style>