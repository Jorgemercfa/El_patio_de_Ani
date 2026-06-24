import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { ref } from 'vue';
import { db, isFirebaseConfigured } from '@/firebase';

const REVIEWS_COLLECTION = 'review';

const reviewsState = ref([]);
const hasLoadedState = ref(false);
const loadingState = ref(false);

function normalizeReview(data, docId = '') {
  let dateValue = data?.createdAt;
  if (dateValue && typeof dateValue.toDate === 'function') {
    dateValue = dateValue.toDate();
  }

  return {
    _docId: docId || data?._docId || '',
    stars: data?.stars !== undefined ? Number(data.stars) :
           data?.start !== undefined ? Number(data.start) : 5,
    text: String(data?.text || '').trim(),
    author: String(data?.author || 'Cliente verificado').trim(),
    createdAt: dateValue || null,
  };
}

export async function fetchGlobalReviews(force = false) {
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
    // Sin orderBy: evita el error silencioso cuando los documentos
    // no tienen el campo createdAt (como ocurre en la DB actual)
    const snapshot = await getDocs(collection(db, REVIEWS_COLLECTION));
    const normalized = snapshot.docs.map((d) => normalizeReview(d.data(), d.id));
    // Ordenar en cliente: las que tienen createdAt primero (más recientes),
    // las que no tienen createdAt (documentos viejos) al final
    reviewsState.value = normalized.sort((a, b) => {
      if (!a.createdAt && !b.createdAt) return 0;
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    hasLoadedState.value = true;
    return reviewsState.value;
  } catch (error) {
    console.error('[Reviews] Error al traer reseñas desde Firestore:', error);
    reviewsState.value = [];
    return reviewsState.value;
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
  reviewsState.value = [newReview, ...reviewsState.value];
  return newReview;
}

export async function deleteGlobalReview(docId) {
  if (!docId) throw new Error('Se requiere el ID del documento para eliminar.');

  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, REVIEWS_COLLECTION, docId));
  }

  reviewsState.value = reviewsState.value.filter((r) => r._docId !== docId);
}