import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/firebase';

export const NIVELES = [
  { nombre: '🥉 Bronce', minReservas: 0, descuento: 0 },
  { nombre: '🥈 Plata', minReservas: 3, descuento: 5 },
  { nombre: '🥇 Oro', minReservas: 6, descuento: 10 },
  { nombre: '💎 VIP', minReservas: 10, descuento: 15 },
];

const STORAGE_PREFIX = 'patio-loyalty-';
const USERS_COLLECTION = 'user';

const buildStorageKey = (userId) => `${STORAGE_PREFIX}${userId}`;

const normalizeReservas = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.floor(parsed));
};

const normalizeSavedState = (value) => {
  const source = value && typeof value === 'object' ? value : {};
  return {
    reservas: normalizeReservas(source.reservas ?? source.totalReservas ?? 0),
    nivelAprobadoIndex: source.nivelAprobadoIndex ?? source.aprobadoNivel ?? 0,
  };
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
    reservasParaProximo: nextLevel
      ? Math.max(0, nextLevel.minReservas - totalReservas)
      : 0,
    cumpleCondiciones: Boolean(nextLevel) && totalReservas >= nextLevel.minReservas,
  };
};

const readLoyaltyReservas = (userId) => {
  if (!userId) return 0;

  try {
    const raw = localStorage.getItem(buildStorageKey(userId));
    if (!raw) return 0;

    const parsed = JSON.parse(raw);
    if (typeof parsed === 'number') {
      return normalizeReservas(parsed);
    }

    return normalizeReservas(normalizeSavedState(parsed).reservas);
  } catch {
    return 0;
  }
};

const saveLoyaltyReservas = (userId, reservas) => {
  if (!userId) return;

  const normalizedReservasValue = normalizeReservas(reservas);
  const nextState = { reservas: normalizedReservasValue };
  localStorage.setItem(buildStorageKey(userId), JSON.stringify(nextState));

  if (isFirebaseConfigured && db) {
    setDoc(
      doc(db, USERS_COLLECTION, userId),
      {
        loyalty: {
          ...nextState,
          nivelAprobadoIndex: 0,
        },
      },
      { merge: true },
    ).catch((error) => {
      console.warn('[Loyalty] No se pudo sincronizar la lealtad con Firestore:', error);
    });
  }
};

const hydrateLoyaltyStateFromFirestore = async (userId) => {
  if (!userId || !isFirebaseConfigured || !db) return null;

  try {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, userId));
    if (!userDoc.exists()) return null;

    const userLoyalty = userDoc.data()?.loyalty;
    if (!userLoyalty || typeof userLoyalty !== 'object') return null;

    const hydratedState = normalizeSavedState(userLoyalty);
    localStorage.setItem(buildStorageKey(userId), JSON.stringify(hydratedState));
    return hydratedState;
  } catch (error) {
    console.warn('[Loyalty] No se pudo hidratar la lealtad desde Firestore:', error);
    return null;
  }
};

export function useLoyalty() {
  const getLoyaltyData = (userId) => buildLoyaltyData(readLoyaltyReservas(userId));

  const addReserva = (userId) => {
    const currentReservas = readLoyaltyReservas(userId);
    const updatedReservas = currentReservas + 1;
    saveLoyaltyReservas(userId, updatedReservas);
    return buildLoyaltyData(updatedReservas);
  };

  const hydrateUserLoyalty = async (userId) => {
    const hydrated = await hydrateLoyaltyStateFromFirestore(userId);
    if (!hydrated) {
      return { reservas: readLoyaltyReservas(userId) };
    }

    return hydrated;
  };

  const getDescuento = (userId) => getLoyaltyData(userId).descuento;

  return {
    getLoyaltyData,
    addReserva,
    hydrateUserLoyalty,
    getDescuento,
    NIVELES,
  };
}
