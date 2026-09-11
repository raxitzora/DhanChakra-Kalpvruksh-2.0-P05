import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Transactions from "../Pages/Transactions";
import Inventory from "../Pages/Inventory";
import Suppliers from "../Pages/Suppliers";
import Forecast from "../Pages/Forecast";
import Settings from "../Pages/Settings";
import { Login } from "../Pages/Login";
import Register from "../Pages/Register";
import NotFound from "../Pages/NotFound";
import ProtectedRoute from "./ProtectedRoutes";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/transactions" element={
                <ProtectedRoute>
                    <Transactions />
                </ProtectedRoute>
            } />
            <Route path="/inventory" element={
                <ProtectedRoute>
                    <Inventory />
                </ProtectedRoute>
            } />
            <Route path="/suppliers" element={
                <ProtectedRoute>
                    <Suppliers />
                </ProtectedRoute>
            } />
            <Route path="/forecast" element={
                <ProtectedRoute>
                    <Forecast />
                </ProtectedRoute>
            } />
            <Route path="/settings" element={
                <ProtectedRoute>
                    <Settings />
                </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}