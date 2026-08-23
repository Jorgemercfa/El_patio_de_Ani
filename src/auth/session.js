import { computed, reactive } from 'vue';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '@/firebase';

const STORAGE_KEY = 'al-toque-session';
const USERS_COLLECTION = 'user';

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const initialStored = safeParse(localStorage.getItem(STORAGE_KEY)) || {
  user: null,
};

const state = reactive({
  user: initialStored.user,
  ready: !isFirebaseConfigured,
});

const isAuthenticated = computed(() => !!state.user);

function persist() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      user: state.user,
    }),
  );
}

function setUser(user) {
  if (!user) {
    state.user = null;
    persist();
    return;
  }

  state.user = {
    id: user.id || user.uid,
    uid: user.uid || user.id,
    name: user.name || '',
    lastName: user.lastName || '',
    email: user.email || '',
    children: user.children || [],
  };
  persist();
}

let sessionInitPromise = null;

function initAuthListener() {
  if (sessionInitPromise) return sessionInitPromise;

  if (!isFirebaseConfigured || !auth || !db) {
    state.ready = true;
    sessionInitPromise = Promise.resolve();
    return sessionInitPromise;
  }

  sessionInitPromise = new Promise((resolve) => {
    let hasResolved = false;

    onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        state.ready = true;
        if (!hasResolved) {
          hasResolved = true;
          resolve();
        }
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, USERS_COLLECTION, firebaseUser.uid));

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUser({
            id: firebaseUser.uid,
            uid: firebaseUser.uid,
            name: data?.name || firebaseUser.displayName || '',
            lastName: data?.lastName || '',
            email: data?.email || firebaseUser.email || '',
            children: data?.children || [],
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        // ⚠️ Antes, CUALQUIER error leyendo Firestore acá (corte de red,
        // timeout, reglas de seguridad tardando en propagarse, etc.)
        // ejecutaba setUser(null) — es decir, deslogueaba a la app aunque
        // Firebase Auth (firebaseUser, ya confirmado arriba) siguiera
        // siendo una sesión 100% válida. Esto es justo el tipo de fallo
        // transitorio que puede darse al abrir la app "al día siguiente"
        // con la conexión todavía estabilizándose, y tiene efectos reales:
        // Cart.vue deja de aplicar el descuento de fidelización y
        // addReserva() no se registra (ambos dependen de
        // sessionState.user?.id), y cualquier lógica scoped por usuario
        // (como cart.js) se re-escopea a "invitado" sin que el usuario
        // haya cerrado sesión de verdad.
        //
        // Ahora: si ya había un usuario cargado (del caché de localStorage
        // o de una sincronización previa exitosa) y corresponde a este
        // mismo firebaseUser, lo conservamos — un error transitorio de
        // Firestore no es motivo para desloguear a alguien cuya sesión de
        // Auth sigue siendo válida. Si no había ningún usuario cargado
        // previamente, no hay nada que conservar y sí limpiamos el estado.
        console.warn('[Session] Error sincronizando sesión de usuario:', error);
        const cachedMatchesCurrentUser =
          state.user && (state.user.id === firebaseUser.uid || state.user.uid === firebaseUser.uid);
        if (!cachedMatchesCurrentUser) {
          setUser(null);
        }
      } finally {
        state.ready = true;
        if (!hasResolved) {
          hasResolved = true;
          resolve();
        }
      }
    });
  });

  return sessionInitPromise;
}

export async function ensureUserSessionReady() {
  await initAuthListener();
}

export function useSession() {
  initAuthListener();

  const login = (user) => {
    setUser(user);
    state.ready = true;
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
      return;
    }

    setUser(null);
  };

  return {
    state,
    isAuthenticated,
    ensureReady: ensureUserSessionReady,
    login,
    logout,
  };
}