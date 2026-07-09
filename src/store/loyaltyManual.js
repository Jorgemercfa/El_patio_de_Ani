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

const normalizeNivelIndex = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.min(Math.max(0, Math.floor(parsed)), NIVELES.length - 1);
};

// El nivel MÁXIMO al que un usuario podría aspirar según sus reservas.
// Ya no se usa para asignar el nivel directamente: solo sirve para saber
// hasta dónde tiene derecho a que el admin lo apruebe.
const getNivelElegibleIndex = (reservas) => {
  let index = 0;
  NIVELES.forEach((candidate, i) => {
    if (reservas >= candidate.minReservas) index = i;
  });
  return index;
};

const buildLoyaltyData = (state) => {
  const totalReservas = normalizeReservas(state.reservas);
  const nivelAprobadoIndex = normalizeNivelIndex(state.nivelAprobadoIndex);
  const nivel = NIVELES[nivelAprobadoIndex];
  const nextLevel = NIVELES[nivelAprobadoIndex + 1] || null;
  const nivelElegibleIndex = getNivelElegibleIndex(totalReservas);

  return {
    reservas: totalReservas,
    nivel: nivel.nombre,
    descuento: nivel.descuento,
    proximoNivel: nextLevel ? nextLevel.nombre : 'Máximo nivel',
    descuentoProximo: nextLevel ? nextLevel.descuento : 0,
    reservasParaProximo: nextLevel
      ? Math.max(0, nextLevel.minReservas - totalReservas)
      : 0,
    // true SOLO si el usuario ya juntó suficientes reservas para el
    // siguiente nivel, pero el admin todavía no lo aprobó.
    cumpleCondiciones: Boolean(nextLevel) && nivelElegibleIndex > nivelAprobadoIndex,
  };
};

const readLoyaltyState = (userId) => {
  if (!userId) return { reservas: 0, nivelAprobadoIndex: 0 };

  try {
    const raw = localStorage.getItem(buildStorageKey(userId));
    if (!raw) return { reservas: 0, nivelAprobadoIndex: 0 };

    const parsed = JSON.parse(raw);

    // Compatibilidad con el formato viejo, donde solo se guardaba un número
    // o un objeto { reservas } sin nivelAprobadoIndex.
    if (typeof parsed === 'number') {
      return { reservas: normalizeReservas(parsed), nivelAprobadoIndex: 0 };
    }

    return {
      reservas: normalizeReservas(parsed?.reservas),
      nivelAprobadoIndex: normalizeNivelIndex(parsed?.nivelAprobadoIndex ?? 0),
    };
  } catch {
    return { reservas: 0, nivelAprobadoIndex: 0 };
  }
};

const saveLoyaltyState = (userId, state) => {
  if (!userId) return;
  localStorage.setItem(
    buildStorageKey(userId),
    JSON.stringify({
      reservas: normalizeReservas(state.reservas),
      nivelAprobadoIndex: normalizeNivelIndex(state.nivelAprobadoIndex),
    }),
  );
};

export function useLoyaltyManual() {
  const getLoyaltyData = (userId) => buildLoyaltyData(readLoyaltyState(userId));

  const addReserva = (userId) => {
    const state = readLoyaltyState(userId);
    const updated = { ...state, reservas: state.reservas + 1 };
    saveLoyaltyState(userId, updated);
    return buildLoyaltyData(updated);
  };

  // Ajuste manual del contador de reservas. Pensado para sumar (o corregir)
  // reservas que llegaron solo por mensajería y nunca generaron un pedido
  // dentro de la app, por lo que el conteo automático no las capturó.
  // Recibe el NUEVO total, no un incremento.
  const setReservas = (userId, nuevoTotal) => {
    const state = readLoyaltyState(userId);
    const updated = { ...state, reservas: normalizeReservas(nuevoTotal) };
    saveLoyaltyState(userId, updated);
    return buildLoyaltyData(updated);
  };

  // Sube el nivel aprobado en UNO, solo si el usuario ya tiene reservas
  // suficientes para justificarlo. Devuelve los datos actualizados, o los
  // datos sin cambios si no era elegible (protección extra por si el
  // botón se llega a mostrar en un estado inconsistente).
  const approveNivel = (userId) => {
    const state = readLoyaltyState(userId);
    const nivelElegibleIndex = getNivelElegibleIndex(state.reservas);

    if (nivelElegibleIndex <= state.nivelAprobadoIndex) {
      return buildLoyaltyData(state);
    }

    const updated = { ...state, nivelAprobadoIndex: state.nivelAprobadoIndex + 1 };
    saveLoyaltyState(userId, updated);
    return buildLoyaltyData(updated);
  };

  const getDescuento = (userId) => getLoyaltyData(userId).descuento;

  return {
    getLoyaltyData,
    addReserva,
    setReservas,
    approveNivel,
    getDescuento,
    NIVELES,
  };
}