import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../state/authState";

/* =========================
   STATE HOOK
========================= */

export const useAuthState = () => {
  return useAuthStore(
    useShallow((state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      error: state.error,
    }))
  );
};

/* =========================
   ACTIONS HOOK
========================= */

export const useAuthActions = () => {
  return useAuthStore(
    useShallow((state) => ({
      login: state.login,
      register: state.register,
      logout: state.logout,
      resetError: state.resetError,
    }))
  );
};

/* =========================
   COMBINED HOOK (OPTIONAL)
========================= */

export const useAuth = () => {
  const state = useAuthState();
  const actions = useAuthActions();

  return {
    ...state,
    ...actions,
  };
};