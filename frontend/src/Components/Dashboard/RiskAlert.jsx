function getRiskStyles(riskLevel) {
  switch (riskLevel) {
    case "LOW":
      return {
        container: "border-green-200 bg-green-50",
        badge: "bg-green-100 text-green-700",
      };

    case "MEDIUM":
      return {
        container: "border-yellow-200 bg-yellow-50",
        badge: "bg-yellow-100 text-yellow-700",
      };

    case "HIGH":
      return {
        container: "border-orange-200 bg-orange-50",
        badge: "bg-orange-100 text-orange-700",
      };

    case "CRITICAL":
      return {
        container: "border-red-200 bg-red-50",
        badge: "bg-red-100 text-red-700",
      };

    default:
      return {
        container: "border-gray-200 bg-gray-50",
        badge: "bg-gray-100 text-gray-700",
      };
  }
}

function RiskAlert({ alert }) {
  if (!alert) {
    return null;
  }

  const styles = getRiskStyles(alert.riskLevel);

  return (
    <div
      className={`rounded-xl border p-6 ${styles.container}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Cashflow Risk
          </p>

          <h2 className="mt-1 text-xl font-semibold">
            Cashflow Risk: {alert.riskLevel}
          </h2>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
        >
          {alert.riskLevel}
        </span>
      </div>

      {alert.riskMessage && (
        <p className="mt-4 text-sm text-gray-700">
          {alert.riskMessage}
        </p>
      )}
    </div>
  );
}

export default RiskAlert;