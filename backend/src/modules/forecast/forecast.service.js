const userRepository = require("../users/user.repository");
const businessRepository = require("../businesses/business.repository");
const cashflowService = require("../cashflow/cashflow.service");
const forecastRepository = require("./forecast.repository");

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

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
}

async function getForecast(
  clerkUserId,
  businessId,
  numberOfDays = 7
) {
  await verifyBusinessOwnership(
    clerkUserId,
    businessId
  );

  if (
    !Number.isInteger(numberOfDays) ||
    numberOfDays <= 0 ||
    numberOfDays > 30
  ) {
    const error = new Error(
      "Forecast days must be between 1 and 30"
    );
    error.statusCode = 400;
    throw error;
  }

  const cashflow =
    await cashflowService.getCashflow(
      clerkUserId,
      businessId
    );

  const today = new Date();

  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const endDate = addDays(
    startDate,
    numberOfDays + 1
  );

  const [
    pendingTransactions,
    pendingReceivables,
    pendingPayables,
  ] = await Promise.all([
    forecastRepository.getPendingTransactions(
      businessId,
      startDate,
      endDate
    ),
    forecastRepository.getPendingReceivables(
      businessId,
      formatDate(startDate),
      formatDate(endDate)
    ),
    forecastRepository.getPendingPayables(
      businessId,
      formatDate(startDate),
      formatDate(endDate)
    ),
  ]);

  const forecast = [];

  let projectedBalance =
    cashflow.availableCash;

  for (let day = 0; day < numberOfDays; day++) {
    const forecastDate = addDays(
      startDate,
      day
    );

    const dateString =
      formatDate(forecastDate);

    const incomingFromTransactions =
      pendingTransactions
        .filter((transaction) => {
          return (
            formatDate(
              new Date(transaction.transaction_date)
            ) === dateString
          );
        })
        .reduce(
          (total, transaction) =>
            total + Number(transaction.amount_paise),
          0
        );

    const incomingFromReceivables =
      pendingReceivables
        .filter((receivable) => {
          return (
            formatDate(
              new Date(receivable.expected_date)
            ) === dateString
          );
        })
        .reduce(
          (total, receivable) =>
            total + Number(receivable.amount_paise),
          0
        );

    const outgoingFromPayables =
      pendingPayables
        .filter((payable) => {
          return (
            formatDate(
              new Date(payable.due_date)
            ) === dateString
          );
        })
        .reduce(
          (total, payable) =>
            total + Number(payable.amount_paise),
          0
        );

    const totalIncoming =
      incomingFromTransactions +
      incomingFromReceivables;

    const totalOutgoing =
      outgoingFromPayables;

    projectedBalance =
      projectedBalance +
      totalIncoming -
      totalOutgoing;

    forecast.push({
      date: dateString,
      openingBalance:
        projectedBalance -
        totalIncoming +
        totalOutgoing,
      incoming: totalIncoming,
      outgoing: totalOutgoing,
      projectedBalance,
    });
  }

  const minimumProjectedBalance =
    Math.min(
      ...forecast.map(
        (day) => day.projectedBalance
      )
    );

  const shortageExpected =
    minimumProjectedBalance < 0;

  return {
    numberOfDays,
    startingCash: cashflow.availableCash,
    minimumProjectedBalance,
    shortageExpected,
    forecast,
  };
}

module.exports = {
  getForecast,
};