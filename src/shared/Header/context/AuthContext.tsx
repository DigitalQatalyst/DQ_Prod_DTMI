import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { supabase } from "../../../lib/supabase";
import type { Session } from "@supabase/supabase-js";

type UserRole = "admin" | "viewer";

interface Permission {
  resource: string;
  action: string;
  can_perform: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
  supabaseUserId?: string;
  role?: UserRole;
  permissions?: Permission[];
  isNewUser?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isSyncing: boolean;
  syncError: string | null;
  login: (email?: string, password?: string) => Promise<void>;
  signup: (email?: string, password?: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (resource: string, action: string) => boolean;
  isAdmin: () => boolean;
  isViewer: () => boolean;
  refreshAvatar: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Fetch the user's profile row from public.users.
 * Simple and direct — no JWT hook needed.
 */
async function fetchUserProfile(authUserId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, role, avatar_url, is_active")
    .eq("auth_user_id", authUserId)
    .maybeSingle();

  if (error || !data) return null;
  return {
    id: data.id,
    supabaseUserId: authUserId,
    email: data.email ?? "",
    name: data.name ?? "",
    picture: data.avatar_url ?? "",
    role: (data.role as UserRole) ?? "viewer",
    permissions: [],
  };
}

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  /** Fetch fresh profile from DB. Call this after role/profile updates. */
  const syncUserProfile = useCallback(async (_authUser?: unknown) => {
    setIsSyncing(true);
    setSyncError(null);
    try {
      const { data: { session: s } } = await supabase.auth.getSession();
      if (!s) return;
      const profile = await fetchUserProfile(s.user.id);
      if (profile) setUser(profile);
    } catch (err: unknown) {
      setSyncError(err instanceof Error ? err.message : "Failed to refresh profile");
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Bootstrap: restore session on mount and listen for auth changes
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      if (!mounted) return;
      setSession(s);
      if (s) {
        const profile = await fetchUserProfile(s.user.id);
        if (mounted) setUser(profile ?? { id: s.user.id, supabaseUserId: s.user.id, email: s.user.email ?? "", name: s.user.user_metadata?.full_name ?? "", role: "viewer", permissions: [] });
      }
      if (mounted) setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, s) => {
      if (!mounted) return;
      setSession(s);
      if (s) {
        const profile = await fetchUserProfile(s.user.id);
        if (mounted) setUser(profile ?? { id: s.user.id, supabaseUserId: s.user.id, email: s.user.email ?? "", name: s.user.user_metadata?.full_name ?? "", role: "viewer", permissions: [] });
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email?: string, password?: string) => {
    if (!email || !password) {
      console.warn("[Auth] login() requires email and password");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signup = useCallback(async (email?: string, password?: string, name?: string) => {
    if (!email || !password) {
      console.warn("[Auth] signup() requires email and password");
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) throw error;
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }, []);

  const hasPermission = useCallback(
    (resource: string, action: string): boolean => {
      if (!user?.permissions) return false;
      return user.permissions.some(
        (p) => p.resource === resource && p.action === action && p.can_perform
      );
    },
    [user]
  );

  const isAdmin = useCallback(() => user?.role === "admin", [user]);
  const isViewer = useCallback(() => user?.role === "viewer" || user?.role === "admin", [user]);

  const refreshAvatar = useCallback(async () => {
    await syncUserProfile();
  }, [syncUserProfile]);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      session,
      isLoading,
      isSyncing,
      syncError,
      login,
      signup,
      logout,
      hasPermission,
      isAdmin,
      isViewer,
      refreshAvatar,
    }),
    [
      user,
      session,
      isLoading,
      isSyncing,
      syncError,
      login,
      signup,
      logout,
      hasPermission,
      isAdmin,
      isViewer,
      refreshAvatar,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { supabase } from "../../../lib/supabase";
