import { db, isFirebaseConfigured } from '@/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
//   where,
  orderBy,
} from 'firebase/firestore';

const COLLECTION = 'proms';

/**
 * Obtiene todas las promociones activas ordenadas por `order`.
 * Usada en la vista pública de Promociones y en Home.
 */
export const getActivePromotions = async () => {
  if (!isFirebaseConfigured || !db) return [];
  const q = query(
    collection(db, COLLECTION),
    orderBy('order', 'asc'),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((promo) => promo.active === true);
};

/**
 * Obtiene todas las promociones (activas e inactivas).
 * Usada en el panel admin.
 */
export const getAllPromotions = async () => {
  if (!isFirebaseConfigured || !db) return [];
  const q = query(collection(db, COLLECTION), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Crea una nueva promoción en Firestore.
 * @param {Object} data - Campos: title, description, price, originalPrice, image, deadline, active, order
 */
export const createPromotion = (data) => {
  if (!isFirebaseConfigured || !db) return Promise.reject(new Error('Firebase no configurado'));
  return addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: new Date().toISOString(),
  });
};

/**
 * Actualiza una promoción existente.
 * @param {string} id - ID del documento en Firestore
 * @param {Object} data - Campos a actualizar
 */
export const updatePromotion = (id, data) => {
  if (!isFirebaseConfigured || !db) return Promise.reject(new Error('Firebase no configurado'));
  return updateDoc(doc(db, COLLECTION, id), data);
};

/**
 * Elimina una promoción de Firestore.
 * @param {string} id - ID del documento en Firestore
 */
export const deletePromotion = (id) => {
  if (!isFirebaseConfigured || !db) return Promise.reject(new Error('Firebase no configurado'));
  return deleteDoc(doc(db, COLLECTION, id));
};

/**
 * Activa o desactiva una promoción sin eliminarla.
 * @param {string} id - ID del documento
 * @param {boolean} active - true para activar, false para desactivar
 */
export const togglePromotion = (id, active) => {
  if (!isFirebaseConfigured || !db) return Promise.reject(new Error('Firebase no configurado'));
  return updateDoc(doc(db, COLLECTION, id), { active });
};