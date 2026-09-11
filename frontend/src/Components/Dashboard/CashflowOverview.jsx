function formatCurrency(amountPaise) {
  return `₹${(amountPaise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function CashflowOverview({ cashflow }) {
  if (!cashflow) {
    return null;
  }

  const items = [
    {
      label: "Cash Available",
      value: cashflow.availableCash,
    },
    {
      label: "Coming In",
      value: cashflow.pendingIncoming,
    },
    {
      label: "Going Out",
      value: cashflow.upcomingOutflows,
    },
    {
      label: "Net Cash Position",
      value: cashflow.netCashPosition,
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-6">
      <div>
        <h2 className="text-lg font-semibold">
          Cashflow Overview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your current cash position and expected
          short-term movement.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border bg-gray-50 p-4"
          >
            <p className="text-sm text-gray-500">
              {item.label}
            </p>

            <p className="mt-2 text-xl font-semibold">
              {formatCurrency(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CashflowOverview;