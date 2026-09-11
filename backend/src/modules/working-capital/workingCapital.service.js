const userRepository = require("../users/user.repository");
const businessRepository = require("../businesses/business.repository");
const cashflowService = require("../cashflow/cashflow.service");
const workingCapitalRepository = require("./workingCapital.repository");

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

async function getWorkingCapital(
  clerkUserId,
  businessId
) {
  await verifyBusinessOwnership(
    clerkUserId,
    businessId
  );

  const [cashflow, stockExpenses] =
    await Promise.all([
      cashflowService.getCashflow(
        clerkUserId,
        businessId
      ),
      workingCapitalRepository.getStockExpenses(
        businessId
      ),
    ]);

  const uncommittedCash =
    cashflow.availableCash - stockExpenses;

  const workingCapitalPosition =
    cashflow.availableCash +
    cashflow.pendingIncoming -
    cashflow.upcomingOutflows;

  return {
    workingCapitalCommitted: stockExpenses,
    uncommittedCash,
    workingCapitalPosition,
    breakdown: {
      availableCash: cashflow.availableCash,
      pendingIncoming: cashflow.pendingIncoming,
      upcomingOutflows: cashflow.upcomingOutflows,
      stockExpenses,
    },
  };
}

module.exports = {
  getWorkingCapital,
};