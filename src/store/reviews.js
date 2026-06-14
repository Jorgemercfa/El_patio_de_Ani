import { ref } from 'vue';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/firebase';

const REVIEWS_COLLECTION = 'reviews';
const reviewsCache = ref({});  // { [productId]: Review[] }

export function useReviews() {
  async function fetchReviews(productId) {
    if (!isFirebaseConfigured || !db) return [];

    const productIdNum = Number(productId);
    const q = query(
      collection(db, REVIEWS_COLLECTION),
      where('productId', '==', productIdNum),
      orderBy('createdAt', 'desc'),
    );

    try {
      const snapshot = await getDocs(q);
      const reviews = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      reviewsCache.value[productIdNum] = reviews;
      return reviews;
    } catch (err) {
      console.warn('[Reviews] Error cargando reseñas:', err);
      return [];
    }
  }

  async function addReview(productId, userId, userName, rating, comment) {
    if (!isFirebaseConfigured || !db) return null;

    const payload = {
      productId: Number(productId),
      userId: String(userId),
      userName: String(userName),
      rating: Number(rating),
      comment: String(comment).trim(),
      createdAt: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), payload);
      const newReview = { id: docRef.id, ...payload };

      const pid = Number(productId);
      if (reviewsCache.value[pid]) {
        reviewsCache.value[pid] = [newReview, ...reviewsCache.value[pid]];
      } else {
        reviewsCache.value[pid] = [newReview];
      }

      return newReview;
    } catch (err) {
      console.warn('[Reviews] Error guardando reseña:', err);
      throw err;
    }
  }

  function getAverageRating(productId) {
    const reviews = reviewsCache.value[Number(productId)] || [];
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
    return (sum / reviews.length).toFixed(1);
  }

  return { fetchReviews, addReview, getAverageRating, reviewsCache };
}
