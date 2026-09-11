const userRepository = require("../users/user.repository");
const businessRepository = require("../businesses/business.repository");
const cashflowRepository = require("./cashflow.repository");

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

async function getCashflow(
  clerkUserId,
  businessId
) {
  await verifyBusinessOwnership(
    clerkUserId,
    businessId
  );

  const [
    availableSales,
    expenses,
    withdrawals,
    pendingTransactionSales,
    pendingReceivables,
    pendingPayables,
  ] = await Promise.all([
    cashflowRepository.getAvailableSales(
      businessId
    ),
    cashflowRepository.getExpenses(
      businessId
    ),
    cashflowRepository.getWithdrawals(
      businessId
    ),
    cashflowRepository.getPendingTransactionSales(
      businessId
    ),
    cashflowRepository.getPendingReceivables(
      businessId
    ),
    cashflowRepository.getPendingPayables(
      businessId
    ),
  ]);

  const availableCash =
    availableSales -
    expenses -
    withdrawals;

  const pendingIncoming =
    pendingTransactionSales +
    pendingReceivables;

  const upcomingOutflows =
    pendingPayables;

  const netCashPosition =
    availableCash +
    pendingIncoming -
    upcomingOutflows;

  return {
    availableCash,
    pendingIncoming,
    upcomingOutflows,
    netCashPosition,
    breakdown: {
      availableSales,
      expenses,
      withdrawals,
      pendingTransactionSales,
      pendingReceivables,
      pendingPayables,
    },
  };
}

module.exports = {
  getCashflow,
};