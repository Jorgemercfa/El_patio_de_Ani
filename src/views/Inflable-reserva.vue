<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { getCompanyproducts } from '@/auth/companyproductsRepo';
import { useSession } from '@/auth/session';
import {
  EL_PATIO_WHATSAPP_NUMBER,
  LARGE_INFLABLE_PRICE_THRESHOLD,
  getInflableBadge,
  getInflableGuestsInfo,
  getInflableSize,
  getInflableSpaceRequirement,
  getProductPrice,
  getSurfaceNote,
  isInflableProduct,
} from '@/utils/inflables';

const INFLABLE_DRAFT_KEY_PREFIX = 'el-patio-inflable-draft';
const NOT_PROVIDED_LABEL = 'No indicado';

const route = useRoute();
const router = useRouter();
const { state, isAuthenticated } = useSession();

const products = computed(() => getCompanyproducts());
const productId = computed(() => Number(route.query.id));
const product = computed(() =>
  products.value.find((item) => item.id === productId.value),
);
const isValidInflable = computed(
  () => !!product.value && isInflableProduct(product.value),
);
const inflableSize = computed(() => getInflableSize(product.value));
const inflableBadge = computed(() => getInflableBadge(inflableSize.value));
const price = computed(() => Number(getProductPrice(product.value) || 0));
const formattedPrice = computed(() => price.value.toFixed(2));
const minimumSpace = computed(() => getInflableSpaceRequirement(product.value));
const guestsInfo = computed(() => getInflableGuestsInfo(product.value));
const needsMeasurementVisit = computed(
  () => price.value > LARGE_INFLABLE_PRICE_THRESHOLD,
);
const minDate = ref(new Date().toISOString().split('T')[0]);

function updateMinimumEventDate() {
  minDate.value = new Date().toISOString().split('T')[0];
}

onMounted(() => {
  window.addEventListener('focus', updateMinimumEventDate);
  document.addEventListener('visibilitychange', updateMinimumEventDate);
});

onBeforeUnmount(() => {
  window.removeEventListener('focus', updateMinimumEventDate);
  document.removeEventListener('visibilitychange', updateMinimumEventDate);
});

const draftKey = computed(
  () => `${INFLABLE_DRAFT_KEY_PREFIX}-${productId.value || 'general'}`,
);

const createInitialForm = () => ({
  responsibleName: '',
  address: '',
  district: '',
  eventDate: '',
  startTime: '',
  endTime: '',
  powerSource: '',
  spaceLength: '',
  spaceWidth: '',
  surfaceType: '',
  childrenCount: '',
  ageRange: '',
  accessConfirmed: false,
  measurementDecision: '',
  measurementPhone: '',
});

const form = reactive(createInitialForm());

const submitAttempted = ref(false);
const showConfirmationModal = ref(false);

function toMinutes(time) {
  if (!time) return null;

  const [hours, minutes] = time.split(':').map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;

  return hours * 60 + minutes;
}

function hydrateDraft() {
  Object.assign(form, createInitialForm());

  const draft = localStorage.getItem(draftKey.value);

  if (draft) {
    try {
      Object.assign(form, JSON.parse(draft));
    } catch {
      localStorage.removeItem(draftKey.value);
    }
  }

  if (!form.responsibleName && state.user?.name) {
    form.responsibleName = state.user.name;
  }
}

watch(
  [draftKey, () => state.user?.name, isAuthenticated],
  () => {
    if (!isAuthenticated.value) return;
    hydrateDraft();
  },
  { immediate: true },
);

watch(
  form,
  () => {
    if (!isAuthenticated.value || !isValidInflable.value) return;
    localStorage.setItem(draftKey.value, JSON.stringify({ ...form }));
  },
  { deep: true },
);

watch(
  () => form.measurementDecision,
  (value) => {
    if (value !== 'visit') {
      form.measurementPhone = '';
    }
  },
);

