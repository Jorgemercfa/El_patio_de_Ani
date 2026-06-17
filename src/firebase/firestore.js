import { db } from './configuration';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

// ─── AGREGAR ESTA EXPORTACIÓN ───
export { db };

export const getAll = (col) => {
  return getDocs(collection(db, col));
};

export const getById = (col, id) => {
  return getDoc(doc(db, col, id));
};

export const create = (col, data) => {
  return addDoc(collection(db, col), data);
};

export const update = (col, id, data) => {
  return updateDoc(doc(db, col, id), data);
};

export const remove = (col, id) => {
  return deleteDoc(doc(db, col, id));
};