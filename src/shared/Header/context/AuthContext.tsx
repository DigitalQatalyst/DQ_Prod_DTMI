import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

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
  isLoading: boolean;
  isSyncing: boolean;
  syncError: string | null;
  login: () => void;
  signup: () => void;
  logout: () => void;
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
 * Stub AuthProvider — Azure B2C removed, Supabase auth to be implemented.
 * All auth methods are no-ops; user is always null until Supabase is wired up.
 */
export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user] = useState<UserProfile | null>(null);

  const login = useCallback(() => {
    console.log("[Auth] login() called — Supabase auth not yet implemented");
  }, []);

  const signup = useCallback(() => {
    console.log("[Auth] signup() called — Supabase auth not yet implemented");
  }, []);

  const logout = useCallback(() => {
    console.log("[Auth] logout() called — Supabase auth not yet implemented");
  }, []);

  const hasPermission = useCallback(
    (_resource: string, _action: string): boolean => false,
    []
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

  const refreshAvatar = useCallback(async () => {}, []);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading: false,
      isSyncing: false,
      syncError: null,
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
