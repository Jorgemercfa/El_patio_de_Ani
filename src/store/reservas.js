import { ref } from 'vue';
import {
  POPCORN_PRODUCT_IDS,
  POPCORN_MAX_STOCK,
  COMBO_POPCORN_IDS,
  TRAMPOLINE_PRODUCT_IDS,
  TRAMPOLINE_MAX_STOCK,
  RESERVATIONS_SERVICES_KEY,
} from '@/constants/reservas';

// Tiempo que se mantiene "apartada" una fecha mientras el cliente no ha
// confirmado el envío de su reserva por WhatsApp (ni el admin la ha
// validado manualmente desde Orders-company). Pasado este tiempo sin
// confirmación, la fecha vuelve a estar disponible automáticamente para
// otros clientes.
// TODO: idealmente este valor debería vivir en @/constants/reservas.js
// (ej. export const PENDING_HOLD_MINUTES = 120) para configurarlo desde
// un solo lugar junto al resto de constantes de reservas.
const PENDING_HOLD_MINUTES = 120; // 2 horas
const PENDING_HOLD_MS = PENDING_HOLD_MINUTES * 60 * 1000;

export const RESERVATION_STATUS = {
  PENDING: 'pendiente',
  CONFIRMED: 'confirmada',
};

const reservasData = ref(null);

const isPlainObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

// Convierte cualquier entrada guardada (formato viejo: string de fecha
// "2026-07-17"; formato nuevo: objeto { date, status, orderId, createdAt })
// a un registro normalizado. Así los datos que ya tenían guardados los
// clientes con la versión anterior del sistema siguen funcionando.
const normalizeEntry = (entry) => {
  if (typeof entry === 'string') {
    // Dato legado: no existía el concepto de "pendiente", así que se
    // trata como ya confirmado para no perder bloqueos previos.
    return {
      date: entry,
      status: RESERVATION_STATUS.CONFIRMED,
      orderId: null,
      createdAt: 0,
    };
  }

  if (!isPlainObject(entry) || typeof entry.date !== 'string') return null;

  return {
    date: entry.date,
    status: entry.status === RESERVATION_STATUS.CONFIRMED
      ? RESERVATION_STATUS.CONFIRMED
      : RESERVATION_STATUS.PENDING,
    orderId: entry.orderId ?? null,
    createdAt: Number.isFinite(entry.createdAt) ? entry.createdAt : 0,
  };
};

const normalizeEntries = (value) =>
  Array.isArray(value) ? value.map(normalizeEntry).filter(Boolean) : [];

const normalizeStorageData = (value) => {
  if (!isPlainObject(value)) return {};

  const normalized = {};
  Object.entries(value).forEach(([key, entries]) => {
    normalized[key] = normalizeEntries(entries);
  });

  return normalized;
};

const isExpiredPending = (entry) =>
  entry.status === RESERVATION_STATUS.PENDING &&
  entry.createdAt > 0 &&
  Date.now() - entry.createdAt > PENDING_HOLD_MS;

// Una reserva "activa" es la que de verdad debe bloquear la fecha para
// otros clientes: está confirmada, o está pendiente y todavía dentro de
// la ventana de espera (no ha expirado).
const isActive = (entry) => {
  if (entry.status === RESERVATION_STATUS.CONFIRMED) return true;
  return entry.status === RESERVATION_STATUS.PENDING && !isExpiredPending(entry);
};

