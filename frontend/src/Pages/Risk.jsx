import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";

import { getRiskAnalysis } from "../services/alert.service";

function formatCurrency(amountPaise) {
  return `₹${(amountPaise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getRiskStyles(riskLevel) {
  switch (riskLevel) {
    case "LOW":
      return {
        container: "border-green-200 bg-green-50",
        badge: "bg-green-100 text-green-700",
        text: "text-green-700",
      };

    case "MEDIUM":
      return {
        container: "border-yellow-200 bg-yellow-50",
        badge: "bg-yellow-100 text-yellow-700",
        text: "text-yellow-700",
      };

    case "HIGH":
      return {
        container: "border-orange-200 bg-orange-50",
        badge: "bg-orange-100 text-orange-700",
        text: "text-orange-700",
      };

    case "CRITICAL":
      return {
        container: "border-red-200 bg-red-50",
        badge: "bg-red-100 text-red-700",
        text: "text-red-700",
      };

    default:
      return {
        container: "border-gray-200 bg-gray-50",
        badge: "bg-gray-100 text-gray-700",
        text: "text-gray-700",
      };
  }
}

function Risk() {
  const { getToken } = useAuth();

  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const businessId = localStorage.getItem(
    "selectedBusinessId"
  );

  useEffect(() => {
    async function loadRiskAnalysis() {
      if (!businessId) {
        setError("No business selected.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getRiskAnalysis(
          getToken,
          businessId
        );

        setRisk(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load risk analysis.");
      } finally {
        setLoading(false);
      }
    }

    loadRiskAnalysis();
  }, [businessId, getToken]);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        Loading risk analysis...
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

  if (!risk) {
    return null;
  }

  const styles = getRiskStyles(risk.riskLevel);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Cashflow Risk
        </h1>

        <p className="mt-1 text-gray-500">
          Understand how much cash you can safely spend
          without putting upcoming obligations at risk.
        </p>
      </div>

      {/* Main Safe-to-Spend Card */}
      <div
        className={`rounded-xl border p-6 ${styles.container}`}
      >
        <p className="text-sm font-medium text-gray-600">
          Safe to Spend
        </p>

        <p className="mt-2 text-5xl font-bold">
          {formatCurrency(risk.safeToSpend)}
        </p>

        <p className="mt-3 max-w-2xl text-sm text-gray-600">
          This is the amount currently available to spend
          after accounting for projected cash shortages and
          your safety buffer.
        </p>
      </div>

      {/* Risk Status */}
      <div
        className={`rounded-xl border p-6 ${styles.container}`}
      >
        <div className="flex items-start justify-between gap-4">

          <div>
            <p className="text-sm font-medium text-gray-600">
              Current Risk Level
            </p>

            <h2
              className={`mt-2 text-2xl font-bold ${styles.text}`}
            >
              {risk.riskLevel}
            </h2>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
          >
            {risk.riskLevel}
          </span>

        </div>

        {risk.riskMessage && (
          <p className="mt-4 text-sm text-gray-700">
            {risk.riskMessage}
          </p>
        )}
      </div>

      {/* Risk Details */}
      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm font-medium text-gray-500">
            Safety Buffer
          </p>

          <p className="mt-2 text-2xl font-bold">
            {formatCurrency(risk.safetyBuffer)}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Cash reserved as a 20% safety margin.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm font-medium text-gray-500">
            Minimum Projected Balance
          </p>

          <p
            className={`mt-2 text-2xl font-bold ${
              risk.minimumProjectedBalance < 0
                ? "text-red-600"
                : "text-gray-900"
            }`}
          >
            {formatCurrency(
              risk.minimumProjectedBalance
            )}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Lowest projected cash balance over the next 7 days.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm font-medium text-gray-500">
            Shortage Expected
          </p>

          <p
            className={`mt-2 text-2xl font-bold ${
              risk.shortageExpected
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {risk.shortageExpected
              ? "Yes"
              : "No"}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Whether your projected balance may go below zero.
          </p>
        </div>

      </div>

      {/* Explanation */}
      <div className="rounded-xl border bg-white p-6">

        <h2 className="text-lg font-semibold">
          How your safe-to-spend amount is calculated
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          DhanChakra starts with your currently available
          cash, considers any projected shortage over the
          next 7 days, and keeps a safety buffer before
          determining how much money can safely be spent.
        </p>

        <div className="mt-4 rounded-lg bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-700">
            Safety Buffer
          </p>

          <p className="mt-1 text-sm text-gray-600">
            20% of available cash
          </p>
        </div>

      </div>

    </div>
  );
}

export default Risk;