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
      <div className="flex min-h-[240px] w-full items-center justify-center rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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