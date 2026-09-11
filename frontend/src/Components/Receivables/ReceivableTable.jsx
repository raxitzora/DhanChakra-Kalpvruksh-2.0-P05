function formatCurrency(amountPaise) {
  return `₹${(amountPaise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(date) {
  if (!date) {
    return "Not specified";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ReceivableTable({
  receivables,
  onMarkReceived,
  onDelete,
}) {
  if (receivables.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <h3 className="font-medium">
          No receivables found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Add a receivable to start tracking money
          customers owe your business.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Receivables
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Money your customers still owe your business.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-medium">
                Customer
              </th>

              <th className="px-6 py-3 font-medium">
                Amount
              </th>

              <th className="px-6 py-3 font-medium">
                Expected Date
              </th>

              <th className="px-6 py-3 font-medium">
                Status
              </th>

              <th className="px-6 py-3 font-medium">
                Description
              </th>

              <th className="px-6 py-3 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {receivables.map((receivable) => (
              <tr key={receivable.id}>
                <td className="px-6 py-4 font-medium">
                  {receivable.customer_name}
                </td>

                <td className="px-6 py-4">
                  {formatCurrency(
                    receivable.amount_paise
                  )}
                </td>

                <td className="px-6 py-4">
                  {formatDate(
                    receivable.expected_date
                  )}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      receivable.status === "RECEIVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {receivable.status}
                  </span>
                </td>

                <td className="max-w-xs px-6 py-4 text-gray-600">
                  {receivable.description || "-"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    {receivable.status === "PENDING" && (
                      <button
                        type="button"
                        onClick={() =>
                          onMarkReceived(receivable)
                        }
                        className="rounded-lg border px-3 py-2 text-xs font-medium hover:bg-gray-50"
                      >
                        Mark Received
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(receivable.id)
                      }
                      className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
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

export default ReceivableTable;