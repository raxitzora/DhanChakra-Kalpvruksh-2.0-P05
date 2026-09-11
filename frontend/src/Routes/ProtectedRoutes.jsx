import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@clerk/react";

function ProtectedRoutes() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;