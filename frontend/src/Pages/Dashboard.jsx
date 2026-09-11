import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";

import CashSummary from "../Components/Dashboard/CashSummary";
import CashflowOverview from "../Components/Dashboard/CashflowOverview";
import WorkingCapitalCard from "../Components/Dashboard/WorkingCapitalCard";
import SafeToSpendCard from "../Components/Dashboard/SafeToSpendCard";
import RiskAlert from "../Components/Dashboard/RiskAlert";
import ForecastChart from "../Components/Dashboard/ForecastChart";

import { getDashboard } from "../services/dashboard.service";

function Dashboard() {
  const { getToken } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const businessId = localStorage.getItem(
    "selectedBusinessId"
  );

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const response = await getDashboard(
        getToken,
        businessId
      );

      setDashboard(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!businessId) {
      setLoading(false);
      setError("No business selected.");
      return;
    }

    loadDashboard();
  }, [businessId]);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          {dashboard.business.name}
        </p>
      </div>

      {/* Cash Available */}
      <CashSummary
        cashflow={dashboard.cashflow}
      />

      {/* Cashflow Overview */}
      <CashflowOverview
        cashflow={dashboard.cashflow}
      />

      {/* Working Capital + Safe to Spend */}
      <div className="grid gap-6 lg:grid-cols-2">
        <WorkingCapitalCard
          workingCapital={
            dashboard.workingCapital
          }
        />

        <SafeToSpendCard
          alert={dashboard.risk}
        />
      </div>

      {/* Risk */}
      <RiskAlert
        alert={dashboard.risk}
      />

      {/* Forecast */}
      <ForecastChart
        forecast={dashboard.forecast}
      />
    </div>
  );
}

export default Dashboard;