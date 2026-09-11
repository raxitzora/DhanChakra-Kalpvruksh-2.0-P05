function formatAmount(amountPaise) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amountPaise / 100);
}

function formatType(type) {
  const labels = {
    SALE: "Sale",
    EXPENSE: "Expense",
    WITHDRAWAL: "Withdrawal",
  };

  return labels[type] || type;
}

function formatPaymentMethod(paymentMethod) {
  const labels = {
    CASH: "Cash",
    UPI: "UPI",
    CARD: "Card",
    BANK_TRANSFER: "Bank Transfer",
    CREDIT: "Credit",
  };

  return labels[paymentMethod] || paymentMethod;
}

function formatSettlementStatus(status) {
  const labels = {
    AVAILABLE: "Available",
    PENDING: "Pending",
    SETTLED: "Settled",
  };

  return labels[status] || status;
}

function TransactionTable({
  transactions,
  onDelete,
}) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="font-medium">
          No transactions yet
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Add your first transaction to start tracking
          your cashflow.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-5 py-4 font-medium">
                Date
              </th>

              <th className="px-5 py-4 font-medium">
                Type
              </th>

              <th className="px-5 py-4 font-medium">
                Amount
              </th>

              <th className="px-5 py-4 font-medium">
                Payment
              </th>

              <th className="px-5 py-4 font-medium">
                Status
              </th>

              <th className="px-5 py-4 font-medium">
                Description
              </th>

              <th className="px-5 py-4 font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b last:border-0"
              >
                <td className="px-5 py-4">
                  {new Date(
                    transaction.transaction_date
                  ).toLocaleDateString("en-IN")}
                </td>

                <td className="px-5 py-4">
                  {formatType(transaction.type)}
                </td>

                <td className="px-5 py-4 font-medium">
                  {formatAmount(
                    transaction.amount_paise
                  )}
                </td>

                <td className="px-5 py-4">
                  {formatPaymentMethod(
                    transaction.payment_method
                  )}
                </td>

                <td className="px-5 py-4">
                  {formatSettlementStatus(
                    transaction.settlement_status
                  )}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {transaction.description || "—"}
                </td>

                <td className="px-5 py-4">
                  <button
                    onClick={() =>
                      onDelete(transaction.id)
                    }
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;