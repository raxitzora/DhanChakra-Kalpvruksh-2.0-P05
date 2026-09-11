const userRepository = require("./user.repository");

async function getOrCreateUser(userData) {
  const existingUser = await userRepository.findByClerkUserId(
    userData.clerkUserId
  );

  if (existingUser) {
    return existingUser;
  }

  return userRepository.createUser(userData);
}

module.exports = {
  getOrCreateUser,
};