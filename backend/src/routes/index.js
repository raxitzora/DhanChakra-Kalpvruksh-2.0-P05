const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DhanChakra API is running",
  });
});

router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You are authenticated",
    userId: req.userId,
  });
});

module.exports = router;