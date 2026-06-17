import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';

// ─── RUTAS DE IMPORTACIÓN CORREGIDAS ───
import { auth } from '@/firebase/auth'; 
import { db } from '@/firebase/firestore'; 
// ───────────────────────────────────────

const USERS_COLLECTION = 'user';
const DEFAULT_LOYALTY = {
  reservas: 0,
  nivel: 'bronce',
  descuento: 0,
};

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
  const snapshot = await getDocs(collection(db, USERS_COLLECTION));
  return snapshot.docs.map((item) => mapUser(item.id, item.data()));
}

export async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;

  const q = query(collection(db, USERS_COLLECTION), where('email', '==', normalizedEmail));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const firstDoc = snapshot.docs[0];
  return mapUser(firstDoc.id, firstDoc.data(), normalizedEmail);
}

export async function getUserByUid(uid) {
  if (!uid) return null;

  const userDoc = await getDoc(doc(db, USERS_COLLECTION, uid));
  if (!userDoc.exists()) return null;
  return mapUser(uid, userDoc.data());
}

export async function addUser({ name, email, password }) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = String(password || '');
  
  if (!normalizedEmail) {
    throw new Error('Debes ingresar un email válido.');
  }
  if (normalizedPassword.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres.');
  }

  try {
    const credential = await createUserWithEmailAndPassword(auth, normalizedEmail, normalizedPassword);
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
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este correo ya está registrado.');
    }
    throw error;
  }
}

export async function loginUser({ email, password }) {
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
  const normalizedEmail = normalizeEmail(email);
  await sendPasswordResetEmail(auth, normalizedEmail);
}