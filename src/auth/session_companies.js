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
      } catch {
        setCompany(null);
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
