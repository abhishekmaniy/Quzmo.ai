import { HttpMethod } from "@/core/network";
import { httpClient } from "@/core/network/httpClient";
import { asyncHandler } from "@/core/store/asyncHandler";
import { createAppStore } from "@/core/store/createStore";
import type { StateCreator } from "zustand";

/* =========================
   API TYPES
========================= */

export type User = {
  id: string;
  email: string;
  name: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

/* =========================
   STORE STATE
========================= */

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  resetError: () => void;
};

/* =========================
   STORE IMPLEMENTATION
========================= */

const authStoreCreator: StateCreator<AuthState, [], []> = (set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (payload) => {
    await asyncHandler<AuthState, Partial<AuthState>>(
      set,
      async () => {
        const res = await httpClient<User, LoginPayload>({
          url: "/auth/login",
          method: HttpMethod.POST,
          body: payload,
        });

        return {
          user: res.data,
          isAuthenticated: true,
        };
      },
      { throwError: true }
    );
  },

  register: async (payload) => {
    await asyncHandler<AuthState, Partial<AuthState>>(
      set,
      async () => {
        const res = await httpClient<User, RegisterPayload>({
          url: "/auth/register",
          method: HttpMethod.POST,
          body: payload,
        });

        return {
          user: res.data,
          isAuthenticated: true,
        };
      },
      { throwError: true }
    );
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  resetError: () => {
    set({ error: null });
  },
});

export const useAuthStore = createAppStore<AuthState>(authStoreCreator, {
  name: "auth-store",
  persist: true,
});