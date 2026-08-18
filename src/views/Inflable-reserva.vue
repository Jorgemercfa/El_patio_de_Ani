<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
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

function scrollToFirstError(errors) {
  if (!errors || Object.keys(errors).length === 0) return;
  const map = {
    responsibleName: 'responsibleName',
    eventAddress: 'eventAddress',
    district: 'district',
    eventDate: 'eventDate',
    startTime: 'startTime',
    endTime: 'endTime',
    spaceLength: 'spaceLength',
    spaceWidth: 'spaceWidth',
    floorType: 'floorType',
    guestCount: 'guestCount',
    ageRange: 'ageRange',
    measureVisitPhone: 'measureVisitPhone',
  };

  const firstKey = Object.keys(errors).find((k) => !!map[k]);
  if (!firstKey) return;
  const id = map[firstKey];
  nextTick(() => {
    const el = document.getElementById(id);
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      try { el.focus?.(); } catch (e) {}
    }
  });
}

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
  const ok = Object.keys(errors).length === 0;
  if (!ok) scrollToFirstError(errors);
  return ok;
}

function submitReservation() {
  if (!validateForm() || !selectedProduct.value) return;
  saveReservationDate(form.value.eventDate);
  addToCart(selectedProduct.value.id, form.value.eventDate, reservationSummary.value);
  showConfirmationModal.value = true;
}

function goToCart() {
  showConfirmationModal.value = false;
  router.push('/Cart');
}

onMounted(async () => {
  await fetchCompanyproducts();
  // Forzamos scroll al top y repetimos tras el render dinámico.
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  setTimeout(() => window.scrollTo(0, 0), 80);
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
