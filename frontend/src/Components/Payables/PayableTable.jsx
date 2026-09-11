function formatCurrency(amountPaise) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amountPaise / 100);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function PayableTable({
  payables,
  onMarkPaid,
  onDelete,
}) {
  if (payables.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <h3 className="font-medium">
          No payables yet
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Add your upcoming supplier or business payments.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Payables
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Money your business needs to pay.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-sm font-medium">
                Supplier
              </th>

              <th className="px-6 py-4 text-sm font-medium">
                Amount
              </th>

              <th className="px-6 py-4 text-sm font-medium">
                Due Date
              </th>

              <th className="px-6 py-4 text-sm font-medium">
                Status
              </th>

              <th className="px-6 py-4 text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {payables.map((payable) => (
              <tr
                key={payable.id}
                className="border-b last:border-b-0"
              >
                <td className="px-6 py-4">
                  <div className="font-medium">
                    {payable.supplier_name}
                  </div>

                  {payable.description && (
                    <div className="mt-1 text-sm text-gray-500">
                      {payable.description}
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 font-medium">
                  {formatCurrency(
                    payable.amount_paise
                  )}
                </td>

                <td className="px-6 py-4 text-sm">
                  {formatDate(payable.due_date)}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      payable.status === "PAID"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {payable.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {payable.status === "PENDING" && (
                      <button
                        onClick={() =>
                          onMarkPaid(payable)
                        }
                        className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        Mark Paid
                      </button>
                    )}

                    <button
                      onClick={() =>
                        onDelete(payable.id)
                      }
                      className="rounded-lg border px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PayableTable;