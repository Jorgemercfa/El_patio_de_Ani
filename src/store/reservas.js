import { ref } from 'vue';
import {
  POPCORN_PRODUCT_IDS,
  POPCORN_MAX_STOCK,
  COMBO_POPCORN_IDS,
  TRAMPOLINE_PRODUCT_IDS,
  TRAMPOLINE_MAX_STOCK,
  RESERVATIONS_SERVICES_KEY,
} from '@/constants/reservas';

const reservasData = ref(null);

const normalizeDates = (value) =>
  Array.isArray(value) ? value.filter((item) => typeof item === 'string') : [];

const normalizeStorageData = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

  const normalized = {};
  Object.entries(value).forEach(([key, dates]) => {
    normalized[key] = normalizeDates(dates);
  });

  return normalized;
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

  function getReservedDates(productId) {
    const all = ensureData();
    const key = String(productId);
    return normalizeDates(all[key]);
  }

  function isDateAvailable(productId, date) {
    if (!date) return false;

    if (POPCORN_PRODUCT_IDS.includes(productId)) {
      const popcornReservations = getReservedDates('popcorn');
      const reservedCount = popcornReservations.filter((item) => item === date).length;
      return reservedCount < POPCORN_MAX_STOCK;
    }

    if (TRAMPOLINE_PRODUCT_IDS.includes(productId)) {
      const trampolineDates = getReservedDates(productId);
      const reservedCount = trampolineDates.filter((item) => item === date).length;
      return reservedCount < TRAMPOLINE_MAX_STOCK;
    }

    const productDates = getReservedDates(productId);
    return !productDates.includes(date);
  }

  function saveReservation(productId, date) {
    if (!date) return;

    const all = { ...ensureData() };
    const productKey = String(productId);
    const popcornKey = 'popcorn';

    if (POPCORN_PRODUCT_IDS.includes(productId) || COMBO_POPCORN_IDS.includes(productId)) {
      const popcornDates = [...normalizeDates(all[popcornKey]), date];
      all[popcornKey] = popcornDates;
    }

    if (TRAMPOLINE_PRODUCT_IDS.includes(productId)) {
      const productDates = normalizeDates(all[productKey]);
      all[productKey] = [...productDates, date].sort();
    } else if (!POPCORN_PRODUCT_IDS.includes(productId)) {
      const productDates = normalizeDates(all[productKey]);
      if (!productDates.includes(date)) {
        all[productKey] = [...productDates, date].sort();
      }
    }

    saveAll(all);
  }

  return {
    getReservedDates,
    isDateAvailable,
    saveReservation,
  };
}
