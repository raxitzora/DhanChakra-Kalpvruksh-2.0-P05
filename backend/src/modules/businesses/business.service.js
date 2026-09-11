const userRepository = require("../users/user.repository");
const businessRepository = require("./business.repository");

async function getUserId(clerkUserId) {
  const user = await userRepository.findByClerkUserId(clerkUserId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user.id;
}

async function createBusiness(clerkUserId, name) {
  if (!name || !name.trim()) {
    const error = new Error("Business name is required");
    error.statusCode = 400;
    throw error;
  }

  const userId = await getUserId(clerkUserId);

  return businessRepository.createBusiness({
    userId,
    name: name.trim(),
  });
}

async function getBusinesses(clerkUserId) {
  const userId = await getUserId(clerkUserId);

  return businessRepository.findByUserId(userId);
}

async function getBusiness(clerkUserId, businessId) {
  const userId = await getUserId(clerkUserId);

  const business = await businessRepository.findById(businessId);

  if (!business) {
    const error = new Error("Business not found");
    error.statusCode = 404;
    throw error;
  }

  if (business.user_id !== userId) {
    const error = new Error("You do not have access to this business");
    error.statusCode = 403;
    throw error;
  }

  return business;
}

async function updateBusiness(clerkUserId, businessId, name) {
  if (!name || !name.trim()) {
    const error = new Error("Business name is required");
    error.statusCode = 400;
    throw error;
  }

  const userId = await getUserId(clerkUserId);

  const business = await businessRepository.findById(businessId);

  if (!business) {
    const error = new Error("Business not found");
    error.statusCode = 404;
    throw error;
  }

  if (business.user_id !== userId) {
    const error = new Error("You do not have access to this business");
    error.statusCode = 403;
    throw error;
  }

  return businessRepository.updateBusiness(businessId, {
    name: name.trim(),
  });
}

async function deleteBusiness(clerkUserId, businessId) {
  const userId = await getUserId(clerkUserId);

  const business = await businessRepository.findById(businessId);

  if (!business) {
    const error = new Error("Business not found");
    error.statusCode = 404;
    throw error;
  }

  if (business.user_id !== userId) {
    const error = new Error("You do not have access to this business");
    error.statusCode = 403;
    throw error;
  }

  await businessRepository.deleteBusiness(businessId);

  return {
    message: "Business deleted successfully",
  };
}

module.exports = {
  createBusiness,
  getBusinesses,
  getBusiness,
  updateBusiness,
  deleteBusiness,
};