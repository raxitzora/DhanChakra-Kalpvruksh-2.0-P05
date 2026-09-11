const { getAuth } = require("@clerk/express");

function authMiddleware(req, res, next) {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  req.userId = userId;

  next();
}

module.exports = authMiddleware;