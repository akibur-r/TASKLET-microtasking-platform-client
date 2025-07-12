import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { useAuth } from "@/hooks/useAuth/useAuth";
import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

interface PrivateRouteProviderProps {
  children: ReactNode;
}

const PrivateRouteProvider = ({ children }: PrivateRouteProviderProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoaderSpinner />;
  }

  if (user?.email) {
    return <>{children}</>;
  }

  return <Navigate to="/auth/login" state={{ from: location }} />;
};

export default PrivateRouteProvider;