const dimensionsWarning = computed(() => {
  if (!form.spaceLength || !form.spaceWidth || !isValidInflable.value) return '';

  const length = Number(form.spaceLength);
  const width = Number(form.spaceWidth);

  if (length >= minimumSpace.value.length && width >= minimumSpace.value.width) {
    return '';
  }

  return `El espacio indicado no alcanza para este inflable. ${minimumSpace.value.label}.`;
});

const powerWarning = computed(() =>
  form.powerSource === 'none'
    ? 'Para instalar el inflable necesitamos una toma estable o grupo electrógeno a menos de 15 metros.'
    : '',
);

const surfaceNote = computed(() => getSurfaceNote(form.surfaceType));

const submitErrors = computed(() => {
  const errors = [];

  if (!form.responsibleName.trim()) errors.push('Ingresa el nombre del responsable.');
  if (!form.address.trim()) errors.push('Ingresa la dirección del evento.');
  if (!form.district.trim()) errors.push('Ingresa el distrito del evento.');
  if (!form.eventDate) errors.push('Selecciona la fecha del evento.');
  if (!form.startTime) errors.push('Selecciona la hora de inicio.');
  if (!form.endTime) errors.push('Selecciona la hora de fin.');
  if (
    form.startTime &&
    form.endTime &&
    toMinutes(form.endTime) !== null &&
    toMinutes(form.startTime) !== null &&
    toMinutes(form.endTime) <= toMinutes(form.startTime)
  ) {
    errors.push('La hora de fin debe ser posterior a la hora de inicio.');
  }
  if (!form.powerSource) errors.push('Selecciona una opción de logística eléctrica.');
  if (form.powerSource === 'none') {
    errors.push('Se requiere suministro eléctrico estable o grupo electrógeno.');
  }
  if (!form.spaceLength || !form.spaceWidth) {
    errors.push('Completa el largo y ancho del espacio disponible.');
  }
  if (dimensionsWarning.value) errors.push(dimensionsWarning.value);
  if (!form.surfaceType) errors.push('Selecciona el tipo de suelo.');
  if (!form.childrenCount) errors.push('Ingresa la cantidad estimada de niños.');
  if (!form.ageRange.trim()) errors.push('Ingresa el rango de edades.');
  if (!form.accessConfirmed) {
    errors.push('Debes confirmar que la ruta de acceso está libre de escaleras y obstáculos.');
  }
  if (needsMeasurementVisit.value && !form.measurementDecision) {
    errors.push('Indica si deseas coordinar visita de medidas.');
  }
  if (
    needsMeasurementVisit.value &&
    form.measurementDecision === 'visit' &&
    !form.measurementPhone.trim()
  ) {
    errors.push('Ingresa un teléfono para coordinar la visita de medidas.');
  }

  return errors;
});

const whatsappMessage = computed(() => {
  const productName = product.value?.name || 'Inflable seleccionado';
  const measurementLine = needsMeasurementVisit.value
    ? `📐 Toma de medidas: ${
        form.measurementDecision === 'visit'
          ? `Sí, deseo coordinar visita. Teléfono: ${form.measurementPhone || 'Pendiente'}`
          : 'Confirmo que mi espacio es suficiente'
      }\n`
    : '';

  return (
    `Hola! Quiero confirmar la reserva del inflable "${productName}".\n\n` +
    `👤 Responsable: ${form.responsibleName}\n` +
    `📍 Dirección: ${form.address}\n` +
    `🏙️ Distrito: ${form.district}\n` +
    `📅 Fecha: ${form.eventDate}\n` +
    `⏰ Horario: ${form.startTime} - ${form.endTime}\n` +
    `⚡ Logística eléctrica: ${powerOptionsMap[form.powerSource] ?? NOT_PROVIDED_LABEL}\n` +
    `📏 Espacio disponible: ${form.spaceLength}m x ${form.spaceWidth}m\n` +
    `🧱 Tipo de suelo: ${surfaceLabelMap[form.surfaceType] ?? NOT_PROVIDED_LABEL}\n` +
    `👧 Invitados: ${form.childrenCount} niños\n` +
    `🎂 Edades: ${form.ageRange}\n` +
    `🚪 Ruta de acceso libre: ${form.accessConfirmed ? 'Sí' : 'No'}\n` +
    measurementLine +
    `💰 Precio referencial: S/ ${formattedPrice.value}`
  );
});

