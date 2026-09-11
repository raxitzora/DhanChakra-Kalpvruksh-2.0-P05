function formatCurrency(amountPaise) {
  return `₹${(amountPaise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function WorkingCapitalCard({ workingCapital }) {
  if (!workingCapital) {
    return null;
  }

  return (
    <div className="rounded-xl border bg-white p-6">
      <div>
        <h2 className="text-lg font-semibold">
          Working Capital
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Cash committed to keeping your business
          running.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Stock Expenses
          </p>

          <p className="mt-2 text-xl font-semibold">
            {formatCurrency(
              workingCapital.committed
            )}
          </p>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Uncommitted Cash
          </p>

          <p className="mt-2 text-xl font-semibold">
            {formatCurrency(
              workingCapital.uncommitted
            )}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border p-4">
        <p className="text-sm text-gray-500">
          Working Capital Position
        </p>

        <p className="mt-2 text-2xl font-bold">
          {formatCurrency(
            workingCapital.position
          )}
        </p>
      </div>
    </div>
  );
}

export default WorkingCapitalCard;