import { useState } from "react";

function PayableForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    supplierName: "",
    amount: "",
    dueDate: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const payableData = {
      supplierName: formData.supplierName,
      amountPaise: Math.round(Number(formData.amount) * 100),
      dueDate: formData.dueDate,
      description: formData.description,
      status: "PENDING",
    };

    await onSubmit(payableData);

    setFormData({
      supplierName: "",
      amount: "",
      dueDate: "",
      description: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Add Payable
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Record money your business needs to pay.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Supplier Name
          </label>

          <input
            type="text"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            placeholder="e.g. ABC Wholesale"
            required
            className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="e.g. 5000"
            min="1"
            step="0.01"
            required
            className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Due Date
          </label>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
      >
        {loading ? "Saving..." : "Add Payable"}
      </button>
    </form>
  );
}

export default PayableForm;