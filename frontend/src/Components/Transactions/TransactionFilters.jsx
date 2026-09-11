function TransactionFilters({
  type,
  onTypeChange,
}) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium">
        Filter:
      </label>

      <select
        value={type}
        onChange={(event) =>
          onTypeChange(event.target.value)
        }
        className="rounded-lg border bg-white px-3 py-2 text-sm"
      >
        <option value="ALL">All transactions</option>
        <option value="SALE">Sales</option>
        <option value="EXPENSE">Expenses</option>
        <option value="WITHDRAWAL">
          Withdrawals
        </option>
      </select>
    </div>
  );
}

export default TransactionFilters;