import {
  createUserWithEmailAndPassword,
  deleteUser,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

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

async function cleanupStaleUserRecordByEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return;

  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, normalizedEmail);
    if (signInMethods.length > 0) return;
  } catch (error) {
    if (error?.code === 'auth/invalid-email') return;
    if (error?.code === 'auth/network-request-failed') {
      throw error;
    }
    return;
  }

  const userQuery = query(
    collection(db, USERS_COLLECTION),
    where('email', '==', normalizedEmail),
  );
  const snapshot = await getDocs(userQuery);

  if (snapshot.empty) return;

  await Promise.all(
    snapshot.docs.map(async (userDoc) => {
      try {
        await deleteDoc(doc(db, USERS_COLLECTION, userDoc.id));
      } catch (cleanupError) {
        console.warn('[UsersRepo] No se pudo limpiar un perfil obsoleto:', cleanupError);
      }
    }),
  );
}

function mapUser(uid, data, fallbackEmail = '') {
  return {
    id: uid,
    uid,
    name: data?.name || '',
    lastName: data?.lastName || data?.lastname || '',
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

export async function emailIsAvailable(email) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return false;

  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, normalizedEmail);
    if (signInMethods.length > 0) return false;
  } catch (error) {
    if (error?.code === 'auth/invalid-email') return false;
    if (error?.code === 'auth/network-request-failed') {
      throw error;
    }
  }

  const existingUser = await findUserByEmail(normalizedEmail);
  return !existingUser;
}

export async function addUser({ name, lastName, lastname, email, password }) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = String(password || '');

  if (!normalizedEmail) {
    throw new Error('Debes ingresar un email válido.');
  }
  if (normalizedPassword.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres.');
  }

  try {
    await cleanupStaleUserRecordByEmail(normalizedEmail);

    const signInMethods = await fetchSignInMethodsForEmail(auth, normalizedEmail);
    if (signInMethods.length > 0) {
      throw Object.assign(new Error('Este correo ya está registrado.'), {
        code: 'auth/email-already-in-use',
      });
    }

    const credential = await createUserWithEmailAndPassword(auth, normalizedEmail, normalizedPassword);
    const uid = credential.user.uid;

    const userLastName = String(lastName || lastname || '').trim();

    const payload = {
      uid,
      name: String(name || '').trim(),
      lastName: userLastName,
      email: normalizedEmail,
      products: [],
      children: [],
      loyalty: { ...DEFAULT_LOYALTY },
    };

    await setDoc(doc(db, USERS_COLLECTION, uid), payload);

    try {
      await addDoc(collection(db, 'mail'), {
        to: normalizedEmail,
        message: {
          subject: '¡Bienvenido a El Patio de Ani! 🎉',
          html: `
            <div style="font-family: 'Nunito', sans-serif; max-width: 560px; margin: 0 auto;">
              <h1 style="color: #2D3E94;">¡Hola ${payload.name}! 👋</h1>
              <p>Gracias por crear tu cuenta en <strong>El Patio de Ani</strong>. Ahora eres parte de nuestra familia de eventos infantiles.</p>
              <h2 style="color: #E91E81;">¿Qué puedes hacer con tu cuenta?</h2>
              <ul>
                <li>🥉 <strong>Nivel Bronce</strong> (inicial)</li>
                <li>🥈 <strong>Nivel Plata</strong>: 5% de descuento</li>
                <li>🥇 <strong>Nivel Oro</strong>: 10% de descuento</li>
                <li>💎 <strong>Nivel VIP</strong>: 15% de descuento</li>
              </ul>
              <p>También recibirás recordatorios especiales en los cumpleaños de tus hijos registrados, además de promociones exclusivas.</p>
              <p>¡Nos vemos pronto en tu próximo evento! 🎈</p>
              <p style="color: #2D3E94; font-weight: bold;">El equipo de El Patio de Ani</p>
            </div>
          `,
        },
      });
    } catch (mailError) {
      console.error('[addUser] No se pudo encolar el email de bienvenida:', mailError);
    }

    return mapUser(uid, payload, normalizedEmail);
  } catch (error) {
    if (error?.code === 'auth/email-already-in-use' || error?.code === 'auth/credential-already-in-use') {
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

// ─── ELIMINACIÓN DE CUENTA DE USUARIO ───
export async function deleteAccount() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No hay un usuario autenticado activo.');
  }

  const uid = user.uid;

  try {
    await deleteUser(user);
    await deleteDoc(doc(db, USERS_COLLECTION, uid)).catch((deleteDocError) => {
      console.warn('[UsersRepo] No se pudo borrar el perfil de Firestore:', deleteDocError);
    });
    return true;
  } catch (error) {
    if (error?.code === 'auth/requires-recent-login') {
      throw error;
    }
    throw new Error('No se pudo eliminar la cuenta. Inténtalo nuevamente.');
  }
}
