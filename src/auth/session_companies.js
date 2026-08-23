import { computed, reactive } from 'vue';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '@/firebase';

const STORAGE_KEY = 'al-toque-session-company';
const COMPANIES_COLLECTION = 'company';

function safeParse(json) {
  if (!json) return null;

  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const initialStored = safeParse(localStorage.getItem(STORAGE_KEY)) || {
  company: null,
};

const state = reactive({
  company: initialStored.company,
  ready: !isFirebaseConfigured,
});

const isCompanyAuthenticated = computed(() => !!state.company);

function persist() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      company: state.company,
    }),
  );
}

function setCompany(company) {
  if (!company) {
    state.company = null;
    persist();
    return;
  }

  const numericId = Number(company.id);

  state.company = {
    uid: company.uid || company.id,
    id: Number.isFinite(numericId) ? numericId : company.uid || company.id,
    name: company.name || '',
    email: company.email || '',
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
        setCompany(null);
        state.ready = true;
        if (!hasResolved) {
          hasResolved = true;
          resolve();
        }
        return;
      }

      try {
        const companyDoc = await getDoc(doc(db, COMPANIES_COLLECTION, firebaseUser.uid));

        if (companyDoc.exists()) {
          const data = companyDoc.data();
          setCompany({
            uid: firebaseUser.uid,
            id: data?.id,
            name: data?.name || '',
            email: data?.email || firebaseUser.email || '',
          });
        } else {
          setCompany(null);
        }
      } catch (error) {
        // ⚠️ Mismo problema que tenía session.js: CUALQUIER error leyendo
        // Firestore acá (corte de red, timeout, etc.) ejecutaba
        // setCompany(null) — deslogueando el panel de admin aunque
        // firebaseUser (ya confirmado arriba por Firebase Auth) siguiera
        // siendo una sesión válida. Para el panel de admin esto es
        // particularmente delicado: un hiccup de red al abrir
        // Orders-company.vue podía sacar a Ani del panel sin que ella
        // hubiera cerrado sesión.
        //
        // Ahora: si ya había una company cargada (del caché de
        // localStorage o de una sincronización previa exitosa) y
        // corresponde a este mismo firebaseUser (comparando por `uid`,
        // que es siempre el string de Firebase Auth — `id` se guarda
        // coaccionado a número y no es comparable directamente), la
        // conservamos en vez de descartarla por un fallo transitorio.
        console.warn('[Session Company] Error sincronizando sesión de empresa:', error);
        const cachedMatchesCurrentCompany = state.company && state.company.uid === firebaseUser.uid;
        if (!cachedMatchesCurrentCompany) {
          setCompany(null);
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

export async function ensureCompanySessionReady() {
  await initAuthListener();
}

export function useSessionCompany() {
  initAuthListener();

  const login = (company) => {
    setCompany(company);
    state.ready = true;
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
      return;
    }

    setCompany(null);
  };

  return {
    state,
    isCompanyAuthenticated,
    ensureReady: ensureCompanySessionReady,
    login,
    logout,
  };
}