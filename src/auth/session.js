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
    email: user.email || '',
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
            email: data?.email || firebaseUser.email || '',
          });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
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