export function useReservasServicio() {
  function loadAll() {
    if (typeof window === 'undefined') return {};

    try {
      const raw = localStorage.getItem(RESERVATIONS_SERVICES_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      const normalized = normalizeStorageData(parsed);
      reservasData.value = normalized;
      return normalized;
    } catch {
      reservasData.value = {};
      return {};
    }
  }

  function ensureData() {
    if (!reservasData.value) {
      return loadAll();
    }
    return reservasData.value;
  }

  function saveAll(data) {
    const normalized = normalizeStorageData(data);
    reservasData.value = normalized;

    if (typeof window !== 'undefined') {
      localStorage.setItem(RESERVATIONS_SERVICES_KEY, JSON.stringify(normalized));
    }
  }

  // Limpia entradas pendientes ya vencidas (nadie las confirmó a tiempo)
  // para que no queden acumulando espacio ni bloqueando fechas por error.
  function pruneExpired(entries) {
    return entries.filter(
      (entry) => entry.status === RESERVATION_STATUS.CONFIRMED || !isExpiredPending(entry),
    );
  }

  function getEntries(key) {
    const all = ensureData();
    return normalizeEntries(all[key]);
  }

  function getReservedDates(productId) {
    // Se mantiene por compatibilidad: devuelve solo las fechas activas
    // (confirmadas o pendientes vigentes) como array de strings, igual
    // que la versión anterior — así el calendario de Inflable-reserva y
    // Product-item no necesitan tocar más código del que ya usan.
    return getEntries(String(productId))
      .filter(isActive)
      .map((entry) => entry.date);
  }

  function isDateAvailable(productId, date) {
    if (!date) return false;

    if (POPCORN_PRODUCT_IDS.includes(productId)) {
      const popcornReservations = getEntries('popcorn').filter(isActive);
      const reservedCount = popcornReservations.filter((entry) => entry.date === date).length;
      return reservedCount < POPCORN_MAX_STOCK;
    }

    if (TRAMPOLINE_PRODUCT_IDS.includes(productId)) {
      const trampolineDates = getEntries(String(productId)).filter(isActive);
      const reservedCount = trampolineDates.filter((entry) => entry.date === date).length;
      return reservedCount < TRAMPOLINE_MAX_STOCK;
    }

    const productDates = getEntries(String(productId)).filter(isActive);
    return !productDates.some((entry) => entry.date === date);
  }

  // Aparta una fecha en estado PENDIENTE. Debe llamarse cuando el cliente
  // llega al paso real de pago (checkout / envío de WhatsApp en Cart.vue),
  // NO cuando solo llena el formulario de reserva o agrega el producto al
  // carrito. Así, alguien que llena el formulario y nunca continúa no deja
  // la fecha bloqueada para otros clientes.
  //
  // orderId debe ser el mismo id que usa el carrito/pedido, para poder
  // confirmarla o liberarla después desde Orders-company.
  function holdReservation(productId, date, orderId) {
    if (!date || !orderId) return;

    const all = { ...ensureData() };
    const productKey = String(productId);
    const popcornKey = 'popcorn';
    const record = { date, status: RESERVATION_STATUS.PENDING, orderId, createdAt: Date.now() };

    if (POPCORN_PRODUCT_IDS.includes(productId) || COMBO_POPCORN_IDS.includes(productId)) {
      all[popcornKey] = [...pruneExpired(normalizeEntries(all[popcornKey])), record];
    }

    if (TRAMPOLINE_PRODUCT_IDS.includes(productId)) {
      all[productKey] = [...pruneExpired(normalizeEntries(all[productKey])), record];
    } else if (!POPCORN_PRODUCT_IDS.includes(productId)) {
      const existing = pruneExpired(normalizeEntries(all[productKey]));
      if (!existing.some((entry) => entry.date === date && isActive(entry))) {
        all[productKey] = [...existing, record];
      } else {
        all[productKey] = existing;
      }
    }

    saveAll(all);
  }

  // Marca como CONFIRMADA la reserva asociada a un orderId. Se llama desde
  // el panel de administración (Orders-company) cuando Ani recibe y valida
  // el mensaje de WhatsApp del cliente.
  function confirmReservation(orderId) {
    if (!orderId) return;

    const all = { ...ensureData() };
    Object.keys(all).forEach((key) => {
      all[key] = normalizeEntries(all[key]).map((entry) =>
        entry.orderId === orderId ? { ...entry, status: RESERVATION_STATUS.CONFIRMED } : entry,
      );
    });

    saveAll(all);
  }

  // Libera manualmente una reserva (ej. el admin detecta que el cliente
  // nunca confirmó, o se cancela el pedido). Deja la fecha disponible de
  // inmediato para otros clientes.
  function releaseReservation(orderId) {
    if (!orderId) return;

    const all = { ...ensureData() };
    Object.keys(all).forEach((key) => {
      all[key] = normalizeEntries(all[key]).filter((entry) => entry.orderId !== orderId);
    });

    saveAll(all);
  }

  // Se mantiene por compatibilidad: guarda directamente una reserva ya
  // CONFIRMADA, sin pasar por el estado pendiente. Úsalo solo si de
  // verdad quieres bloquear la fecha de inmediato (ej. reservas hechas
  // manualmente por el admin, fuera del flujo normal de carrito).
  function saveReservation(productId, date, orderId = null) {
    if (!date) return;

    const all = { ...ensureData() };
    const productKey = String(productId);
    const popcornKey = 'popcorn';
    const record = { date, status: RESERVATION_STATUS.CONFIRMED, orderId, createdAt: Date.now() };

    if (POPCORN_PRODUCT_IDS.includes(productId) || COMBO_POPCORN_IDS.includes(productId)) {
      all[popcornKey] = [...normalizeEntries(all[popcornKey]), record];
    }

    if (TRAMPOLINE_PRODUCT_IDS.includes(productId)) {
      all[productKey] = [...normalizeEntries(all[productKey]), record];
    } else if (!POPCORN_PRODUCT_IDS.includes(productId)) {
      const existing = normalizeEntries(all[productKey]);
      if (!existing.some((entry) => entry.date === date)) {
        all[productKey] = [...existing, record];
      }
    }

    saveAll(all);
  }

  return {
    getReservedDates,
    isDateAvailable,
    saveReservation,
    holdReservation,
    confirmReservation,
    releaseReservation,
    RESERVATION_STATUS,
  };
}