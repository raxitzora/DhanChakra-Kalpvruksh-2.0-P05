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
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm font-medium text-gray-500">
        Cash Available
      </p>

      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
        {formatCurrency(cashflow.availableCash)}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-5 text-gray-500">
        Money currently available for your business.
      </p>
    </div>
  );
}

export default CashSummary;