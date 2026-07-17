<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useSession } from '@/auth/session';
import { fetchCompanyproducts, getCompanyproducts } from '@/auth/companyproductsRepo';
import { useCart } from '@/store/cart.js';
import {
  PREMIUM_INFLABLE_PRICE,
  MAX_GUEST_COUNT,
  WHATSAPP_BUSINESS_NUMBER,
} from '@/constants/inflables';

const route = useRoute();
const router = useRouter();
const { state } = useSession();
const { addToCart } = useCart();
const CURRENCY_PREFIX = 'S/';
const RESERVATIONS_STORAGE_KEY = 'patio-reservas';
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

const inflableType = computed(() => {
  const product = selectedProduct.value;
  if (!product) return 'mediano';

  const sub = (product.subcategory || '').toLowerCase();
  const name = (product.name || '').toLowerCase();
  const ageRange = (product.age_range || '').toLowerCase();

  if (
    sub.includes('bebé') ||
    sub.includes('bebe') ||
    sub.includes('baby') ||
    name.includes('bebé') ||
    name.includes('bebe') ||
    name.includes('baby') ||
    name.includes('cubito') ||
    ageRange.includes('0-2') ||
    ageRange.includes('0-3')
  ) {
    return 'bebes';
  }

  if (sub.includes('grande') || selectedPrice.value > PREMIUM_INFLABLE_PRICE) {
    return 'grande';
  }

  return 'mediano';
});

const requiredSpace = computed(() => {
  if (inflableType.value === 'bebes') return { length: 3, width: 3 };
  if (inflableType.value === 'grande') return { length: 8, width: 6 };
  return { length: 5, width: 4 };
});

const getLocalDate = () => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - timezoneOffset).toISOString().split('T')[0];
};
const today = getLocalDate();
const reservedDates = ref([]);
const initialCalendarDate = new Date();
const currentCalendarDate = ref(
  new Date(initialCalendarDate.getFullYear(), initialCalendarDate.getMonth(), 1),
);

const form = ref({
  responsibleName: state.user?.name || '',
  eventAddress: '',
  district: '',
  eventType: '',
  eventDate: '',
  startTime: '',
  endTime: '',
  electricLogistics: '',
  spaceLength: '',
  spaceWidth: '',
  floorType: '',
  guestCount: '',
  ageRange: '',
  accessConfirmed: false,
  measureVisitChoice: '',
  measureVisitPhone: '',
  waterMode: '',
  waterConnection: '',
  waterDrainType: '',
  waterResponsible: false,
});

const WATER_MODE_LABELS = {
  pelotas: '🎈 Modalidad seca (con pelotitas)',
  agua: '💧 Modalidad con agua',
};

const showElectricityWarning = computed(
  () => form.value.electricLogistics === 'no-electricity',
);

const hasSpaceWarning = computed(() => {
  const length = Number(form.value.spaceLength);
  const width = Number(form.value.spaceWidth);
  if (!length || !width) return false;

  return (
    length < requiredSpace.value.length || width < requiredSpace.value.width
  );
});

const spaceWarningMessage = computed(
  () =>
    `⚠️ Este inflable requiere al menos ${requiredSpace.value.length}m x ${requiredSpace.value.width}m de espacio. Las dimensiones ingresadas podrían no ser suficientes. Confirma con nuestro equipo.`,
);

const floorInfo = computed(() => {
  if (form.value.floorType === 'Césped (Estacas)') {
    return 'Usaremos estacas para fijar el inflable de forma segura.';
  }
  if (form.value.floorType === 'Cemento / Asfalto (Bolsas de arena)') {
    return 'Usaremos bolsas de arena y anclajes especiales para estabilidad.';
  }
  if (form.value.floorType === 'Tierra') {
    return 'Verificaremos compactación del suelo para una instalación segura.';
  }
  if (form.value.floorType === 'Interior (piso duro interior)') {
    return 'Revisaremos altura libre, puertas y protección del piso interior.';
  }
  return 'Selecciona el tipo de suelo para mostrar recomendaciones de instalación.';
});

