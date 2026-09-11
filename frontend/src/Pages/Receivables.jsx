import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";

import ReceivableForm from "../Components/Receivables/ReceivableForm";
import ReceivableTable from "../Components/Receivables/ReceivableTable";

import {
  getReceivables,
  createReceivable,
  updateReceivable,
  deleteReceivable,
} from "../services/receivable.service";

function Receivables() {
  const { getToken } = useAuth();

  const [receivables, setReceivables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const businessId = localStorage.getItem(
    "selectedBusinessId"
  );

  async function loadReceivables() {
    try {
      setLoading(true);
      setError("");

      const response = await getReceivables(
        getToken,
        businessId
      );

      setReceivables(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load receivables.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!businessId) {
      setLoading(false);
      setError("No business selected.");
      return;
    }

    loadReceivables();
  }, [businessId]);

  async function handleCreateReceivable(
    receivableData
  ) {
    try {
      setSaving(true);
      setError("");

      const response = await createReceivable(
        getToken,
        {
          businessId,
          ...receivableData,
        }
      );

      setReceivables((previous) => [
        ...previous,
        response.data,
      ]);
    } catch (error) {
      console.error(error);
      setError("Failed to create receivable.");
    } finally {
      setSaving(false);
    }
  }

  async function handleMarkReceived(receivable) {
    try {
      setError("");

      const response = await updateReceivable(
        getToken,
        receivable.id,
        {
          customerName: receivable.customer_name,
          amountPaise: receivable.amount_paise,
          expectedDate: receivable.expected_date,
          description: receivable.description,
          status: "RECEIVED",
        }
      );

      setReceivables((previous) =>
        previous.map((item) =>
          item.id === receivable.id
            ? response.data
            : item
        )
      );
    } catch (error) {
      console.error(error);
      setError("Failed to update receivable.");
    }
  }

  async function handleDeleteReceivable(
    receivableId
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this receivable?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteReceivable(
        getToken,
        receivableId
      );

      setReceivables((previous) =>
        previous.filter(
          (item) => item.id !== receivableId
        )
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete receivable.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Receivables
        </h1>

        <p className="mt-1 text-gray-500">
          Keep track of money your customers owe your
          business.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <ReceivableForm
        onSubmit={handleCreateReceivable}
        loading={saving}
      />

      {loading ? (
        <div className="rounded-xl border bg-white p-8 text-center">
          Loading receivables...
        </div>
      ) : (
        <ReceivableTable
          receivables={receivables}
          onMarkReceived={handleMarkReceived}
          onDelete={handleDeleteReceivable}
        />
      )}
    </div>
  );
}

export default Receivables;