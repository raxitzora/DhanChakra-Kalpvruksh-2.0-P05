const userRepository = require("../users/user.repository");
const businessRepository = require("../businesses/business.repository");
const receivableRepository = require("./receivable.repository");

const RECEIVABLE_STATUSES = [
  "PENDING",
  "RECEIVED",
];

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

function validateCustomerName(customerName) {
  if (
    !customerName ||
    typeof customerName !== "string" ||
    !customerName.trim()
  ) {
    const error = new Error(
      "Customer name is required"
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

function validateExpectedDate(expectedDate) {
  if (!expectedDate) {
    return;
  }

  const parsedDate = new Date(expectedDate);

  if (Number.isNaN(parsedDate.getTime())) {
    const error = new Error(
      "Invalid expected date"
    );
    error.statusCode = 400;
    throw error;
  }
}

function validateStatus(status) {
  if (!RECEIVABLE_STATUSES.includes(status)) {
    const error = new Error(
      "Invalid receivable status"
    );
    error.statusCode = 400;
    throw error;
  }
}

function validateReceivableData({
  customerName,
  amountPaise,
  expectedDate,
  status,
}) {
  validateCustomerName(customerName);
  validateAmount(amountPaise);
  validateExpectedDate(expectedDate);
  validateStatus(status);
}

async function createReceivable(
  clerkUserId,
  receivableData
) {
  const {
    businessId,
    customerName,
    amountPaise,
    expectedDate,
    description,
    status = "PENDING",
  } = receivableData;

  await verifyBusinessOwnership(
    clerkUserId,
    businessId
  );

  validateReceivableData({
    customerName,
    amountPaise,
    expectedDate,
    status,
  });

  return receivableRepository.createReceivable({
    businessId,
    customerName: customerName.trim(),
    amountPaise,
    expectedDate: expectedDate || null,
    description: description || null,
    status,
  });
}

async function getReceivables(
  clerkUserId,
  businessId
) {
  await verifyBusinessOwnership(
    clerkUserId,
    businessId
  );

  return receivableRepository.findByBusinessId(
    businessId
  );
}

async function getReceivable(
  clerkUserId,
  receivableId
) {
  const receivable =
    await receivableRepository.findById(
      receivableId
    );

  if (!receivable) {
    const error = new Error(
      "Receivable not found"
    );
    error.statusCode = 404;
    throw error;
  }

  await verifyBusinessOwnership(
    clerkUserId,
    receivable.business_id
  );

  return receivable;
}

async function updateReceivable(
  clerkUserId,
  receivableId,
  receivableData
) {
  const existingReceivable =
    await receivableRepository.findById(
      receivableId
    );

  if (!existingReceivable) {
    const error = new Error(
      "Receivable not found"
    );
    error.statusCode = 404;
    throw error;
  }

  await verifyBusinessOwnership(
    clerkUserId,
    existingReceivable.business_id
  );

  const {
    customerName,
    amountPaise,
    expectedDate,
    description,
    status,
  } = receivableData;

  validateReceivableData({
    customerName,
    amountPaise,
    expectedDate,
    status,
  });

  return receivableRepository.updateReceivable(
    receivableId,
    {
      customerName: customerName.trim(),
      amountPaise,
      expectedDate: expectedDate || null,
      description: description || null,
      status,
    }
  );
}

async function deleteReceivable(
  clerkUserId,
  receivableId
) {
  const receivable =
    await receivableRepository.findById(
      receivableId
    );

  if (!receivable) {
    const error = new Error(
      "Receivable not found"
    );
    error.statusCode = 404;
    throw error;
  }

  await verifyBusinessOwnership(
    clerkUserId,
    receivable.business_id
  );

  await receivableRepository.deleteReceivable(
    receivableId
  );

  return {
    message: "Receivable deleted successfully",
  };
}

module.exports = {
  createReceivable,
  getReceivables,
  getReceivable,
  updateReceivable,
  deleteReceivable,
};