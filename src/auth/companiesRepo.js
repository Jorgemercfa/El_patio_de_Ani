import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '@/firebase';

const COMPANIES_COLLECTION = 'company';

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

function mapCompany(uid, data, fallbackEmail = '') {
  const normalizedNumericId = Number(data?.id);

  return {
    uid,
    id: Number.isFinite(normalizedNumericId) ? normalizedNumericId : uid,
    name: data?.name || '',
    email: data?.email || fallbackEmail || '',
    products: Array.isArray(data?.products) ? data.products : [],
  };
}

async function getNextCompanyId() {
  const q = query(collection(db, COMPANIES_COLLECTION), orderBy('id', 'desc'), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return 1;

  const maxId = Number(snapshot.docs[0].data()?.id || 0);
  return (Number.isFinite(maxId) ? maxId : 0) + 1;
}

export async function getCompanies() {
  ensureFirebaseReady();
  const snapshot = await getDocs(collection(db, COMPANIES_COLLECTION));
  return snapshot.docs.map((item) => mapCompany(item.id, item.data()));
}

export async function getCompanyByUid(uid) {
  ensureFirebaseReady();
  if (!uid) return null;

  const companyDoc = await getDoc(doc(db, COMPANIES_COLLECTION, uid));
  if (!companyDoc.exists()) return null;
  return mapCompany(uid, companyDoc.data());
}

export async function findCompanyByEmail(email) {
  ensureFirebaseReady();
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;

  const q = query(collection(db, COMPANIES_COLLECTION), where('email', '==', normalizedEmail));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const firstDoc = snapshot.docs[0];
  return mapCompany(firstDoc.id, firstDoc.data(), normalizedEmail);
}

export async function addCompany(companyInput) {
  ensureFirebaseReady();

  const normalizedEmail = normalizeEmail(companyInput?.email);
  if (!normalizedEmail) {
    throw new Error('Debes ingresar un email válido.');
  }

  const signInMethods = await fetchSignInMethodsForEmail(auth, normalizedEmail);
  if (signInMethods.length > 0) {
    throw new Error('Ya existe una empresa registrada con ese email.');
  }

  const credential = await createUserWithEmailAndPassword(
    auth,
    normalizedEmail,
    String(companyInput?.password || ''),
  );

  const uid = credential.user.uid;
  const nextId = await getNextCompanyId();

  const payload = {
    uid,
    id: nextId,
    name: String(companyInput?.name || '').trim(),
    email: normalizedEmail,
    products: [],
  };

  await setDoc(doc(db, COMPANIES_COLLECTION, uid), payload);

  return mapCompany(uid, payload, normalizedEmail);
}

export async function loginCompany({ email, password }) {
  ensureFirebaseReady();

  const normalizedEmail = normalizeEmail(email);
  const credential = await signInWithEmailAndPassword(auth, normalizedEmail, String(password));
  const firebaseUser = credential.user;

  const companyDoc = await getDoc(doc(db, COMPANIES_COLLECTION, firebaseUser.uid));
  if (!companyDoc.exists()) {
    await signOut(auth);
    throw new Error('No existe un perfil de empresa asociado a esta cuenta.');
  }

  return mapCompany(firebaseUser.uid, companyDoc.data(), firebaseUser.email || normalizedEmail);
}

export async function sendCompanyResetPassword(email) {
  ensureFirebaseReady();
  const normalizedEmail = normalizeEmail(email);
  await sendPasswordResetEmail(auth, normalizedEmail);
}
