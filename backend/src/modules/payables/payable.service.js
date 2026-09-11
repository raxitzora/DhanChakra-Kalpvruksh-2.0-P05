const userRepository = require("../users/user.repository");
const businessRepository = require("../businesses/business.repository");
const payableRepository = require("./payable.repository");

const PAYABLE_STATUSES = [
  "PENDING",
  "PAID",
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

function validateSupplierName(supplierName) {
  if (
    !supplierName ||
    typeof supplierName !== "string" ||
    !supplierName.trim()
  ) {
    const error = new Error(
      "Supplier name is required"
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

function validateDueDate(dueDate) {
  if (!dueDate) {
    const error = new Error("Due date is required");
    error.statusCode = 400;
    throw error;
  }

  const parsedDate = new Date(dueDate);

  if (Number.isNaN(parsedDate.getTime())) {
    const error = new Error("Invalid due date");
    error.statusCode = 400;
    throw error;
  }
}

function validateStatus(status) {
  if (!PAYABLE_STATUSES.includes(status)) {
    const error = new Error("Invalid payable status");
    error.statusCode = 400;
    throw error;
  }
}

function validatePayableData({
  supplierName,
  amountPaise,
  dueDate,
  status,
}) {
  validateSupplierName(supplierName);
  validateAmount(amountPaise);
  validateDueDate(dueDate);
  validateStatus(status);
}

async function createPayable(
  clerkUserId,
  payableData
) {
  const {
    businessId,
    supplierName,
    amountPaise,
    dueDate,
    description,
    status = "PENDING",
  } = payableData;

  await verifyBusinessOwnership(
    clerkUserId,
    businessId
  );

  validatePayableData({
    supplierName,
    amountPaise,
    dueDate,
    status,
  });

  return payableRepository.createPayable({
    businessId,
    supplierName: supplierName.trim(),
    amountPaise,
    dueDate,
    description: description || null,
    status,
  });
}

async function getPayables(
  clerkUserId,
  businessId
) {
  await verifyBusinessOwnership(
    clerkUserId,
    businessId
  );

  return payableRepository.findByBusinessId(
    businessId
  );
}

async function getPayable(
  clerkUserId,
  payableId
) {
  const payable = await payableRepository.findById(
    payableId
  );

  if (!payable) {
    const error = new Error("Payable not found");
    error.statusCode = 404;
    throw error;
  }

  await verifyBusinessOwnership(
    clerkUserId,
    payable.business_id
  );

  return payable;
}

async function updatePayable(
  clerkUserId,
  payableId,
  payableData
) {
  const existingPayable =
    await payableRepository.findById(payableId);

  if (!existingPayable) {
    const error = new Error("Payable not found");
    error.statusCode = 404;
    throw error;
  }

  await verifyBusinessOwnership(
    clerkUserId,
    existingPayable.business_id
  );

  const {
    supplierName,
    amountPaise,
    dueDate,
    description,
    status,
  } = payableData;

  validatePayableData({
    supplierName,
    amountPaise,
    dueDate,
    status,
  });

  return payableRepository.updatePayable(
    payableId,
    {
      supplierName: supplierName.trim(),
      amountPaise,
      dueDate,
      description: description || null,
      status,
    }
  );
}

async function deletePayable(
  clerkUserId,
  payableId
) {
  const payable = await payableRepository.findById(
    payableId
  );

  if (!payable) {
    const error = new Error("Payable not found");
    error.statusCode = 404;
    throw error;
  }

  await verifyBusinessOwnership(
    clerkUserId,
    payable.business_id
  );

  await payableRepository.deletePayable(
    payableId
  );

  return {
    message: "Payable deleted successfully",
  };
}

module.exports = {
  createPayable,
  getPayables,
  getPayable,
  updatePayable,
  deletePayable,
};