const whatsappUrl = computed(
  () => `https://wa.me/${EL_PATIO_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage.value)}`,
);

function submitReservation() {
  submitAttempted.value = true;

  if (submitErrors.value.length > 0) return;

  showConfirmationModal.value = true;
}

function openWhatsAppConfirmation() {
  localStorage.removeItem(draftKey.value);
  showConfirmationModal.value = false;
  window.open(whatsappUrl.value, '_blank');
}

function goToSignIn() {
  router.push({ name: 'SignIn' });
}

const powerOptionsMap = {
  socket: 'Sí, toma de corriente estable',
  generator: 'Sí, grupo electrógeno',
  none: 'No cuento con suministro eléctrico',
};

const surfaceLabelMap = {
  cesped: 'Césped (Estacas)',
  cemento: 'Cemento/Asfalto (Bolsas de arena)',
  tierra: 'Tierra',
  interior: 'Interior',
};
</script>

<template>
  <div class="page-wrapper">
    <header>
      <Navbar />
    </header>

    <main class="reservation-page">
      <section v-if="isValidInflable" class="reservation-shell">
        <div class="intro-card">
          <div class="intro-copy">
            <p class="eyebrow">Reserva de inflables</p>
            <h1 class="page-title">Reserva tu inflable con total confianza</h1>
            <p class="page-subtitle">
              Completa los datos del evento y validaremos que el espacio, acceso y logística sean adecuados.
            </p>
          </div>

          <div class="product-summary">
            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.name"
              class="product-summary-image"
            />
            <div class="product-summary-body">
              <div class="summary-badges">
                <span class="summary-badge primary">{{ product.category }}</span>
                <span
                  class="summary-badge size"
                  :style="{ background: inflableBadge.background, color: inflableBadge.color }"
                >
                  {{ inflableBadge.label }}
                </span>
              </div>
              <h2>{{ product.name }}</h2>
              <p>{{ minimumSpace.label }}</p>
              <strong>S/ {{ formattedPrice }}</strong>
            </div>
          </div>
        </div>

        <div v-if="!isAuthenticated" class="guest-panel">
          <div class="guest-copy">
            <h2>¿Eres nuevo con nosotros?</h2>
            <p>
              Contáctanos por WhatsApp para coordinar tu primera reserva de inflable. Así revisamos juntos
              el espacio, acceso y necesidades del evento.
            </p>
          </div>

          <div class="guest-actions">
            <a
              class="whatsapp-btn"
              :href="`https://wa.me/${EL_PATIO_WHATSAPP_NUMBER}?text=%C2%A1Hola!%20Quiero%20reservar%20un%20inflable`"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Consultar por WhatsApp
            </a>
            <button class="login-link" @click="goToSignIn">
              ¿Ya eres cliente? Inicia sesión
            </button>
          </div>
        </div>

        <form v-else class="reservation-card" @submit.prevent="submitReservation">
          <div v-if="submitAttempted && submitErrors.length" class="alert alert-error">
            <strong>Revisa la información antes de continuar:</strong>
            <ul>
              <li v-for="error in submitErrors" :key="error">{{ error }}</li>
            </ul>
          </div>

          <section class="section-block">
            <div class="section-heading">
              <span class="section-number">1</span>
              <div>
                <h2>🎉 Datos del evento</h2>
                <p>Información principal para preparar tu reserva.</p>
              </div>
            </div>

            <div class="form-grid">
              <label class="field">
                <span>Nombre responsable</span>
                <input v-model="form.responsibleName" type="text" placeholder="Nombre de contacto" />
              </label>
              <label class="field field-full">
                <span>Dirección completa</span>
                <input v-model="form.address" type="text" placeholder="Av., calle, referencia y número" />
              </label>
              <label class="field">
                <span>Distrito</span>
                <input v-model="form.district" type="text" placeholder="Ej. Surco, Miraflores" />
              </label>
              <label class="field">
                <span>Fecha del evento</span>
                <input v-model="form.eventDate" :min="minDate" type="date" />
              </label>
              <label class="field">
                <span>Horario inicio</span>
                <input v-model="form.startTime" type="time" />
              </label>
              <label class="field">
                <span>Horario fin</span>
                <input v-model="form.endTime" type="time" />
              </label>
            </div>
          </section>

          <section class="section-block">
            <div class="section-heading">
              <span class="section-number">2</span>
              <div>
                <h2>⚡ Logística eléctrica</h2>
                <p>Necesitamos confirmar la energía disponible para la instalación.</p>
              </div>
            </div>

            <div class="radio-group">
              <label class="radio-card">
                <input v-model="form.powerSource" type="radio" value="socket" name="power-source" />
                <span>Sí, toma de corriente estable</span>
              </label>
              <label class="radio-card">
                <input v-model="form.powerSource" type="radio" value="generator" name="power-source" />
                <span>Sí, grupo electrógeno</span>
              </label>
              <label class="radio-card">
                <input v-model="form.powerSource" type="radio" value="none" name="power-source" />
                <span>No cuento con suministro eléctrico</span>
              </label>
            </div>

            <div v-if="powerWarning" class="alert alert-warning">
              {{ powerWarning }}
            </div>
          </section>

          <section class="section-block">
            <div class="section-heading">
              <span class="section-number">3</span>
              <div>
                <h2>📏 Dimensiones del espacio</h2>
                <p>{{ minimumSpace.label }} para la categoría seleccionada.</p>
              </div>
            </div>

            <div class="form-grid">
              <label class="field">
                <span>Largo (m)</span>
                <input v-model="form.spaceLength" type="number" min="0" step="0.1" placeholder="Ej. 5" />
              </label>
              <label class="field">
                <span>Ancho (m)</span>
                <input v-model="form.spaceWidth" type="number" min="0" step="0.1" placeholder="Ej. 4" />
              </label>
            </div>

            <div v-if="dimensionsWarning" class="alert alert-warning">
              {{ dimensionsWarning }}
            </div>
          </section>

          <section class="section-block">
            <div class="section-heading">
              <span class="section-number">4</span>
              <div>
                <h2>🧱 Tipo de suelo</h2>
                <p>Así planificamos la forma correcta de fijación y seguridad.</p>
              </div>
            </div>

            <div class="form-grid">
              <label class="field field-full">
                <span>Especificaciones del suelo</span>
                <select v-model="form.surfaceType">
                  <option value="">Selecciona una opción</option>
                  <option value="cesped">Césped (Estacas)</option>
                  <option value="cemento">Cemento/Asfalto (Bolsas de arena)</option>
                  <option value="tierra">Tierra</option>
                  <option value="interior">Interior</option>
                </select>
              </label>
            </div>

            <div v-if="surfaceNote" class="alert alert-info">
              {{ surfaceNote }}
            </div>
          </section>

          <section class="section-block">
            <div class="section-heading">
              <span class="section-number">5</span>
              <div>
                <h2>🧒 Invitados</h2>
                <p>Queremos recomendar una experiencia segura y adecuada para las edades.</p>
              </div>
            </div>

            <div class="form-grid">
              <label class="field">
                <span>Cantidad de niños</span>
                <input
                  v-model="form.childrenCount"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Ej. 12"
                />
              </label>
              <label class="field">
                <span>Rango de edades</span>
                <input v-model="form.ageRange" type="text" placeholder="Ej. 3-8 años" />
              </label>
            </div>

            <div class="alert alert-info">
              {{ guestsInfo }}
            </div>
          </section>

          <section class="section-block">
            <div class="section-heading">
              <span class="section-number">6</span>
              <div>
                <h2>🚚 Ruta de acceso</h2>
                <p>Esto nos ayuda a confirmar si el traslado puede hacerse sin inconvenientes.</p>
              </div>
            </div>

            <label class="checkbox-card">
              <input v-model="form.accessConfirmed" type="checkbox" />
              <span>Confirmo que el acceso está libre de escaleras y obstáculos</span>
            </label>
          </section>

          <section v-if="needsMeasurementVisit" class="section-block">
            <div class="section-heading">
              <span class="section-number">7</span>
              <div>
                <h2>📐 Toma de medidas</h2>
                <p>
                  Este inflable incluye visita de medidas sin costo por su tamaño o valor superior a
                  S/ {{ LARGE_INFLABLE_PRICE_THRESHOLD }}.
                </p>
              </div>
            </div>

            <div class="radio-group">
              <label class="radio-card">
                <input
                  v-model="form.measurementDecision"
                  type="radio"
                  value="visit"
                  name="measurement-decision"
                />
                <span>Quiero coordinar visita de medidas</span>
              </label>
              <label class="radio-card">
                <input
                  v-model="form.measurementDecision"
                  type="radio"
                  value="confirmed"
                  name="measurement-decision"
                />
                <span>Confirmo que mi espacio es suficiente</span>
              </label>
            </div>

            <label v-if="form.measurementDecision === 'visit'" class="field field-full">
              <span>Teléfono para coordinar visita</span>
              <input v-model="form.measurementPhone" type="tel" placeholder="999 000 000" />
            </label>
          </section>

          <button class="submit-button" type="submit">
            ✅ Confirmar Reserva
          </button>
        </form>
      </section>

      <section v-else class="reservation-shell">
        <div class="guest-panel not-found-card">
          <div class="guest-copy">
            <h1>Servicio no disponible para esta reserva</h1>
            <p>
              No encontramos el inflable solicitado. Vuelve a la sección de servicios para elegir uno válido.
            </p>
          </div>
          <button class="login-link" @click="router.push({ name: 'product' })">
            Volver a servicios
          </button>
        </div>
      </section>
    </main>

    <div v-if="showConfirmationModal" class="modal-backdrop">
      <div class="modal-card">
        <h2>¡Reserva lista para confirmar! 🎉</h2>
        <p>
          Tu formulario está completo. Continúa por WhatsApp para enviarnos los datos y cerrar la coordinación.
        </p>
        <div class="modal-actions">
          <button class="submit-button" @click="openWhatsAppConfirmation">
            Abrir WhatsApp
          </button>
          <button class="secondary-button" @click="showConfirmationModal = false">
            Seguir editando
          </button>
        </div>
      </div>
    </div>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f4f6f3;
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
}

