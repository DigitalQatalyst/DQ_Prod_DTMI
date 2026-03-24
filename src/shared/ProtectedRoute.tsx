import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Header";

/**
 * Guards routes behind authentication.
 * Unauthenticated users are redirected to /login with a `from` param
 * so they land back on the intended page after signing in.
 */
export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (user) return <>{children}</>;

  return (
    <Navigate
      to={`/login?from=${encodeURIComponent(location.pathname)}`}
      state={{ from: location }}
      replace
    />
  );
};

export default ProtectedRoute;
