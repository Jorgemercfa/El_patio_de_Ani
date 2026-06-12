import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '@/firebase';

const USERS_COLLECTION = 'user';
const DEFAULT_LOYALTY = {
  reservas: 0,
  nivel: 'bronce',
  descuento: 0,
};

function ensureFirebaseReady() {
  if (!isFirebaseConfigured || !auth || !db) {
    throw new Error('Firebase no está configurado correctamente.');
  }
}

function normalizeEmail(email) {
  return String(email || '')
    .trim()
    .toLowerCase();
}

function mapUser(uid, data, fallbackEmail = '') {
  return {
    id: uid,
    uid,
    name: data?.name || '',
    email: data?.email || fallbackEmail || '',
    products: Array.isArray(data?.products) ? data.products : [],
    children: Array.isArray(data?.children) ? data.children : [],
    loyalty:
      data?.loyalty && typeof data.loyalty === 'object'
        ? {
            reservas: Number(data.loyalty.reservas || 0),
            nivel: data.loyalty.nivel || 'bronce',
            descuento: Number(data.loyalty.descuento || 0),
          }
        : { ...DEFAULT_LOYALTY },
  };
}

export async function getUsers() {
  ensureFirebaseReady();
  const snapshot = await getDocs(collection(db, USERS_COLLECTION));
  return snapshot.docs.map((item) => mapUser(item.id, item.data()));
}

export async function findUserByEmail(email) {
  ensureFirebaseReady();
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;

  const q = query(collection(db, USERS_COLLECTION), where('email', '==', normalizedEmail));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const firstDoc = snapshot.docs[0];
  return mapUser(firstDoc.id, firstDoc.data(), normalizedEmail);
}

export async function getUserByUid(uid) {
  ensureFirebaseReady();
  if (!uid) return null;

  const userDoc = await getDoc(doc(db, USERS_COLLECTION, uid));
  if (!userDoc.exists()) return null;
  return mapUser(uid, userDoc.data());
}

export async function addUser({ name, email, password }) {
  ensureFirebaseReady();

  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    throw new Error('Debes ingresar un email válido.');
  }

  const signInMethods = await fetchSignInMethodsForEmail(auth, normalizedEmail);
  if (signInMethods.length > 0) {
    throw new Error('Este correo ya está registrado.');
  }

  const credential = await createUserWithEmailAndPassword(auth, normalizedEmail, String(password));
  const uid = credential.user.uid;

  const payload = {
    uid,
    name: String(name || '').trim(),
    email: normalizedEmail,
    products: [],
    children: [],
    loyalty: { ...DEFAULT_LOYALTY },
  };

  await setDoc(doc(db, USERS_COLLECTION, uid), payload);

  return mapUser(uid, payload, normalizedEmail);
}

export async function loginUser({ email, password }) {
  ensureFirebaseReady();

  const normalizedEmail = normalizeEmail(email);
  const credential = await signInWithEmailAndPassword(auth, normalizedEmail, String(password));
  const firebaseUser = credential.user;

  const userDoc = await getDoc(doc(db, USERS_COLLECTION, firebaseUser.uid));
  if (!userDoc.exists()) {
    await signOut(auth);
    throw new Error('No existe un perfil de usuario asociado a esta cuenta.');
  }

  return mapUser(firebaseUser.uid, userDoc.data(), firebaseUser.email || normalizedEmail);
}

export async function sendUserResetPassword(email) {
  ensureFirebaseReady();
  const normalizedEmail = normalizeEmail(email);
  await sendPasswordResetEmail(auth, normalizedEmail);
}
