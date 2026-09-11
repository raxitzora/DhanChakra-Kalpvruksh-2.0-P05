import { useState } from "react";

function ReceivableForm({ onSubmit, loading }) {
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!customerName.trim() || !amount) {
      return;
    }

    const amountPaise = Math.round(
      Number(amount) * 100
    );

    await onSubmit({
      customerName: customerName.trim(),
      amountPaise,
      expectedDate: expectedDate || null,
      description: description.trim() || null,
      status: "PENDING",
    });

    setCustomerName("");
    setAmount("");
    setExpectedDate("");
    setDescription("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-white p-6"
    >
      <h2 className="text-lg font-semibold">
        Add Receivable
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Customer Name
          </label>

          <input
            type="text"
            value={customerName}
            onChange={(event) =>
              setCustomerName(event.target.value)
            }
            placeholder="e.g. Rajesh"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Amount
          </label>

          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value)
            }
            placeholder="e.g. 5000"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Expected Date
          </label>

          <input
            type="date"
            value={expectedDate}
            onChange={(event) =>
              setExpectedDate(event.target.value)
            }
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Description
          </label>

          <input
            type="text"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="e.g. Pending grocery payment"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Receivable"}
      </button>
    </form>
  );
}

export default ReceivableForm;