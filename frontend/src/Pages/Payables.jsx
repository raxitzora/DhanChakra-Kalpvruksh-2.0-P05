import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";

import PayableForm from "../Components/Payables/PayableForm";
import PayableTable from "../Components/Payables/PayableTable";

import {
  getPayables,
  createPayable,
  updatePayable,
  deletePayable,
} from "../services/payable.service";

function Payables() {
  const { getToken } = useAuth();

  const [payables, setPayables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

const businessId = localStorage.getItem("selectedBusinessId");
  async function loadPayables() {
    try {
      setLoading(true);
      setError("");

      const response = await getPayables(
        getToken,
        businessId
      );

      setPayables(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load payables.");
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

    loadPayables();
  }, [businessId]);

  async function handleCreatePayable(payableData) {
    try {
      setSaving(true);
      setError("");

      const response = await createPayable(
        getToken,
        {
          businessId,
          ...payableData,
        }
      );

      setPayables((previous) => [
        ...previous,
        response.data,
      ]);
    } catch (error) {
      console.error(error);
      setError("Failed to create payable.");
    } finally {
      setSaving(false);
    }
  }

  async function handleMarkPaid(payable) {
    try {
      setError("");

      const response = await updatePayable(
        getToken,
        payable.id,
        {
          supplierName: payable.supplier_name,
          amountPaise: payable.amount_paise,
          dueDate: payable.due_date,
          description: payable.description,
          status: "PAID",
        }
      );

      setPayables((previous) =>
        previous.map((item) =>
          item.id === payable.id
            ? response.data
            : item
        )
      );
    } catch (error) {
      console.error(error);
      setError("Failed to update payable.");
    }
  }

  async function handleDeletePayable(payableId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payable?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deletePayable(
        getToken,
        payableId
      );

      setPayables((previous) =>
        previous.filter(
          (item) => item.id !== payableId
        )
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete payable.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Payables
        </h1>

        <p className="mt-1 text-gray-500">
          Keep track of money your business needs to pay.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <PayableForm
        onSubmit={handleCreatePayable}
        loading={saving}
      />

      {loading ? (
        <div className="rounded-xl border bg-white p-8 text-center">
          Loading payables...
        </div>
      ) : (
        <PayableTable
          payables={payables}
          onMarkPaid={handleMarkPaid}
          onDelete={handleDeletePayable}
        />
      )}
    </div>
  );
}

export default Payables;