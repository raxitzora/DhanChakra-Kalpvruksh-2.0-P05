import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/react";

import {
  getTransactions,
  createTransaction,
  deleteTransaction,
} from "../services/transaction.service";

import TransactionForm from "../Components/Transactions/TransactionForm";
import TransactionTable from "../Components/Transactions/TransactionTable";
import TransactionFilters from "../Components/Transactions/TransactionFilters";

function Transactions() {
  const { getToken } = useAuth();

  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [filterType, setFilterType] =
    useState("ALL");

  const businessId = localStorage.getItem(
    "selectedBusinessId"
  );

  useEffect(() => {
    if (!businessId) {
      setError("No business selected.");
      setLoading(false);
      return;
    }

    loadTransactions();
  }, [businessId]);

  async function loadTransactions() {
    try {
      setLoading(true);
      setError("");

      const response = await getTransactions(
        getToken,
        businessId
      );

      setTransactions(response.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTransaction(
    transactionData
  ) {
    try {
      setSaving(true);
      setError("");

      await createTransaction(getToken, {
        businessId,
        ...transactionData,
      });

      setShowForm(false);

      await loadTransactions();
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteTransaction(
    transactionId
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteTransaction(
        getToken,
        transactionId
      );

      setTransactions((current) =>
        current.filter(
          (transaction) =>
            transaction.id !== transactionId
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }

  const filteredTransactions = useMemo(() => {
    if (filterType === "ALL") {
      return transactions;
    }

    return transactions.filter(
      (transaction) =>
        transaction.type === filterType
    );
  }, [transactions, filterType]);

  if (loading) {
    return (
      <div className="p-8">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">
            Transactions
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Track money coming into and going out of
            your business.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          + Add Transaction
        </button>
      </div>

      {/* Error */}

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Form */}

      {showForm && (
        <div className="mt-6 max-w-xl">
          <TransactionForm
            onSubmit={handleCreateTransaction}
            loading={saving}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Filters */}

      <div className="mt-8">
        <TransactionFilters
          type={filterType}
          onTypeChange={setFilterType}
        />
      </div>

      {/* Table */}

      <div className="mt-4">
        <TransactionTable
          transactions={filteredTransactions}
          onDelete={handleDeleteTransaction}
        />
      </div>
    </div>
  );
}

export default Transactions;