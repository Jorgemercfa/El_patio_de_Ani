<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useSession } from '@/auth/session';
import { getCompanyproducts } from '@/auth/companyproductsRepo';
import { WHATSAPP_BUSINESS_NUMBER } from '@/constants/inflables';
import { useReservasServicio } from '@/store/reservas';

const route = useRoute();
const { state, isAuthenticated } = useSession();
const { isDateAvailable, saveReservation } = useReservasServicio();

const CURRENCY_PREFIX = 'S/';
const CALENDAR_WEEK_DAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

const allProducts = computed(() => getCompanyproducts());
const selectedProduct = computed(() =>
  allProducts.value.find((product) => product.id === Number(route.query.id)),
);

const parsePrice = (value) => {
  if (value === null || value === undefined || value === '') return 0;
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value !== 'string') return 0;

  const cleaned = value.trim().replace(/[^\d.,-]/g, '');
  if (!cleaned) return 0;

  const lastComma = cleaned.lastIndexOf(',');
  const lastDot = cleaned.lastIndexOf('.');
  const decimalIndex = Math.max(lastComma, lastDot);

  const normalizedValue =
    decimalIndex >= 0
      ? `${cleaned.slice(0, decimalIndex).replace(/[.,]/g, '')}.${cleaned
          .slice(decimalIndex + 1)
          .replace(/[.,]/g, '')}`
      : cleaned.replace(/[.,]/g, '');

  const parsed = Number(normalizedValue);
  return Number.isFinite(parsed) ? parsed : 0;
};

const selectedPrice = computed(() => {
  if (!selectedProduct.value) return 0;
  return (
    parsePrice(selectedProduct.value.price) ||
    parsePrice(selectedProduct.value.discount_price) ||
    parsePrice(selectedProduct.value.originalPrice) ||
    parsePrice(selectedProduct.value.tributo)
  );
});

const getLocalDate = () => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - timezoneOffset).toISOString().split('T')[0];
};

const today = getLocalDate();
const initialCalendarDate = new Date();
const currentCalendarDate = ref(
  new Date(initialCalendarDate.getFullYear(), initialCalendarDate.getMonth(), 1),
);

const form = ref({
  responsibleName: state.user?.name || '',
  eventAddress: '',
  district: '',
  eventDate: '',
  startTime: '',
  endTime: '',
  reservationConfirmed: false,
});

