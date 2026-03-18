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

type UserRole = "admin" | "creator" | "viewer" | "HR-Admin" | "HR-viewer";

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
  isCreator: () => boolean;
  isViewer: () => boolean;
  isHRAdmin: () => boolean;
  isHRViewer: () => boolean;
  refreshAvatar: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Build UserProfile from the JWT claims embedded by custom_access_token_hook.
 * This is zero-latency — no DB round-trip needed on auth state changes.
 * Falls back to user_metadata for fields not yet in the token (e.g. right after signup).
 */
function buildProfileFromSession(session: Session): UserProfile {
  const { user } = session;
  // JWT claims injected by custom_access_token_hook
  const claims = session.access_token
    ? (JSON.parse(atob(session.access_token.split(".")[1])) as Record<string, unknown>)
    : {};

  return {
    id: (claims.profile_id as string) || user.id,
    supabaseUserId: user.id,
    email: user.email ?? "",
    name:
      (claims.full_name as string) ||
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "",
    picture: (claims.avatar_url as string) || user.user_metadata?.avatar_url || "",
    role: ((claims.user_role as UserRole) ?? "viewer"),
    permissions: [],
  };
}

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  /**
   * Refresh profile from DB and force a token refresh so the new JWT claims
   * are picked up. Use this after role changes or profile updates.
   */
  const syncUserProfile = useCallback(async (_authUser?: unknown) => {
    setIsSyncing(true);
    setSyncError(null);
    try {
      // Force token refresh so custom_access_token_hook re-runs with latest DB data
      const { data: { session: fresh }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      if (fresh) {
        setSession(fresh);
        setUser(buildProfileFromSession(fresh));
      }
    } catch (err: unknown) {
      // Fallback: build from current session without DB data
      const msg = err instanceof Error ? err.message : "Failed to refresh profile";
      setSyncError(msg);
      const { data: { session: current } } = await supabase.auth.getSession();
      if (current) setUser(buildProfileFromSession(current));
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Bootstrap: restore session on mount and listen for auth changes
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!mounted) return;
      setSession(s);
      if (s) setUser(buildProfileFromSession(s));
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!mounted) return;
      setSession(s);
      if (s) {
        setUser(buildProfileFromSession(s));
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
  const isCreator = useCallback(
    () => user?.role === "creator" || user?.role === "admin",
    [user]
  );
  const isViewer = useCallback(
    () =>
      user?.role === "viewer" ||
      user?.role === "creator" ||
      user?.role === "admin",
    [user]
  );
  const isHRAdmin = useCallback(
    () => user?.role === "HR-Admin" || user?.role === "admin",
    [user]
  );
  const isHRViewer = useCallback(
    () =>
      user?.role === "HR-viewer" ||
      user?.role === "HR-Admin" ||
      user?.role === "admin",
    [user]
  );

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
      isCreator,
      isViewer,
      isHRAdmin,
      isHRViewer,
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
      isCreator,
      isViewer,
      isHRAdmin,
      isHRViewer,
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