const ageRecommendation = computed(() => {
  if (inflableType.value === 'bebes') {
    return 'Este inflable es recomendado para niños de 0-3 años';
  }
  if (inflableType.value === 'grande') {
    return 'Recomendado para niños de 4-12 años';
  }
  return 'Recomendado para niños de 2-8 años';
});

const requiresMeasureVisit = computed(() => selectedPrice.value > PREMIUM_INFLABLE_PRICE);

const WATER_INFLABLE_IDS = [8, 9, 10, 14];
const WATER_INFLABLE_NAMES = ['tropical', 'splash', 'lava', 'acuático', 'acuatico'];

const isWaterInflable = computed(() => {
  if (!selectedProduct.value) return false;
  const productId = Number(selectedProduct.value.id);
  if (WATER_INFLABLE_IDS.includes(productId)) return true;
  const productName = (selectedProduct.value.name || '').toLowerCase();
  return WATER_INFLABLE_NAMES.some((keyword) => productName.includes(keyword));
});

const formErrors = ref({});
const showConfirmationModal = ref(false);
const premiumPriceLabel = `${CURRENCY_PREFIX} ${PREMIUM_INFLABLE_PRICE}+`;
const calendarMonthLabel = computed(() => {
  const label = currentCalendarDate.value.toLocaleDateString('es-PE', {
    month: 'long',
    year: 'numeric',
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
});
const reservedDatesSet = computed(() => new Set(reservedDates.value));
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
    const isReserved = reservedDatesSet.value.has(dateString);
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

const formatDateForStorage = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const loadReservedDates = () => {
  try {
    const raw = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
    if (!raw) {
      reservedDates.value = [];
      return;
    }

    const parsed = JSON.parse(raw);
    reservedDates.value = Array.isArray(parsed)
      ? parsed.filter((date) => typeof date === 'string')
      : [];
  } catch {
    reservedDates.value = [];
  }
};

const saveReservationDate = (date) => {
  if (!date) return;

  let storageDates = [];
  try {
    const raw = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    storageDates = Array.isArray(parsed)
      ? parsed.filter((item) => typeof item === 'string')
      : [];
  } catch {
    storageDates = [];
  }

  const updatedDates = Array.from(new Set([...storageDates, date])).sort();
  reservedDates.value = updatedDates;
  localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(updatedDates));
};

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
  producto: selectedProduct.value?.name || 'Inflable',
  responsable: form.value.responsibleName,
  direccion: form.value.eventAddress,
  distrito: form.value.district,
  tipoEvento: form.value.eventType,
  fecha: form.value.eventDate,
  horario: `${form.value.startTime} - ${form.value.endTime}`,
  electrica: form.value.electricLogistics,
  espacio: `${form.value.spaceLength}m x ${form.value.spaceWidth}m`,
  suelo: form.value.floorType,
  invitados: `${form.value.guestCount} niños`,
  edades: form.value.ageRange,
  acceso: form.value.accessConfirmed ? 'Confirmado' : 'No confirmado',
  medida:
    requiresMeasureVisit.value && form.value.measureVisitChoice
      ? form.value.measureVisitChoice
      : 'No aplica',
  telefonoMedida: form.value.measureVisitPhone || 'No indicado',
  modalidadInflable: isWaterInflable.value
    ? WATER_MODE_LABELS[form.value.waterMode] || 'No seleccionado'
    : 'No aplica',
  aguaConexion:
    isWaterInflable.value && form.value.waterMode === 'agua' ? form.value.waterConnection : 'No aplica',
  aguaDrenaje:
    isWaterInflable.value && form.value.waterMode === 'agua' ? form.value.waterDrainType : 'No aplica',
}));

