import { deleteApp, getApps, initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
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

// ─── IMPORTACIÓN DE RUTAS MODULARES REALES ────────────────
import { auth } from '@/firebase/auth';
import { db } from '@/firebase/firestore';
// ──────────────────────────────────────────────────────────

const COMPANIES_COLLECTION = 'company';
const SECONDARY_APP_NAME = 'CompanyCreationApp';

// Eliminamos la dependencia de isFirebaseConfigured para evitar el crash
function ensureFirebaseReady() {
  if (!auth || !db) {
    throw new Error('Firebase no está inicializado correctamente.');
  }
}

// Crea (o reutiliza) una app secundaria de Firebase para dar de alta nuevos
// administradores sin reemplazar la sesión del administrador que ya inició
// sesión.
function getSecondaryAuth() {
  const existingApp = getApps().find((app) => app.name === SECONDARY_APP_NAME);
  const secondaryApp =
    existingApp || initializeApp(auth.app.options, SECONDARY_APP_NAME);
  return getAuth(secondaryApp);
}

async function disposeSecondaryApp() {
  const existingApp = getApps().find((app) => app.name === SECONDARY_APP_NAME);
  if (existingApp) {
    await deleteApp(existingApp).catch((cleanupError) => {
      console.warn(
        '[CompaniesRepo] No se pudo liberar la app secundaria de Auth:',
        cleanupError,
      );
    });
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
  const q = query(
    collection(db, COMPANIES_COLLECTION),
    orderBy('id', 'desc'),
    limit(1),
  );
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

  const q = query(
    collection(db, COMPANIES_COLLECTION),
    where('email', '==', normalizedEmail),
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const firstDoc = snapshot.docs[0];
  return mapCompany(firstDoc.id, firstDoc.data(), normalizedEmail);
}

export async function addCompany(companyInput) {
  ensureFirebaseReady();

  const normalizedEmail = normalizeEmail(companyInput?.email);
  const normalizedPassword = String(companyInput?.password || '');

  if (!normalizedEmail) {
    throw new Error('Debes ingresar un email válido.');
  }
  if (normalizedPassword.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres.');
  }

  const secondaryAuth = getSecondaryAuth();

  try {
    // Registramos en instancia secundaria para no reemplazar sesión principal
    const credential = await createUserWithEmailAndPassword(
      secondaryAuth,
      normalizedEmail,
      normalizedPassword,
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
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Ya existe una empresa registrada con ese email.');
    }
    throw error;
  } finally {
    await disposeSecondaryApp();
  }
}

export async function loginCompany({ email, password }) {
  ensureFirebaseReady();

  const normalizedEmail = normalizeEmail(email);
  const credential = await signInWithEmailAndPassword(
    auth,
    normalizedEmail,
    String(password),
  );
  const firebaseUser = credential.user;

  const companyDoc = await getDoc(doc(db, COMPANIES_COLLECTION, firebaseUser.uid));
  if (!companyDoc.exists()) {
    await signOut(auth);
    throw new Error('No existe un perfil de empresa asociado a esta cuenta.');
  }

  return mapCompany(
    firebaseUser.uid,
    companyDoc.data(),
    firebaseUser.email || normalizedEmail,
  );
}

// Flujo clásico por correo (lo conservamos por compatibilidad)
export async function sendCompanyResetPassword(email) {
  ensureFirebaseReady();
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    throw new Error('Debes ingresar un email válido.');
  }

  await sendPasswordResetEmail(auth, normalizedEmail);
  return true;
}

/**
 * Cambio directo de contraseña por email (sin enviar correo).
 * IMPORTANTE:
 * - Desde frontend con Firebase Auth cliente NO se puede cambiar la contraseña
 *   de otro usuario solo con email.
 * - Esto debe resolverse en backend con Firebase Admin SDK (Cloud Function).
 *
 * Esta función deja la validación y una guía clara de error para que tu vista
 * ya funcione contra esta API y solo te falte conectar backend.
 */
export async function resetCompanyPasswordDirect(email, newPassword) {
  ensureFirebaseReady();

  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = String(newPassword || '');

  if (!normalizedEmail) {
    throw new Error('Debes ingresar un email válido.');
  }

  if (normalizedPassword.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres.');
  }

  const company = await findCompanyByEmail(normalizedEmail);
  if (!company?.uid) {
    throw new Error('No existe una empresa registrada con ese email.');
  }

  throw new Error(
    'Falta implementar backend seguro (Firebase Admin SDK) para cambiar contraseña directamente sin correo.',
  );
}