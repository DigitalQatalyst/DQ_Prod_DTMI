import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session } from "@supabase/supabase-js";

type UserRole = "admin" | "viewer";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture?: string;
  supabaseUserId?: string;
  role?: UserRole;
}

interface AuthState {
  user: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),
      clearAuth: () => set({ user: null, session: null }),
      isAdmin: () => get().user?.role === "admin",
    }),
    {
      name: "dq-auth",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
