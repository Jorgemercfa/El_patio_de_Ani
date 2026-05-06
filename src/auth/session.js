import { reactive, computed } from 'vue';

const STORAGE_KEY = 'al-toque-session';

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const initial = safeParse(localStorage.getItem(STORAGE_KEY)) || {
  user: null,
};

const state = reactive({
  user: initial.user,
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

export function useSession() {
  const login = (user) => {
    state.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    persist();
  };

  const logout = () => {
    state.user = null;
    persist();
  };

  return {
    state,
    isAuthenticated,
    login,
    logout,
  };
}
