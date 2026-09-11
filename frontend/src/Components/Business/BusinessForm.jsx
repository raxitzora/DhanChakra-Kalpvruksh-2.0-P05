import { useState } from "react";

function BusinessForm({ onSubmit, loading }) {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    onSubmit({
      name: trimmedName,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm"
    >
      <h1 className="text-2xl font-semibold">
        Set up your business
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Add your shop or business to start tracking your cashflow.
      </p>

      <div className="mt-6">
        <label
          htmlFor="business-name"
          className="mb-2 block text-sm font-medium"
        >
          Business name
        </label>

        <input
          id="business-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Raj General Store"
          className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Business"}
      </button>
    </form>
  );
}

export default BusinessForm;