import React, { PropsWithChildren } from "react";
import { useAuth } from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import AccessDenied from "./AccessDenied";

type UserRole = "admin" | "viewer";

export interface AuthorizedRouteProps extends PropsWithChildren {
  allowedRoles?: UserRole[];
  requiredPermission?: { resource: string; action: string };
  deniedMessage?: string;
}

const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({
  children,
  allowedRoles,
  requiredPermission,
  deniedMessage,
}) => {
  const { isAdmin, isViewer, hasPermission } = useAuth();

  const checkRole = (): boolean => {
    if (!allowedRoles || allowedRoles.length === 0) return true;
    if (allowedRoles.includes("admin") && isAdmin()) return true;
    if (allowedRoles.includes("viewer") && isViewer()) return true;
    return false;
  };

  const checkPermission = (): boolean => {
    if (!requiredPermission) return true;
    return hasPermission(requiredPermission.resource, requiredPermission.action);
  };

  return (
    <ProtectedRoute>
      {checkRole() && checkPermission() ? (
        <>{children}</>
      ) : (
        <AccessDenied
          message={
            deniedMessage ??
            (allowedRoles
              ? `This page requires one of the following roles: ${allowedRoles.join(", ")}.`
              : "You do not have permission to access this page.")
          }
        />
      )}
    </ProtectedRoute>
  );
};

export default AuthorizedRoute;
