function formatCurrency(amountPaise) {
  return `₹${(amountPaise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function CashSummary({ cashflow }) {
  if (!cashflow) {
    return null;
  }

  return (
    <div className="rounded-xl border bg-white p-6">
      <p className="text-sm font-medium text-gray-500">
        Cash Available
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {formatCurrency(cashflow.availableCash)}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Money currently available for your business.
      </p>
    </div>
  );
}

export default CashSummary;