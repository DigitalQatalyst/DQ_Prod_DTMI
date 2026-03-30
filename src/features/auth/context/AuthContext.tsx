import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useAuthStore, type UserProfile } from "@/store/authStore";

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchUserProfile(authUserId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, role, avatar_url")
    .eq("auth_user_id", authUserId)
    .maybeSingle();

  if (error || !data) return null;
  return {
    id: data.id,
    supabaseUserId: authUserId,
    email: data.email ?? "",
    name: data.name ?? "",
    picture: data.avatar_url ?? "",
    role: (data.role as "admin" | "viewer") ?? "viewer",
  };
}

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const { setUser, setSession, setLoading, clearAuth } = useAuthStore();
  const user = useAuthStore((s) => s.user);
  const session = useAuthStore((s) => s.session);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!mounted) return;
      setSession(s);
      if (s) {
        fetchUserProfile(s.user.id).then((profile) => {
          if (!mounted) return;
          setUser(profile ?? {
            id: s.user.id,
            supabaseUserId: s.user.id,
            email: s.user.email ?? "",
            name: s.user.user_metadata?.full_name ?? "",
            role: "viewer",
          });
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!mounted) return;
      setSession(s);
      if (s) {
        fetchUserProfile(s.user.id).then((profile) => {
          if (mounted) setUser(profile ?? {
            id: s.user.id,
            supabaseUserId: s.user.id,
            email: s.user.email ?? "",
            name: s.user.user_metadata?.full_name ?? "",
            role: "viewer",
          });
        });
      } else {
        clearAuth();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setUser, setSession, setLoading, clearAuth]);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) throw error;
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    clearAuth();
  }, [clearAuth]);

  const isAdmin = useCallback(() => user?.role === "admin", [user]);

  const value = useMemo<AuthContextType>(
    () => ({ user, session, isLoading, login, signup, logout, isAdmin }),
    [user, session, isLoading, login, signup, logout, isAdmin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
