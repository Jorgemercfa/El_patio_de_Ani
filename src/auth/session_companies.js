import { reactive, computed } from 'vue';

const STORAGE_KEY = 'al-toque-session-company';

/**
 * Convierte JSON de forma segura
 */
function safeParse(json) {
  if (!json) return null;

  try {
    return JSON.parse(json);
  } catch (error) {
    console.warn('Error parsing session data:', error);
    return null;
  }
}

/**
 * Obtener datos iniciales desde localStorage
 */
function loadInitialSession() {
  const stored = safeParse(localStorage.getItem(STORAGE_KEY));

  if (!stored || typeof stored !== 'object') {
    return {
      company: null,
    };
  }

  return {
    company: stored.company || null,
  };
}

const initial = loadInitialSession();

/**
 * Estado reactivo global
 */
const state = reactive({
  company: initial.company,
});

/**
 * Computed para verificar autenticación
 */
const isCompanyAuthenticated = computed(() => !!state.company);

/**
 * Guardar sesión en localStorage
 */
function persist() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        company: state.company,
      }),
    );
  } catch (error) {
    console.warn('Error saving session:', error);
  }
}

/**
 * Composable de sesión
 */
export function useSessionCompany() {
  const login = (company) => {
    if (!company) return;

    state.company = {
      id: company.id ?? null,
      name: company.name ?? '',
      email: company.email ?? '',
    };

    persist();
  };

  const logout = () => {
    state.company = null;

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      persist();
    }
  };

  return {
    state,
    isCompanyAuthenticated,
    login,
    logout,
  };
}
