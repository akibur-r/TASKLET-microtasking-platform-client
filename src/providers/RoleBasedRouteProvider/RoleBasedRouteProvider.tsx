import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { useAuth } from "@/hooks/useAuth/useAuth";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

interface RoleBasedRouteProviderProps {
  allowedRoles: ("admin" | "buyer" | "worker" | "default")[];
  children: ReactNode;
}

const RoleBasedRouteProvider = ({
  allowedRoles,
  children,
}: RoleBasedRouteProviderProps) => {
  const { user, loading: authLoading } = useAuth();
  const { dbUser, dbUserLoading } = useDBUser();
  const location = useLocation();

  if (authLoading || dbUserLoading) {
    return (
      <div className="flex justify-center">
        <LoaderSpinner />
      </div>
    );
  }

  if (user?.email && dbUser?.role && allowedRoles.includes(dbUser?.role)) {
    return <>{children}</>;
  }

  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default RoleBasedRouteProvider;
