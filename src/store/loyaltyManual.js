export const NIVELES = [
  { nombre: '🥉 Bronce', minReservas: 0, descuento: 0 },
  { nombre: '🥈 Plata', minReservas: 3, descuento: 5 },
  { nombre: '🥇 Oro', minReservas: 6, descuento: 10 },
  { nombre: '💎 VIP', minReservas: 10, descuento: 15 },
];

const STORAGE_PREFIX = 'patio-loyalty-';
const buildStorageKey = (userId) => `${STORAGE_PREFIX}${userId}`;

const normalizeReservas = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.floor(parsed));
};

const getNivelByReservas = (reservas) => {
  let nivel = NIVELES[0];
  NIVELES.forEach((candidate) => {
    if (reservas >= candidate.minReservas) nivel = candidate;
  });
  return nivel;
};

const buildLoyaltyData = (reservas) => {
  const totalReservas = normalizeReservas(reservas);
  const nivel = getNivelByReservas(totalReservas);
  const currentLevelIndex = NIVELES.findIndex((item) => item.nombre === nivel.nombre);
  const nextLevel = NIVELES[currentLevelIndex + 1] || null;

  return {
    reservas: totalReservas,
    nivel: nivel.nombre,
    descuento: nivel.descuento,
    proximoNivel: nextLevel ? nextLevel.nombre : 'Máximo nivel',
    descuentoProximo: nextLevel ? nextLevel.descuento : 0,
    reservasParaProximo: nextLevel ? Math.max(0, nextLevel.minReservas - totalReservas) : 0,
    cumpleCondiciones: nextLevel && totalReservas >= nextLevel.minReservas,
  };
};

const readLoyaltyReservas = (userId) => {
  if (!userId) return 0;
  try {
    const raw = localStorage.getItem(buildStorageKey(userId));
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    if (typeof parsed === 'number') return normalizeReservas(parsed);
    return normalizeReservas(parsed?.reservas);
  } catch { return 0; }
};

const saveLoyaltyReservas = (userId, reservas) => {
  if (!userId) return;
  localStorage.setItem(buildStorageKey(userId), JSON.stringify({ reservas: normalizeReservas(reservas) }));
};

export function useLoyaltyManual() {
  const getLoyaltyData = (userId) => buildLoyaltyData(readLoyaltyReservas(userId));
  const addReserva = (userId) => { const current = readLoyaltyReservas(userId); const updated = current + 1; saveLoyaltyReservas(userId, updated); return buildLoyaltyData(updated); };
  const getDescuento = (userId) => getLoyaltyData(userId).descuento;
  return { getLoyaltyData, addReserva, getDescuento };
}