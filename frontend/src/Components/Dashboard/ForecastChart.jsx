function formatCurrency(amountPaise) {
  return `₹${(amountPaise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function ForecastChart({ forecast }) {
  if (!forecast || !forecast.forecast?.length) {
    return (
      <div className="rounded-xl border bg-white p-6">
        <h2 className="text-lg font-semibold">
          Cash Forecast
        </h2>

        <p className="mt-4 text-sm text-gray-500">
          No forecast data available.
        </p>
      </div>
    );
  }

  const forecastDays = forecast.forecast;

  const balances = forecastDays.map(
    (day) => day.projectedBalance
  );

  const maximumBalance = Math.max(
    ...balances,
    1
  );

  const minimumBalance = Math.min(
    ...balances,
    0
  );

  const range = Math.max(
    maximumBalance - minimumBalance,
    1
  );

  return (
    <div className="rounded-xl border bg-white p-6">
      <div>
        <h2 className="text-lg font-semibold">
          Cash Forecast
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Projected cash position over the next{" "}
          {forecastDays.length} days.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {forecastDays.map((day) => {
          const percentage =
            ((day.projectedBalance - minimumBalance) /
              range) *
            100;

          return (
            <div key={day.date}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  {formatDate(day.date)}
                </span>

                <span className="font-medium">
                  {formatCurrency(
                    day.projectedBalance
                  )}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-black"
                  style={{
                    width: `${Math.max(
                      percentage,
                      2
                    )}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 border-t pt-4 sm:grid-cols-3">
        <div>
          <p className="text-xs text-gray-500">
            Starting Cash
          </p>

          <p className="mt-1 font-semibold">
            {formatCurrency(
              forecast.startingCash
            )}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Minimum Projected
          </p>

          <p className="mt-1 font-semibold">
            {formatCurrency(
              forecast.minimumProjectedBalance
            )}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Shortage Expected
          </p>

          <p
            className={`mt-1 font-semibold ${
              forecast.shortageExpected
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {forecast.shortageExpected
              ? "Yes"
              : "No"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForecastChart;