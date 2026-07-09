export const NIVELES = [
  { nombre: '🥉 Bronce', minReservas: 0, descuento: 0, minDescuentoProximo: 5 },
  { nombre: '🥈 Plata', minReservas: 3, descuento: 5, minDescuentoProximo: 10 },
  { nombre: '🥇 Oro', minReservas: 6, descuento: 10, minDescuentoProximo: 15 },
  { nombre: '💎 VIP', minReservas: 10, descuento: 15, minDescuentoProximo: 0 },
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
    if (reservas >= candidate.minReservas) {
      nivel = candidate;
    }
  });
  return nivel;
};

const buildLoyaltyData = (reservas, nivelAprobado = null) => {
  const totalReservas = normalizeReservas(reservas);
  let nivelActual = nivelAprobado ? NIVELES.find(n => n.nombre === nivelAprobado) : getNivelByReservas(totalReservas);
  if (!nivelActual) nivelActual = NIVELES[0];
  
  const currentLevelIndex = NIVELES.findIndex((item) => item.nombre === nivelActual.nombre);
  const nextLevel = NIVELES[currentLevelIndex + 1] || null;

  return {
    reservas: totalReservas,
    nivelActual: nivelActual.nombre,
    descuentoActual: nivelActual.descuento,
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
  const getLoyaltyData = (userId, nivelAprobado = null) => buildLoyaltyData(readLoyaltyReservas(userId), nivelAprobado);
  const addReserva = (userId) => { const currentReservas = readLoyaltyReservas(userId); const updatedReservas = currentReservas + 1; saveLoyaltyReservas(userId, updatedReservas); return buildLoyaltyData(updatedReservas); };
  const getDescuento = (userId, nivelAprobado = null) => getLoyaltyData(userId, nivelAprobado).descuentoActual;
  const getReservas = (userId) => readLoyaltyReservas(userId);
  return { getLoyaltyData, addReserva, getDescuento, getReservas, NIVELES };
}