const formErrors = ref({});
const showConfirmationModal = ref(false);
const firstContactWhatsappUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=Hola!%20Quiero%20reservar%20un%20servicio%20para%20mi%20evento`;
const calendarMonthLabel = computed(() => {
  const label = currentCalendarDate.value.toLocaleDateString('es-PE', {
    month: 'long',
    year: 'numeric',
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
});

const formatDateForStorage = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const isDateReserved = (dateString) => {
  const productId = selectedProduct.value?.id;
  if (!productId) return true;
  return !isDateAvailable(productId, dateString);
};

const calendarDays = computed(() => {
  const year = currentCalendarDate.value.getFullYear();
  const month = currentCalendarDate.value.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const totalCells = Math.ceil((firstDayOffset + daysInMonth) / 7) * 7;
  const days = [];

  for (let index = 0; index < totalCells; index += 1) {
    const dayNumber = index - firstDayOffset + 1;
    if (dayNumber < 1 || dayNumber > daysInMonth) {
      days.push(null);
      continue;
    }

    const dateString = formatDateForStorage(new Date(year, month, dayNumber));
    const isPast = dateString < today;
    const isReserved = isDateReserved(dateString);
    const isSelected = form.value.eventDate === dateString;

    days.push({
      dayNumber,
      dateString,
      isPast,
      isReserved,
      isSelected,
      isAvailable: !isPast && !isReserved,
    });
  }

  return days;
});

const goToPreviousMonth = () => {
  currentCalendarDate.value = new Date(
    currentCalendarDate.value.getFullYear(),
    currentCalendarDate.value.getMonth() - 1,
    1,
  );
};

const goToNextMonth = () => {
  currentCalendarDate.value = new Date(
    currentCalendarDate.value.getFullYear(),
    currentCalendarDate.value.getMonth() + 1,
    1,
  );
};

const selectCalendarDate = (day) => {
  if (!day?.isAvailable) return;
  form.value.eventDate = day.dateString;
  formErrors.value.eventDate = '';
};

const reservationSummary = computed(() => ({
  producto: selectedProduct.value?.name || 'Servicio',
  responsable: form.value.responsibleName,
  direccion: form.value.eventAddress,
  distrito: form.value.district,
  fecha: form.value.eventDate,
  horario: `${form.value.startTime} - ${form.value.endTime}`,
}));

const whatsappUrl = computed(() => {
  const message = [
    'RESERVA SERVICIO',
    `Producto: ${reservationSummary.value.producto}`,
    `Responsable: ${reservationSummary.value.responsable}`,
    `Dirección: ${reservationSummary.value.direccion}`,
    `Distrito: ${reservationSummary.value.distrito}`,
    `Fecha: ${reservationSummary.value.fecha}`,
    `Horario: ${reservationSummary.value.horario}`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
});

function validateForm() {
  const errors = {};

  if (!form.value.responsibleName.trim()) {
    errors.responsibleName = 'Ingresa el nombre del responsable';
  }
  if (!form.value.eventAddress.trim()) {
    errors.eventAddress = 'Ingresa la dirección del evento';
  }
  if (!form.value.district.trim()) {
    errors.district = 'Ingresa el distrito';
  }
  if (!form.value.eventDate) {
    errors.eventDate = 'Selecciona la fecha del evento';
  }
  if (form.value.eventDate && isDateReserved(form.value.eventDate)) {
    errors.eventDate = 'La fecha seleccionada ya no está disponible';
  }
  if (!form.value.startTime) {
    errors.startTime = 'Selecciona la hora de inicio';
  }
  if (!form.value.endTime) {
    errors.endTime = 'Selecciona la hora de fin';
  }
  if (form.value.startTime && form.value.endTime && form.value.endTime <= form.value.startTime) {
    errors.endTime = 'La hora de fin debe ser mayor a la hora de inicio';
  }
  if (!form.value.reservationConfirmed) {
    errors.reservationConfirmed = 'Confirma la reserva para continuar';
  }

  formErrors.value = errors;
  return Object.keys(errors).length === 0;
}

function submitReservation() {
  if (!validateForm() || !selectedProduct.value) return;

  saveReservation(selectedProduct.value.id, form.value.eventDate);
  showConfirmationModal.value = true;
}

onMounted(() => {
  if (state.user?.name) {
    form.value.responsibleName = state.user.name;
  }
});
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main class="page">
    <section class="reservation-wrapper">
      <div class="reservation-card">
        <h1 class="title">Reserva de Servicios</h1>

        <template v-if="!selectedProduct">
          <p class="selected-product">Servicio no encontrado.</p>
        </template>

        <template v-else>
          <p class="selected-product">
            Servicio seleccionado: <strong>{{ selectedProduct.name }}</strong>
          </p>
          <p class="selected-product">
            Precio referencial: <strong>{{ CURRENCY_PREFIX }} {{ selectedPrice.toFixed(2) }}</strong>
          </p>

          <template v-if="!isAuthenticated">
            <div class="warning-panel">
              <p class="warning-message">¿Eres nuevo con nosotros? ¡Contáctanos por WhatsApp para coordinar tu primera reserva!</p>
              <a
                class="whatsapp-cta"
                :href="firstContactWhatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Contactar por WhatsApp
              </a>
              <p class="secondary-text">
                ¿Ya eres cliente?
                <router-link to="/Sign-in">Inicia sesión para reservar directamente</router-link>
              </p>
            </div>
          </template>

          <form v-else class="reservation-form" @submit.prevent="submitReservation">
            <section class="form-section availability-section">
              <h2>📅 Disponibilidad</h2>

              <div class="calendar-card">
                <div class="calendar-header">
                  <button type="button" class="calendar-nav-btn" @click="goToPreviousMonth">◀</button>
                  <p class="calendar-month">{{ calendarMonthLabel }}</p>
                  <button type="button" class="calendar-nav-btn" @click="goToNextMonth">▶</button>
                </div>

                <div class="calendar-weekdays">
                  <span v-for="weekDay in CALENDAR_WEEK_DAYS" :key="weekDay">{{ weekDay }}</span>
                </div>

                <div class="calendar-grid">
                  <template v-for="(day, index) in calendarDays" :key="day?.dateString || `empty-${index}`">
                    <button
                      v-if="day"
                      type="button"
                      class="calendar-day"
                      :class="{
                        'is-past': day.isPast,
                        'is-reserved': day.isReserved,
                        'is-selected': day.isSelected,
                      }"
                      :disabled="!day.isAvailable"
                      @click="selectCalendarDate(day)"
                    >
                      <span>{{ day.dayNumber }}</span>
                      <small v-if="day.isReserved">Reservado</small>
                    </button>
                    <div v-else class="calendar-day is-empty"></div>
                  </template>
                </div>

                <div class="calendar-legend">
                  <span>⚪ Disponible</span>
                  <span>🔴 Reservado</span>
                  <span>🟡 Seleccionado</span>
                  <span>⬛ Pasado</span>
                </div>
              </div>
            </section>

            <section class="form-section">
              <h2>1️⃣ 🎉 Datos del evento</h2>
              <div class="section-grid">
                <div class="field full-width">
                  <label for="responsibleName">Nombre completo del responsable</label>
                  <input id="responsibleName" v-model="form.responsibleName" type="text" placeholder="Ej: Ana Torres" />
                  <p v-if="formErrors.responsibleName" class="error-text">{{ formErrors.responsibleName }}</p>
                </div>

                <div class="field full-width">
                  <label for="eventAddress">Dirección completa del evento</label>
                  <input id="eventAddress" v-model="form.eventAddress" type="text" placeholder="Av./Jr. + referencia" />
                  <p v-if="formErrors.eventAddress" class="error-text">{{ formErrors.eventAddress }}</p>
                </div>

                <div class="field">
                  <label for="district">Distrito</label>
                  <input id="district" v-model="form.district" type="text" placeholder="Ej: San Borja" />
                  <p v-if="formErrors.district" class="error-text">{{ formErrors.district }}</p>
                </div>

                <div class="field">
                  <label for="eventDate">Fecha del evento</label>
                  <input id="eventDate" v-model="form.eventDate" :min="today" type="date" />
                  <p v-if="formErrors.eventDate" class="error-text">{{ formErrors.eventDate }}</p>
                </div>

                <div class="field">
                  <label for="startTime">Horario de inicio</label>
                  <input id="startTime" v-model="form.startTime" type="time" />
                  <p v-if="formErrors.startTime" class="error-text">{{ formErrors.startTime }}</p>
                </div>

                <div class="field">
                  <label for="endTime">Horario de fin</label>
                  <input id="endTime" v-model="form.endTime" type="time" />
                  <p v-if="formErrors.endTime" class="error-text">{{ formErrors.endTime }}</p>
                </div>
              </div>
            </section>

            <section class="form-section">
              <h2>2️⃣ ✅ Confirmación</h2>
              <label class="checkbox-row">
                <input v-model="form.reservationConfirmed" type="checkbox" />
                Confirmo que deseo reservar este servicio en la fecha seleccionada.
              </label>
              <p v-if="formErrors.reservationConfirmed" class="error-text">{{ formErrors.reservationConfirmed }}</p>
            </section>

            <button class="submit-btn" type="submit">✅ Confirmar Reserva</button>
          </form>
        </template>
      </div>
    </section>

    <div v-if="showConfirmationModal" class="modal-overlay" @click.self="showConfirmationModal = false">
      <div class="modal-card">
        <h3>Reserva lista para confirmar</h3>
        <p><strong>Servicio:</strong> {{ reservationSummary.producto }}</p>
        <p><strong>Responsable:</strong> {{ reservationSummary.responsable }}</p>
        <p><strong>Fecha:</strong> {{ reservationSummary.fecha }}</p>
        <p><strong>Horario:</strong> {{ reservationSummary.horario }}</p>
        <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="whatsapp-cta">
          Enviar confirmación por WhatsApp
        </a>
        <button class="secondary-close" @click="showConfirmationModal = false">Cerrar</button>
      </div>
    </div>
  </main>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
.page {
  background: #ffffff;
  min-height: calc(100vh - 130px);
  padding: 24px 14px 42px;
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
}

.reservation-wrapper {
  display: flex;
  justify-content: center;
}

.reservation-card {
  width: 100%;
  max-width: 800px;
  background: #fff;
  border-radius: 16px;
  padding: 24px 16px;
}

.title {
  margin: 0 0 8px;
  font-size: clamp(1.6rem, 2vw + 1rem, 2.2rem);
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.selected-product {
  color: #2D3E94;
  margin: 0 0 16px;
}

.warning-panel {
  background: #fffbea;
  border: 2px solid #FFD200;
  border-radius: 14px;
  padding: 18px;
  color: #7a5f00;
}

.warning-message {
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 0 12px;
}

.secondary-text {
  margin: 14px 0 0;
  color: #2D3E94;
}

.secondary-text a {
  color: #E91E81;
  font-weight: 700;
}

.reservation-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-section {
  border-bottom: 2px solid #f8d3e9;
  padding-bottom: 14px;
}

.availability-section {
  border: 2px solid #E91E81;
  border-radius: 16px;
  padding: 16px;
  background: #fff9fc;
}

.form-section h2 {
  color: #2D3E94;
  margin: 0 0 14px;
  font-size: 1.03rem;
  font-weight: 800;
}

.section-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label,
.checkbox-row {
  color: #2D3E94;
  font-weight: 600;
  font-size: 0.95rem;
}

input,
select {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 12px;
  font-size: 0.95rem;
  font-family: inherit;
}

input:focus,
select:focus {
  outline: none;
  border-color: #E91E81;
}

.checkbox-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.45;
}

.checkbox-row input {
  margin-top: 2px;
}

.error-text {
  margin: 2px 0 0;
  color: #c0144e;
  font-size: 0.83rem;
  font-weight: 600;
}

.calendar-card {
  border: 2px solid #2D3E94;
  border-radius: 14px;
  background: #fff;
  padding: 14px;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.calendar-month {
  margin: 0;
  font-weight: 800;
  color: #2D3E94;
  text-transform: capitalize;
}

.calendar-nav-btn {
  border: 2px solid #E91E81;
  background: #fff;
  color: #E91E81;
  border-radius: 12px;
  width: 38px;
  height: 38px;
  cursor: pointer;
  font-weight: 800;
}

.calendar-weekdays,
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 8px;
}

.calendar-weekdays {
  margin-bottom: 8px;
}

.calendar-weekdays span {
  text-align: center;
  font-weight: 700;
  color: #2D3E94;
  font-size: 0.82rem;
}

.calendar-day {
  min-height: 64px;
  border: 1px solid #d6d6d6;
  border-radius: 12px;
  background: #fff;
  color: #2D3E94;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-weight: 700;
  cursor: pointer;
}

.calendar-day small {
  font-size: 0.65rem;
  font-weight: 700;
  color: #b30f45;
}

.calendar-day:hover:not(:disabled):not(.is-selected) {
  background: #ebffe8;
}

.calendar-day.is-past {
  background: #ececec;
  color: #878787;
  cursor: not-allowed;
}

.calendar-day.is-reserved {
  background: #ffe3ef;
  border-color: #E91E81;
  cursor: not-allowed;
}

.calendar-day.is-selected {
  border: 2px solid #FFD200;
  box-shadow: 0 0 0 2px rgba(255, 210, 0, 0.24);
}

.calendar-day.is-empty {
  border: none;
  background: transparent;
}

.calendar-legend {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: #2D3E94;
  font-size: 0.85rem;
  font-weight: 600;
}

.submit-btn {
  background: #FFD200;
  color: #2D3E94;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255, 210, 0, 0.5);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.submit-btn:hover {
  transform: scale(1.03);
  box-shadow: 0 7px 24px rgba(255, 210, 0, 0.65);
}

.whatsapp-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  background: #25D366;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  border-radius: 12px;
  padding: 12px 14px;
  box-shadow: 0 4px 18px rgba(37, 211, 102, 0.35);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: grid;
  place-items: center;
  z-index: 999;
  padding: 16px;
}

.modal-card {
  background: #fff;
  border-radius: 14px;
  width: 100%;
  max-width: 460px;
  padding: 20px;
  border: 2px solid #E91E81;
}

.modal-card h3 {
  margin-top: 0;
  color: #2D3E94;
}

.secondary-close {
  margin-top: 10px;
  width: 100%;
  border: 2px solid #E91E81;
  background: #fff;
  color: #E91E81;
  border-radius: 10px;
  padding: 10px;
  font-weight: 700;
  cursor: pointer;
}

@media (min-width: 900px) {
  .section-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .full-width {
    grid-column: 1 / -1;
  }

  .reservation-card {
    padding: 28px;
  }
}
</style>
