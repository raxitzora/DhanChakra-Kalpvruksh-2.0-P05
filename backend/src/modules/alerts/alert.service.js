const forecastService = require("../forecast/forecast.service");

const SAFETY_BUFFER_PERCENTAGE = 0.20;

async function getRiskAnalysis(
  clerkUserId,
  businessId
) {
  const forecast = await forecastService.getForecast(
    clerkUserId,
    businessId,
    7
  );

  const availableCash = forecast.startingCash;

  const safetyBuffer = Math.round(
    availableCash * SAFETY_BUFFER_PERCENTAGE
  );

  const minimumRequiredCash =
    Math.max(
      0,
      forecast.minimumProjectedBalance < 0
        ? Math.abs(forecast.minimumProjectedBalance)
        : 0
    );

  const safeToSpend = Math.max(
    0,
    availableCash -
      minimumRequiredCash -
      safetyBuffer
  );

  let riskLevel = "LOW";
  let riskMessage = "Your cash position looks healthy.";

  if (forecast.minimumProjectedBalance < 0) {
    riskLevel = "CRITICAL";
    riskMessage =
      "Your projected cash balance may go negative within the next 7 days.";
  } else if (safeToSpend === 0) {
    riskLevel = "HIGH";
    riskMessage =
      "You currently have no safe-to-spend cash after accounting for upcoming needs.";
  } else if (
    availableCash > 0 &&
    safeToSpend <
      availableCash * 0.25
  ) {
    riskLevel = "MEDIUM";
    riskMessage =
      "Most of your available cash is committed to upcoming needs.";
  }

  return {
    safeToSpend,
    riskLevel,
    riskMessage,
    safetyBuffer,
    minimumProjectedBalance:
      forecast.minimumProjectedBalance,
    shortageExpected:
      forecast.shortageExpected,
  };
}

module.exports = {
  getRiskAnalysis,
};