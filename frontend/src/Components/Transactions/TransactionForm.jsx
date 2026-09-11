import { useState } from "react";

const TRANSACTION_TYPES = [
  {
    value: "SALE",
    label: "Sale",
  },
  {
    value: "EXPENSE",
    label: "Expense",
  },
  {
    value: "WITHDRAWAL",
    label: "Withdrawal",
  },
];

const PAYMENT_METHODS = [
  {
    value: "CASH",
    label: "Cash",
  },
  {
    value: "UPI",
    label: "UPI",
  },
  {
    value: "CARD",
    label: "Card",
  },
  {
    value: "BANK_TRANSFER",
    label: "Bank Transfer",
  },
  {
    value: "CREDIT",
    label: "Customer Credit",
  },
];

const EXPENSE_CATEGORIES = [
  "STOCK",
  "SUPPLIER",
  "RENT",
  "WAGES",
  "UTILITIES",
  "TRANSPORT",
  "OTHER",
];

function TransactionForm({
  onSubmit,
  loading,
  onCancel,
}) {
  const [type, setType] = useState("SALE");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [settlementStatus, setSettlementStatus] =
    useState("AVAILABLE");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transactionDate, setTransactionDate] =
    useState("");

  function handleTypeChange(event) {
    const newType = event.target.value;

    setType(newType);

    if (newType !== "SALE") {
      setPaymentMethod("CASH");
      setSettlementStatus("AVAILABLE");
    }

    if (newType === "WITHDRAWAL") {
      setCategory("");
    }
  }

  function handlePaymentMethodChange(event) {
    const newPaymentMethod = event.target.value;

    setPaymentMethod(newPaymentMethod);

    if (
      type === "SALE" &&
      newPaymentMethod === "CREDIT"
    ) {
      setSettlementStatus("PENDING");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const amountRupees = Number(amount);

    if (!amountRupees || amountRupees <= 0) {
      return;
    }

    const amountPaise = Math.round(
      amountRupees * 100
    );

    onSubmit({
      type,
      amountPaise,
      paymentMethod,
      settlementStatus,
      category: category || null,
      description: description.trim() || null,
      transactionDate:
        transactionDate || undefined,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Add transaction
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Record money coming into or going out of your
          business.
        </p>
      </div>

      {/* Type */}

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">
          Transaction type
        </label>

        <select
          value={type}
          onChange={handleTypeChange}
          className="w-full rounded-lg border px-3 py-2"
        >
          {TRANSACTION_TYPES.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">
          Amount (₹)
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(event) =>
            setAmount(event.target.value)
          }
          placeholder="5000"
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      {/* Payment method */}

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">
          Payment method
        </label>

        <select
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          className="w-full rounded-lg border px-3 py-2"
        >
          {PAYMENT_METHODS.map((item) => {
            if (
              type !== "SALE" &&
              item.value === "CREDIT"
            ) {
              return null;
            }

            return (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            );
          })}
        </select>
      </div>

      {/* Settlement status */}

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">
          Settlement status
        </label>

        <select
          value={settlementStatus}
          onChange={(event) =>
            setSettlementStatus(event.target.value)
          }
          disabled={type !== "SALE"}
          className="w-full rounded-lg border px-3 py-2 disabled:bg-gray-100"
        >
          <option value="AVAILABLE">
            Available
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="SETTLED">
            Settled
          </option>
        </select>
      </div>

      {/* Category */}

      {type === "EXPENSE" && (
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">
              Select category
            </option>

            {EXPENSE_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Description */}

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          placeholder="Rice stock purchase"
          rows="3"
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      {/* Date */}

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">
          Transaction date
        </label>

        <input
          type="datetime-local"
          value={transactionDate}
          onChange={(event) =>
            setTransactionDate(event.target.value)
          }
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      {/* Buttons */}

      <div className="flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border px-4 py-2"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save Transaction"}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;