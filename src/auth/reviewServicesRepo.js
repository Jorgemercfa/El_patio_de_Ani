import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { ref } from 'vue';
import { db, isFirebaseConfigured } from '@/firebase';

// ─── Colección en Firestore ────────────────────────────────────────
const REVIEWS_COLLECTION = 'review';

// ─── Estado reactivo global ────────────────────────────────────────
const reviewsState = ref([]);
const hasLoadedState = ref(false);
const loadingState = ref(false);

// ─── Normalización ─────────────────────────────────────────────────
function normalizeReview(data, docId = '') {
  let dateValue = data?.createdAt;
  
  // Si viene de Firestore como Timestamp, lo transformamos a un objeto Date de JS
  if (dateValue && typeof dateValue.toDate === 'function') {
    dateValue = dateValue.toDate();
  }

  return {
    _docId: docId || data?._docId || '',
    stars: Number(data?.stars ?? 5),
    text: String(data?.text || '').trim(),
    author: String(data?.author || 'Cliente verificado').trim(),
    createdAt: dateValue || null,
  };
}

// ─── LEER reviews desde Firestore ──────────────────────────────────
export async function fetchGlobalReviews(force = false) {
  // Fallback si Firebase no está listo: evita romper la app y retorna array vacío
  if (!isFirebaseConfigured || !db) {
    if (!hasLoadedState.value) {
      reviewsState.value = [];
      hasLoadedState.value = true;
    }
    return reviewsState.value;
  }

  if (loadingState.value) return reviewsState.value;
  if (hasLoadedState.value && !force) return reviewsState.value;

  loadingState.value = true;
  try {
    const q = query(
      collection(db, REVIEWS_COLLECTION),
      orderBy('createdAt', 'desc'), // Trae los testimonios más recientes primero
    );
    const snapshot = await getDocs(q);
    reviewsState.value = snapshot.docs.map((d) => normalizeReview(d.data(), d.id));
    hasLoadedState.value = true;
    return reviewsState.value;
  } catch (error) {
    console.error('[Reviews] Error al traer reseñas desde Firestore:', error);
    throw error;
  } finally {
    loadingState.value = false;
  }
}

export function getGlobalReviews() {
  if (!hasLoadedState.value && !loadingState.value) {
    fetchGlobalReviews().catch((err) =>
      console.warn('[Reviews] Error cargando reseñas globales:', err),
    );
  }
  return reviewsState.value;
}

// ─── AGREGAR review desde panel admin ──────────────────────────────
export async function addGlobalReview({ stars, text, author }) {
  const payload = {
    stars: Number(stars ?? 5),
    text: String(text || '').trim(),
    author: String(author || 'Cliente verificado').trim(),
    createdAt: serverTimestamp(),
  };

  if (!isFirebaseConfigured || !db) {
    const newReview = normalizeReview({ ...payload, createdAt: new Date() });
    reviewsState.value = [newReview, ...reviewsState.value];
    return newReview;
  }

  const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), payload);
  const newReview = normalizeReview({ ...payload, createdAt: new Date() }, docRef.id);
  
  // Lo añadimos al inicio del estado local para que se refleje de inmediato en la UI
  reviewsState.value = [newReview, ...reviewsState.value]; 
  return newReview;
}

// ─── ELIMINAR review desde panel admin ─────────────────────────────
export async function deleteGlobalReview(docId) {
  if (!docId) throw new Error('Se requiere el ID del documento para eliminar.');

  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, REVIEWS_COLLECTION, docId));
  }

  reviewsState.value = reviewsState.value.filter((r) => r._docId !== docId);
}