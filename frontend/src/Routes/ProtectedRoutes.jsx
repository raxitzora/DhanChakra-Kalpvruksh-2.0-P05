import { Navigate, Outlet, useLocation } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { useAuth } from "@clerk/clerk-react";

export default function ProtectedRoute({ children }) {
    const location = useLocation();
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return (
        <MainLayout>
            {children ?? <Outlet />}
        </MainLayout>
    );
}