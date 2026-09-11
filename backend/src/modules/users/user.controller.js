const userService = require("./user.service");

async function getCurrentUser(req, res, next) {
  try {
    const user = await userService.getOrCreateUser({
      clerkUserId: req.userId,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCurrentUser,
};