const whatsappUrl = computed(() => {
  const message = [
    'RESERVA INFLABLE',
    `Producto: ${reservationSummary.value.producto}`,
    `Responsable: ${reservationSummary.value.responsable}`,
    `Dirección: ${reservationSummary.value.direccion}`,
    `Distrito: ${reservationSummary.value.distrito}`,
    `Tipo de evento: ${reservationSummary.value.tipoEvento}`,
    `Fecha: ${reservationSummary.value.fecha}`,
    `Horario: ${reservationSummary.value.horario}`,
    `Logística eléctrica: ${reservationSummary.value.electrica}`,
    `Espacio disponible: ${reservationSummary.value.espacio}`,
    `Tipo de suelo: ${reservationSummary.value.suelo}`,
    `Cantidad de niños: ${reservationSummary.value.invitados}`,
    `Rango de edades: ${reservationSummary.value.edades}`,
    `Ruta de acceso: ${reservationSummary.value.acceso}`,
    `Visita de medidas: ${reservationSummary.value.medida}`,
    `Teléfono visita: ${reservationSummary.value.telefonoMedida}`,
    ...(isWaterInflable.value ? [`Modalidad: ${reservationSummary.value.modalidadInflable}`] : []),
    ...(isWaterInflable.value && form.value.waterMode === 'agua' ? [
      `Conexión de agua: ${reservationSummary.value.aguaConexion}`,
      `Tipo de drenaje: ${reservationSummary.value.aguaDrenaje}`,
    ] : []),
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
  if (!form.value.eventType) {
    errors.eventType = 'Selecciona el tipo de evento';
  }
  if (!form.value.eventDate) {
    errors.eventDate = 'Selecciona la fecha del evento';
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
  if (!form.value.electricLogistics) {
    errors.electricLogistics = 'Selecciona una opción de logística eléctrica';
  }
  if (!form.value.spaceLength || Number(form.value.spaceLength) < 1) {
    errors.spaceLength = 'Ingresa un largo válido (mínimo 1m)';
  }
  if (!form.value.spaceWidth || Number(form.value.spaceWidth) < 1) {
    errors.spaceWidth = 'Ingresa un ancho válido (mínimo 1m)';
  }
  if (!form.value.floorType) {
    errors.floorType = 'Selecciona el tipo de suelo';
  }
  if (
    !form.value.guestCount ||
    Number(form.value.guestCount) < 1 ||
    Number(form.value.guestCount) > MAX_GUEST_COUNT
  ) {
    errors.guestCount = `Ingresa una cantidad de niños entre 1 y ${MAX_GUEST_COUNT}`;
  }
  if (!form.value.ageRange.trim()) {
    errors.ageRange = 'Ingresa el rango de edades';
  }
  if (!form.value.accessConfirmed) {
    errors.accessConfirmed = 'Por favor confirma las condiciones de acceso';
  }

  if (requiresMeasureVisit.value && !form.value.measureVisitChoice) {
    errors.measureVisitChoice = 'Selecciona una opción para la toma de medidas';
  }

  if (
    requiresMeasureVisit.value &&
    form.value.measureVisitChoice === 'Sí, quiero coordinar visita de medidas' &&
    !form.value.measureVisitPhone.trim()
  ) {
    errors.measureVisitPhone = 'Ingresa un teléfono de contacto para la visita';
  }

  if (isWaterInflable.value) {
    if (!form.value.waterMode) {
      errors.waterMode = 'Selecciona si prefieres modalidad con pelotitas o con agua';
    }

    if (form.value.waterMode === 'agua') {
      if (!form.value.waterConnection) {
        errors.waterConnection = 'Selecciona el tipo de conexión de agua disponible';
      }
      if (!form.value.waterDrainType) {
        errors.waterDrainType = 'Selecciona cómo se gestionará el agua utilizada';
      }
      if (!form.value.waterResponsible) {
        errors.waterResponsible = 'Debes confirmar la responsabilidad sobre el uso del agua';
      }
    }
  }

  formErrors.value = errors;
  return Object.keys(errors).length === 0;
}

function submitReservation() {
  if (!validateForm() || !selectedProduct.value) return;
  saveReservationDate(form.value.eventDate);
  // Se envía también reservationSummary.value como tercer argumento para que
  // TODO el detalle del formulario (dirección, horario, suelo, agua, etc.)
  // quede guardado junto al item del carrito y no solo la fecha del evento.
  addToCart(selectedProduct.value.id, form.value.eventDate, reservationSummary.value);
  showConfirmationModal.value = true;
}

function goToCart() {
  showConfirmationModal.value = false;
  router.push('/Cart');
}

onMounted(async () => {
  await fetchCompanyproducts();
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  loadReservedDates();
});
</script>

<template>
  <div class="page-wrapper">
    <header>
      <Navbar />
    </header>

    <main class="page">
      <section class="reservation-wrapper">
        <div class="reservation-card">
          <h1 class="title">Reserva de Inflables</h1>

          <p class="selected-product" v-if="selectedProduct">
            Inflable seleccionado: <strong>{{ selectedProduct.name }}</strong>
          </p>

          <!--
            El formulario de reserva se muestra siempre, sin importar si el
            usuario inició sesión o no. Cualquier visitante puede completarlo
            y agregar el inflable al carrito.
          -->
          <form class="reservation-form" @submit.prevent="submitReservation">
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
                  <label for="eventType">Tipo de evento</label>
                  <select id="eventType" v-model="form.eventType">
                    <option value="">Selecciona el tipo de evento</option>
                    <option value="🎂 Cumpleaños">🎂 Cumpleaños</option>
                    <option value="👶 Baby Shower">👶 Baby Shower</option>
                    <option value="🎒 Kermesse Escolar">🎒 Kermesse Escolar</option>
                    <option value="🏢 Evento Empresarial">🏢 Evento Empresarial</option>
                    <option value="🌸 Bautizo / Primera Comunión">🌸 Bautizo / Primera Comunión</option>
                    <option value="🎊 Celebración Familiar">🎊 Celebración Familiar</option>
                    <option value="Otro">Otro</option>
                  </select>
                  <p v-if="formErrors.eventType" class="error-text">{{ formErrors.eventType }}</p>
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
              <h2>2️⃣ ⚡ Logística eléctrica</h2>
              <div class="radios">
                <label><input v-model="form.electricLogistics" type="radio" value="Sí, cuento con toma de corriente estable ✅" /> Sí, cuento con toma de corriente estable ✅</label>
                <label><input v-model="form.electricLogistics" type="radio" value="Sí, cuento con grupo electrógeno ✅" /> Sí, cuento con grupo electrógeno ✅</label>
                <label><input v-model="form.electricLogistics" type="radio" value="no-electricity" /> No cuento con suministro eléctrico ❌</label>
              </div>
              <p v-if="formErrors.electricLogistics" class="error-text">{{ formErrors.electricLogistics }}</p>

              <div v-if="showElectricityWarning" class="alert warning-alert">
                ⚠️ Los inflables requieren conexión eléctrica para funcionar. Sin suministro eléctrico no es posible instalar el servicio. Te recomendamos contactarnos por WhatsApp para evaluar opciones.
              </div>
            </section>

            <section class="form-section">
              <h2>3️⃣ 📐 Dimensiones del espacio</h2>
              <div class="section-grid">
                <div class="field">
                  <label for="spaceLength">Largo disponible (m)</label>
                  <input id="spaceLength" v-model="form.spaceLength" min="1" type="number" placeholder="Ej: 5" />
                  <p v-if="formErrors.spaceLength" class="error-text">{{ formErrors.spaceLength }}</p>
                </div>

                <div class="field">
                  <label for="spaceWidth">Ancho disponible (m)</label>
                  <input id="spaceWidth" v-model="form.spaceWidth" min="1" type="number" placeholder="Ej: 4" />
                  <p v-if="formErrors.spaceWidth" class="error-text">{{ formErrors.spaceWidth }}</p>
                </div>
              </div>

              <div v-if="hasSpaceWarning" class="alert error-alert">
                {{ spaceWarningMessage }}
              </div>
            </section>

            <section class="form-section">
              <h2>4️⃣ 🌱 Tipo de suelo</h2>
              <div class="field full-width">
                <label for="floorType">Tipo de suelo</label>
                <select id="floorType" v-model="form.floorType">
                  <option value="">Selecciona una opción</option>
                  <option value="Césped (Estacas)">Césped (se instala con estacas)</option>
                  <option value="Cemento / Asfalto (Bolsas de arena)">Cemento / Asfalto (se instala con bolsas de arena)</option>
                  <option value="Tierra">Tierra</option>
                  <option value="Interior (piso duro interior)">Interior (piso duro interior)</option>
                </select>
                <p v-if="formErrors.floorType" class="error-text">{{ formErrors.floorType }}</p>
              </div>
              <div class="alert info-alert">{{ floorInfo }}</div>
            </section>

            <!-- SELECCIÓN DE MODALIDAD (solo para inflables acuáticos) -->
            <section v-if="isWaterInflable" class="form-section water-mode-section">
              <h2>💦 Modalidad del inflable</h2>
              <p class="water-mode-intro">
                Este inflable puede funcionar en modalidad seca (con pelotitas) o en modalidad con agua. Selecciona la que prefieras para tu evento:
              </p>
              <div class="radios">
                <label>
                  <input v-model="form.waterMode" type="radio" value="pelotas" />
                  🎈 Modalidad seca (con pelotitas) — no requiere conexión de agua
                </label>
                <label>
                  <input v-model="form.waterMode" type="radio" value="agua" />
                  💧 Modalidad con agua — requiere conexión de agua en el lugar del evento
                </label>
              </div>
              <p v-if="formErrors.waterMode" class="error-text">{{ formErrors.waterMode }}</p>
            </section>

            <!-- SECCIÓN DE AGUA (solo si eligieron modalidad con agua) -->
            <section v-if="isWaterInflable && form.waterMode === 'agua'" class="form-section water-section">
              <h2>💧 Conexiones de Agua</h2>

              <div class="water-banner">
                💧 Elegiste la modalidad con agua. Por favor completa la información sobre las instalaciones disponibles en el lugar del evento.
              </div>

              <div class="field full-width">
                <label>¿Con qué conexión de agua cuentas?</label>
                <div class="radios">
                  <label>
                    <input v-model="form.waterConnection" type="radio" value="si-toma" />
                    🚿 Sí, tengo toma de agua fija (grifo o tubería)
                  </label>
                  <label>
                    <input v-model="form.waterConnection" type="radio" value="si-manguera" />
                    🚰 Sí, tengo manguera de jardín accesible
                  </label>
                  <label>
                    <input v-model="form.waterConnection" type="radio" value="no-agua" />
                    ❌ No cuento con conexión de agua
                  </label>
                </div>
                <p v-if="formErrors.waterConnection" class="error-text">{{ formErrors.waterConnection }}</p>

                <div v-if="form.waterConnection === 'no-agua'" class="alert warning-alert">
                  ⚠️ Sin conexión de agua no es posible instalar este inflable en modalidad acuática. Te recomendamos contactarnos para evaluar alternativas (modalidad seca con pelotitas).
                </div>
              </div>

              <div class="field full-width">
                <label>¿Cómo se gestionará el agua utilizada?</label>
                <div class="radios">
                  <label>
                    <input v-model="form.waterDrainType" type="radio" value="tierra" />
                    🌱 Se absorbe en el jardín / tierra
                  </label>
                  <label>
                    <input v-model="form.waterDrainType" type="radio" value="desague" />
                    🕳️ Hay desagüe cercano disponible
                  </label>
                  <label>
                    <input v-model="form.waterDrainType" type="radio" value="sin-drenaje" />
                    ⚠️ No hay sistema de drenaje disponible
                  </label>
                </div>
                <p v-if="formErrors.waterDrainType" class="error-text">{{ formErrors.waterDrainType }}</p>

                <div v-if="form.waterDrainType === 'sin-drenaje'" class="alert warning-alert">
                  ⚠️ Sin drenaje el agua puede acumularse. Coordinaremos contigo para minimizar el impacto en el espacio.
                </div>
              </div>

              <label class="checkbox-row">
                <input v-model="form.waterResponsible" type="checkbox" />
                Entiendo que soy responsable de proporcionar el acceso al agua y de la gestión del agua utilizada durante el evento.
              </label>
              <p v-if="formErrors.waterResponsible" class="error-text">{{ formErrors.waterResponsible }}</p>
            </section>

            <section class="form-section">
              <h2>5️⃣ 👧 Detalles de los invitados</h2>
              <div class="section-grid">
                <div class="field">
                  <label for="guestCount">Cantidad estimada de niños</label>
                  <input id="guestCount" v-model="form.guestCount" min="1" :max="MAX_GUEST_COUNT" type="number" placeholder="Ej: 20" />
                  <p v-if="formErrors.guestCount" class="error-text">{{ formErrors.guestCount }}</p>
                </div>

                <div class="field">
                  <label for="ageRange">Rango de edades</label>
                  <input id="ageRange" v-model="form.ageRange" type="text" placeholder="ej: 3-8 años" />
                  <p v-if="formErrors.ageRange" class="error-text">{{ formErrors.ageRange }}</p>
                </div>
              </div>
              <div class="alert info-alert">{{ ageRecommendation }}</div>
            </section>

            <section class="form-section">
              <h2>6️⃣ 🚪 Ruta de acceso</h2>
              <label class="checkbox-row">
                <input v-model="form.accessConfirmed" type="checkbox" />
                Confirmo que el camino hacia el área de instalación está libre de escaleras, puertas estrechas y obstáculos que impidan el paso de equipos grandes
              </label>
              <p v-if="formErrors.accessConfirmed" class="error-text">{{ formErrors.accessConfirmed }}</p>
            </section>

            <section class="form-section" v-if="requiresMeasureVisit">
              <h2>7️⃣ 📏 Toma de medidas</h2>
              <div class="alert warning-alert">
                📏 Para inflables premium ({{ premiumPriceLabel }}), recomendamos una visita previa de toma de medidas sin costo. ¿Deseas coordinarla?
              </div>
              <div class="radios">
                <label><input v-model="form.measureVisitChoice" type="radio" value="Sí, quiero coordinar visita de medidas" /> Sí, quiero coordinar visita de medidas</label>
                <label><input v-model="form.measureVisitChoice" type="radio" value="No, confirmo que mi espacio es suficiente" /> No, confirmo que mi espacio es suficiente</label>
              </div>
              <p v-if="formErrors.measureVisitChoice" class="error-text">{{ formErrors.measureVisitChoice }}</p>

              <div class="field" v-if="form.measureVisitChoice === 'Sí, quiero coordinar visita de medidas'">
                <label for="measureVisitPhone">Teléfono de contacto</label>
                <input id="measureVisitPhone" v-model="form.measureVisitPhone" type="tel" placeholder="Ej: 987654321" />
                <p v-if="formErrors.measureVisitPhone" class="error-text">{{ formErrors.measureVisitPhone }}</p>
              </div>
            </section>

            <div class="note">
              <h3>📝 Nota</h3>
              <p>
                Los servicios se alquilan por 5 horas.
              </p>
            </div>

            <button class="submit-btn" type="submit">✅ Confirmar Reserva</button>
          </form>
        </div>
      </section>

      <div v-if="showConfirmationModal" class="modal-overlay" @click.self="showConfirmationModal = false">
        <div class="modal-card">
          <h3>✅ Inflable agregado al carrito</h3>
          <p><strong>Inflable:</strong> {{ reservationSummary.producto }}</p>
          <p><strong>Responsable:</strong> {{ reservationSummary.responsable }}</p>
          <p><strong>Tipo de evento:</strong> {{ reservationSummary.tipoEvento }}</p>
          <p><strong>Fecha:</strong> {{ reservationSummary.fecha }}</p>
          <p><strong>Horario:</strong> {{ reservationSummary.horario }}</p>
          <button class="whatsapp-cta" type="button" @click="goToCart">
            🛒 Ir al carrito de compras
          </button>
          <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="secondary-whatsapp-link">
            Enviar confirmación por WhatsApp
          </a>
          <button class="secondary-close" @click="showConfirmationModal = false">Cerrar</button>
        </div>
      </div>
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
/* Contenedor raíz: fuerza un bloque de flujo normal (block formatting context)
   que NO puede ser interceptado por position:absolute/fixed mal calculado
   de componentes hijos (Navbar/Footer), ni por floats sueltos. */
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative; /* ancla cualquier position:absolute mal usado dentro de Navbar/Footer a ESTE contenedor en vez del body */
  isolation: isolate;  /* crea un nuevo stacking context: nada de afuera puede solaparse encima/debajo por z-index */
}

.page {
  background: #ffffff;
  flex: 1 0 auto; /* el main siempre crece para empujar el footer hacia abajo, sin importar la altura del calendario */
  min-height: 0;
  padding: 24px 14px 42px;
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  overflow: visible; /* evita que contenido dinámico (calendario con filas variables) se recorte o desborde encima del footer */
}

footer {
  flex-shrink: 0; /* el footer nunca se comprime ni se superpone, sin importar cuánto crezca el calendario arriba */
  position: relative;
  z-index: 1;
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

/* Esto evita el auto-zoom de iOS en inputs time al mantener 16px o más en focus. */
.field input[type="time"] {
  font-size: 16px;
  min-height: 48px;
  -webkit-appearance: none;
  appearance: none;
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

.radios {
  display: grid;
  gap: 8px;
}

.radios label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #2D3E94;
}

.alert {
  border-radius: 12px;
  padding: 10px 12px;
  border: 1px solid;
  margin-top: 10px;
  font-size: 0.92rem;
  line-height: 1.5;
}

.error-alert {
  background: #fff0f5;
  border-color: #E91E81;
  color: #c0144e;
}

.warning-alert {
  background: #fffbea;
  border-color: #FFD200;
  color: #7a5f00;
}

.info-alert {
  background: #f0f4ff;
  border-color: #2D3E94;
  color: #1a2d7a;
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
  border: none;
  border-radius: 12px;
  padding: 12px 14px;
  box-shadow: 0 4px 18px rgba(37, 211, 102, 0.35);
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
}

.secondary-whatsapp-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  color: #128C7E;
  font-weight: 700;
  text-decoration: underline;
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

.note{
  background: #f0f4ff;
  border: 1px solid #2D3E94;
  color: #1a2d7a;
  border-radius: 12px;
  padding: 12px;
  margin-top: 14px;
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

@media (min-width: 520px) {
  .section-grid {
    grid-template-columns: 1fr 1fr;
  }

  .full-width {
    grid-column: 1 / -1;
  }
}

@media (max-width: 480px) {
  .calendar-day { min-height: 42px; font-size: 0.8rem; border-radius: 8px; }
  .calendar-day small { font-size: 0.5rem; }
  .calendar-weekdays, .calendar-grid { gap: 3px; }
  .calendar-weekdays span { font-size: 0.7rem; }
}

.water-section {
  border: 2px solid #2D9CDB;
  border-radius: 14px;
  padding: 16px;
  background: #f0f8ff;
}
.water-section h2 {
  color: #1a6b9a !important;
}
.water-banner {
  background: #e0f3ff;
  border: 1px solid #2D9CDB;
  border-radius: 10px;
  padding: 12px 14px;
  color: #1a4d6e;
  font-size: 0.92rem;
  line-height: 1.5;
  margin-bottom: 16px;
}

.water-mode-section {
  border: 2px solid #2D9CDB;
  border-radius: 14px;
  padding: 16px;
  background: #f0f8ff;
}
.water-mode-section h2 {
  color: #1a6b9a !important;
}
.water-mode-intro {
  margin: 0 0 12px;
  color: #1a4d6e;
  font-size: 0.92rem;
  line-height: 1.5;
}
</style>