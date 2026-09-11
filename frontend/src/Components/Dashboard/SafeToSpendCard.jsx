function formatCurrency(amountPaise) {
  return `₹${(amountPaise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function SafeToSpendCard({ alert }) {
  if (!alert) {
    return null;
  }

  return (
    <div className="rounded-xl border bg-white p-6">
      <p className="text-sm font-medium text-gray-500">
        Safe to Spend
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        {formatCurrency(alert.safeToSpend)}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Amount you can safely spend without putting
        upcoming cash needs at risk.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Safety Buffer
          </p>

          <p className="mt-2 text-lg font-semibold">
            {formatCurrency(alert.safetyBuffer)}
          </p>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Minimum Required Cash
          </p>

          <p className="mt-2 text-lg font-semibold">
            {formatCurrency(
              alert.minimumRequiredCash
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SafeToSpendCard;