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
import type { Session, User } from "@supabase/supabase-js";

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

/** Map a Supabase auth user + DB profile row into our UserProfile shape */
function buildUserProfile(authUser: User, dbRow: Record<string, unknown> | null): UserProfile {
  return {
    id: (dbRow?.id as string) ?? authUser.id,
    supabaseUserId: authUser.id,
    email: authUser.email ?? "",
    name: (dbRow?.name as string) ?? authUser.user_metadata?.full_name ?? authUser.email ?? "",
    givenName: authUser.user_metadata?.given_name,
    familyName: authUser.user_metadata?.family_name,
    picture: (dbRow?.avatar_url as string) ?? authUser.user_metadata?.avatar_url,
    role: (dbRow?.role as UserRole) ?? "viewer",
    permissions: [],
  };
}

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  /** Fetch the matching row from public.users and build UserProfile */
  const syncUserProfile = useCallback(async (authUser: User) => {
    setIsSyncing(true);
    setSyncError(null);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, name, email, role, avatar_url, is_active")
        .eq("auth_user_id", authUser.id)
        .maybeSingle();

      if (error) throw error;
      setUser(buildUserProfile(authUser, data));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load profile";
      setSyncError(msg);
      // Still set a minimal profile so the user isn't locked out
      setUser(buildUserProfile(authUser, null));
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
      if (s?.user) {
        syncUserProfile(s.user).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!mounted) return;
      setSession(s);
      if (s?.user) {
        syncUserProfile(s.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [syncUserProfile]);

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
    if (session?.user) await syncUserProfile(session.user);
  }, [session, syncUserProfile]);

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
