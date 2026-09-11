function BusinessSelector({
  businesses,
  selectedBusinessId,
  onChange,
}) {
  return (
    <select
      value={selectedBusinessId}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-lg border bg-white px-3 py-2"
    >
      {businesses.map((business) => (
        <option key={business.id} value={business.id}>
          {business.name}
        </option>
      ))}
    </select>
  );
}

export default BusinessSelector;