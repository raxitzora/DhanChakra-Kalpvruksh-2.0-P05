import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";

import { getForecast } from "../services/forecast.service";

function formatCurrency(amountPaise) {
  return `₹${(amountPaise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function Forecast() {
  const { getToken } = useAuth();

  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const businessId = localStorage.getItem(
    "selectedBusinessId"
  );

  useEffect(() => {
    async function loadForecast() {
      if (!businessId) {
        setError("No business selected.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getForecast(
          getToken,
          businessId,
          7
        );

        setForecast(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load forecast.");
      } finally {
        setLoading(false);
      }
    }

    loadForecast();
  }, [businessId, getToken]);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        Loading forecast...
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

  if (!forecast) {
    return null;
  }

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Cash Forecast
        </h1>

        <p className="mt-1 text-gray-500">
          See how your cash position is expected to
          change over the next {forecast.numberOfDays} days.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">

        {/* Starting Cash */}
        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm font-medium text-gray-500">
            Starting Cash
          </p>

          <p className="mt-2 text-3xl font-bold">
            {formatCurrency(
              forecast.startingCash
            )}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Cash available at the beginning of the forecast.
          </p>
        </div>

        {/* Minimum Projected Balance */}
        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm font-medium text-gray-500">
            Minimum Projected Balance
          </p>

          <p className="mt-2 text-3xl font-bold">
            {formatCurrency(
              forecast.minimumProjectedBalance
            )}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Lowest expected cash balance during the forecast.
          </p>
        </div>

        {/* Shortage */}
        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm font-medium text-gray-500">
            Shortage Expected
          </p>

          <p
            className={`mt-2 text-3xl font-bold ${
              forecast.shortageExpected
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {forecast.shortageExpected
              ? "Yes"
              : "No"}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Whether projected cash goes below zero.
          </p>
        </div>

      </div>

      {/* Daily Forecast */}
      <div className="rounded-xl border bg-white p-6">

        <div>
          <h2 className="text-lg font-semibold">
            Daily Cash Forecast
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Expected incoming, outgoing and projected
            balance for each day.
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead className="border-b text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">
                  Date
                </th>

                <th className="px-4 py-3 font-medium">
                  Opening Balance
                </th>

                <th className="px-4 py-3 font-medium">
                  Incoming
                </th>

                <th className="px-4 py-3 font-medium">
                  Outgoing
                </th>

                <th className="px-4 py-3 font-medium">
                  Projected Balance
                </th>
              </tr>
            </thead>

            <tbody>

              {forecast.forecast.map((day) => (
                <tr
                  key={day.date}
                  className="border-b last:border-b-0"
                >

                  <td className="px-4 py-4 font-medium">
                    {formatDate(day.date)}
                  </td>

                  <td className="px-4 py-4">
                    {formatCurrency(
                      day.openingBalance
                    )}
                  </td>

                  <td className="px-4 py-4 text-green-600">
                    +{formatCurrency(day.incoming)}
                  </td>

                  <td className="px-4 py-4 text-red-600">
                    -{formatCurrency(day.outgoing)}
                  </td>

                  <td
                    className={`px-4 py-4 font-semibold ${
                      day.projectedBalance < 0
                        ? "text-red-600"
                        : "text-gray-900"
                    }`}
                  >
                    {formatCurrency(
                      day.projectedBalance
                    )}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      </div>

      {/* Forecast Explanation */}
      <div className="rounded-xl border bg-white p-6">

        <h2 className="text-lg font-semibold">
          How the forecast works
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          The forecast starts with your currently available
          cash and adjusts it for expected incoming and
          outgoing payments over the forecast period.
        </p>

        <div className="mt-4 rounded-lg bg-gray-50 p-4">

          <p className="text-sm font-medium text-gray-700">
            Projected Balance
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Opening Balance + Incoming − Outgoing
          </p>

        </div>

      </div>

    </div>
  );
}

export default Forecast;