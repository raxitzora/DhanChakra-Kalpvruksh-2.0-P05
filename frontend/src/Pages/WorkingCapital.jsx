import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";

import { getWorkingCapital } from "../services/workingCapital.service";

function formatCurrency(amountPaise) {
  return `₹${(amountPaise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function WorkingCapital() {
  const { getToken } = useAuth();

  const [workingCapital, setWorkingCapital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const businessId = localStorage.getItem("selectedBusinessId");

  useEffect(() => {
    async function loadWorkingCapital() {
      if (!businessId) {
        setError("No business selected.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getWorkingCapital(
          getToken,
          businessId
        );

        setWorkingCapital(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load working capital.");
      } finally {
        setLoading(false);
      }
    }

    loadWorkingCapital();
  }, [businessId, getToken]);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        Loading working capital...
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

  if (!workingCapital) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Working Capital</h1>
        <p className="mt-1 text-gray-500">
          Understand how much of your cash is committed to running the business.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm font-medium text-gray-500">
            Stock Expenses
          </p>

          <p className="mt-2 text-3xl font-bold">
            {formatCurrency(workingCapital.workingCapitalCommitted)}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Money spent on stock and inventory.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm font-medium text-gray-500">
            Uncommitted Cash
          </p>

          <p className="mt-2 text-3xl font-bold">
            {formatCurrency(workingCapital.uncommittedCash)}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Cash not currently committed to stock expenses.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm font-medium text-gray-500">
            Working Capital Position
          </p>

          <p className="mt-2 text-3xl font-bold">
            {formatCurrency(workingCapital.workingCapitalPosition)}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Current cash position after considering incoming and outgoing cash.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="text-lg font-semibold">
          What this means
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Working capital shows how much money is tied up in keeping
          your business operating. Higher stock expenses mean more
          cash is committed to inventory and may not be immediately
          available for other business needs.
        </p>
      </div>
    </div>
  );
}

export default WorkingCapital;