const userRepository = require("../users/user.repository");
const businessRepository = require("../businesses/business.repository");
const transactionRepository = require("./transaction.repository");

const TRANSACTION_TYPES = [
  "SALE",
  "EXPENSE",
  "WITHDRAWAL",
];

const PAYMENT_METHODS = [
  "CASH",
  "UPI",
  "CARD",
  "BANK_TRANSFER",
  "CREDIT",
];

const SETTLEMENT_STATUSES = [
  "AVAILABLE",
  "PENDING",
  "SETTLED",
];

async function getUserId(clerkUserId) {
  const user = await userRepository.findByClerkUserId(clerkUserId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user.id;
}

async function verifyBusinessOwnership(clerkUserId, businessId) {
  const userId = await getUserId(clerkUserId);

  const business = await businessRepository.findById(businessId);

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

function validateTransactionType(type) {
  if (!TRANSACTION_TYPES.includes(type)) {
    const error = new Error(
      "Invalid transaction type"
    );
    error.statusCode = 400;
    throw error;
  }
}

function validatePaymentMethod(paymentMethod) {
  if (!PAYMENT_METHODS.includes(paymentMethod)) {
    const error = new Error(
      "Invalid payment method"
    );
    error.statusCode = 400;
    throw error;
  }
}

function validateSettlementStatus(settlementStatus) {
  if (!SETTLEMENT_STATUSES.includes(settlementStatus)) {
    const error = new Error(
      "Invalid settlement status"
    );
    error.statusCode = 400;
    throw error;
  }
}

function validateAmount(amountPaise) {
  if (
    !Number.isInteger(amountPaise) ||
    amountPaise <= 0
  ) {
    const error = new Error(
      "Amount must be a positive integer in paise"
    );
    error.statusCode = 400;
    throw error;
  }
}

function validateSettlementRules(
  type,
  paymentMethod,
  settlementStatus
) {
  if (
    type === "SALE" &&
    paymentMethod === "CREDIT" &&
    settlementStatus === "AVAILABLE"
  ) {
    const error = new Error(
      "Credit sales cannot have AVAILABLE settlement status"
    );
    error.statusCode = 400;
    throw error;
  }

  if (
    type !== "SALE" &&
    paymentMethod === "CREDIT"
  ) {
    const error = new Error(
      "CREDIT payment method can only be used for sales"
    );
    error.statusCode = 400;
    throw error;
  }
}

function validateTransactionData({
  type,
  amountPaise,
  paymentMethod,
  settlementStatus,
}) {
  validateTransactionType(type);
  validateAmount(amountPaise);
  validatePaymentMethod(paymentMethod);
  validateSettlementStatus(settlementStatus);

  validateSettlementRules(
    type,
    paymentMethod,
    settlementStatus
  );
}

async function createTransaction(
  clerkUserId,
  transactionData
) {
  const {
    businessId,
    type,
    amountPaise,
    paymentMethod,
    settlementStatus,
    category,
    description,
    transactionDate,
  } = transactionData;

  await verifyBusinessOwnership(
    clerkUserId,
    businessId
  );

  validateTransactionData({
    type,
    amountPaise,
    paymentMethod,
    settlementStatus,
  });

  return transactionRepository.createTransaction({
    businessId,
    type,
    amountPaise,
    paymentMethod,
    settlementStatus,
    category: category || null,
    description: description || null,
    transactionDate: transactionDate || new Date(),
  });
}

async function getTransactions(
  clerkUserId,
  businessId
) {
  await verifyBusinessOwnership(
    clerkUserId,
    businessId
  );

  return transactionRepository.findByBusinessId(
    businessId
  );
}

async function getTransaction(
  clerkUserId,
  transactionId
) {
  const transaction =
    await transactionRepository.findById(
      transactionId
    );

  if (!transaction) {
    const error = new Error(
      "Transaction not found"
    );
    error.statusCode = 404;
    throw error;
  }

  await verifyBusinessOwnership(
    clerkUserId,
    transaction.business_id
  );

  return transaction;
}

async function updateTransaction(
  clerkUserId,
  transactionId,
  transactionData
) {
  const existingTransaction =
    await transactionRepository.findById(
      transactionId
    );

  if (!existingTransaction) {
    const error = new Error(
      "Transaction not found"
    );
    error.statusCode = 404;
    throw error;
  }

  await verifyBusinessOwnership(
    clerkUserId,
    existingTransaction.business_id
  );

  const {
    type,
    amountPaise,
    paymentMethod,
    settlementStatus,
    category,
    description,
    transactionDate,
  } = transactionData;

  validateTransactionData({
    type,
    amountPaise,
    paymentMethod,
    settlementStatus,
  });

  return transactionRepository.updateTransaction(
    transactionId,
    {
      type,
      amountPaise,
      paymentMethod,
      settlementStatus,
      category: category || null,
      description: description || null,
      transactionDate: transactionDate || existingTransaction.transaction_date,
    }
  );
}

async function deleteTransaction(
  clerkUserId,
  transactionId
) {
  const transaction =
    await transactionRepository.findById(
      transactionId
    );

  if (!transaction) {
    const error = new Error(
      "Transaction not found"
    );
    error.statusCode = 404;
    throw error;
  }

  await verifyBusinessOwnership(
    clerkUserId,
    transaction.business_id
  );

  await transactionRepository.deleteTransaction(
    transactionId
  );

  return {
    message: "Transaction deleted successfully",
  };
}

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};