.reservation-page {
  flex: 1;
  padding: 110px 20px 70px;
}

.reservation-shell {
  max-width: 1040px;
  margin: 0 auto;
}

.intro-card,
.reservation-card,
.guest-panel,
.modal-card {
  background: #fff;
  border-radius: 24px;
  border: 2px solid rgba(233, 30, 129, 0.14);
  box-shadow: 0 18px 38px rgba(45, 62, 148, 0.08);
}

.intro-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 28px;
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 12px;
  color: #E91E81;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
}

.page-title {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
  line-height: 1.1;
  color: #2D3E94;
}

.page-subtitle {
  margin: 14px 0 0;
  color: rgba(45, 62, 148, 0.78);
  line-height: 1.7;
}

.product-summary {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 18px;
  border-radius: 18px;
  background: #faf8ff;
}

.product-summary-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 16px;
}

.product-summary-body h2 {
  margin: 0 0 8px;
  color: #2D3E94;
}

.product-summary-body p {
  margin: 0 0 10px;
  color: rgba(45, 62, 148, 0.78);
}

.product-summary-body strong {
  color: #E91E81;
  font-size: 1.4rem;
}

.summary-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.summary-badge {
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}

.summary-badge.primary {
  color: #fff;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
}

.guest-panel {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.guest-copy h2,
.guest-copy h1 {
  margin: 0 0 10px;
  color: #2D3E94;
}

.guest-copy p {
  margin: 0;
  color: rgba(45, 62, 148, 0.78);
  line-height: 1.7;
}

.guest-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reservation-card {
  padding: 28px;
}

.section-block + .section-block {
  margin-top: 28px;
}

.section-heading {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding-bottom: 14px;
  margin-bottom: 18px;
  border-bottom: 2px solid rgba(233, 30, 129, 0.18);
}

.section-number {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #E91E81;
  color: #fff;
  font-weight: 800;
  flex-shrink: 0;
}

.section-heading h2 {
  margin: 0 0 4px;
  color: #2D3E94;
  font-size: 1.2rem;
}

.section-heading p {
  margin: 0;
  color: rgba(45, 62, 148, 0.72);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field span {
  color: #2D3E94;
  font-weight: 600;
}

.field input,
.field select {
  min-height: 48px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  font-size: 0.98rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.field input:focus,
.field select:focus {
  outline: none;
  border-color: #E91E81;
  box-shadow: 0 0 0 4px rgba(233, 30, 129, 0.12);
}

.radio-group {
  display: grid;
  gap: 12px;
}

.radio-card,
.checkbox-card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: 14px;
  border: 2px solid #e7e9ef;
  background: #fff;
  color: #2D3E94;
  font-weight: 600;
}

.radio-card input,
.checkbox-card input {
  margin-top: 3px;
}

.alert {
  margin-top: 14px;
  padding: 14px 16px;
  border-radius: 14px;
  line-height: 1.6;
}

.alert ul {
  margin: 10px 0 0;
  padding-left: 20px;
}

.alert-error {
  background: #fff0f5;
  border: 2px solid rgba(233, 30, 129, 0.28);
  color: #9d174d;
}

.alert-warning {
  background: #fffbea;
  border: 2px solid rgba(255, 210, 0, 0.6);
  color: #7c5a00;
}

.alert-info {
  background: #f0f4ff;
  border: 2px solid rgba(45, 62, 148, 0.18);
  color: #2D3E94;
}

.submit-button,
.whatsapp-btn,
.login-link,
.secondary-button {
  border: none;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
}

.submit-button {
  width: 100%;
  margin-top: 28px;
  padding: 16px 20px;
  background: #FFD200;
  color: #2D3E94;
  box-shadow: 0 14px 24px rgba(255, 210, 0, 0.28);
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 30px rgba(255, 210, 0, 0.36);
}

.whatsapp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 18px;
  text-decoration: none;
  background: linear-gradient(135deg, #25D366, #128C7E);
  color: #fff;
  box-shadow: 0 14px 24px rgba(37, 211, 102, 0.22);
}

.login-link,
.secondary-button {
  padding: 15px 18px;
  background: #fff;
  color: #E91E81;
  border: 2px solid #E91E81;
}

.login-link:hover,
.secondary-button:hover {
  background: #E91E81;
  color: #fff;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(24, 35, 84, 0.48);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 40;
}

.modal-card {
  max-width: 420px;
  width: 100%;
  padding: 26px;
}

.modal-card h2 {
  margin: 0 0 10px;
  color: #2D3E94;
}

.modal-card p {
  margin: 0;
  color: rgba(45, 62, 148, 0.78);
  line-height: 1.7;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 22px;
}

@media (min-width: 768px) {
  .intro-card {
    grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.9fr);
    align-items: center;
  }

  .form-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .field-full {
    grid-column: 1 / -1;
  }
}
</style>
