const userRepository = require("../users/user.repository");
const businessRepository = require("../businesses/business.repository");
const cashflowService = require("../cashflow/cashflow.service");
const workingCapitalService = require("../working-capital/workingCapital.service");
const forecastService = require("../forecast/forecast.service");
const alertService = require("../alerts/alert.service");

async function getUserId(clerkUserId) {
  const user = await userRepository.findByClerkUserId(
    clerkUserId
  );

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user.id;
}

async function verifyBusinessOwnership(
  clerkUserId,
  businessId
) {
  const userId = await getUserId(clerkUserId);

  const business = await businessRepository.findById(
    businessId
  );

  if (!business) {
    const error = new Error("Business not found");
    error.statusCode = 404;
    throw error;
  }

  if (business.user_id !== userId) {
    const error = new Error(
      "You do not have access to this business"
    );
    error.statusCode = 403;
    throw error;
  }

  return business;
}

async function getDashboard(
  clerkUserId,
  businessId
) {
  const business = await verifyBusinessOwnership(
    clerkUserId,
    businessId
  );

  const [
    cashflow,
    workingCapital,
    forecast,
    risk,
  ] = await Promise.all([
    cashflowService.getCashflow(
      clerkUserId,
      businessId
    ),

    workingCapitalService.getWorkingCapital(
      clerkUserId,
      businessId
    ),

    forecastService.getForecast(
      clerkUserId,
      businessId,
      7
    ),

    alertService.getRiskAnalysis(
      clerkUserId,
      businessId
    ),
  ]);

  return {
    business: {
      id: business.id,
      name: business.name,
    },

    cashflow: {
      availableCash: cashflow.availableCash,
      pendingIncoming: cashflow.pendingIncoming,
      upcomingOutflows: cashflow.upcomingOutflows,
      netCashPosition: cashflow.netCashPosition,
    },

    workingCapital: {
      committed:
        workingCapital.workingCapitalCommitted,

      uncommitted:
        workingCapital.uncommittedCash,

      position:
        workingCapital.workingCapitalPosition,
    },

    forecast: {
      startingCash:
        forecast.startingCash,

      minimumProjectedBalance:
        forecast.minimumProjectedBalance,

      shortageExpected:
        forecast.shortageExpected,

      days: forecast.forecast,
    },

    risk: {
      safeToSpend:
        risk.safeToSpend,

      riskLevel:
        risk.riskLevel,

      riskMessage:
        risk.riskMessage,

      safetyBuffer:
        risk.safetyBuffer,
    },
  };
}

module.exports = {
  getDashboard,
};