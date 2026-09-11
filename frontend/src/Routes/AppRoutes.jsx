import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import BusinessSetup from "../Pages/BusinessSetup";
import Transactions from "../Pages/Transactions";
import Payables from "../Pages/Payables";
import Receivables from "../Pages/Receivables";
import WorkingCapital from "../Pages/WorkingCapital";
import Forecast from "../Pages/Forecast";
import Risk from "../Pages/Risk";

import ProtectedRoutes from "./ProtectedRoutes";
import MainLayout from "../Layout/MainLayout";
import AIChatTest from "../Pages/AIChatTest";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>

          {/* Business setup stays outside the main application layout */}
          <Route
            path="/business-setup"
            element={<BusinessSetup />}
          />

          {/* Main application layout */}
          <Route element={<MainLayout />}>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/transactions"
              element={<Transactions />}
            />

            <Route
              path="/payables"
              element={<Payables />}
            />

            <Route
              path="/receivables"
              element={<Receivables />}
            />

            <Route
              path="/working-capital"
              element={<WorkingCapital />}
            />

            <Route
              path="/forecast"
              element={<Forecast />}
            />

              <Route
    path="/risk"
    element={<Risk />}
  />

<Route
  path="/ai-chat-test"
  element={<AIChatTest />}
/>
          </Route>

        </Route>

        {/* Unknown route */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;