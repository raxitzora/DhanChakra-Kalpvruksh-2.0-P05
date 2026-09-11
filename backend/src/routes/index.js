const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const userRoutes = require("../modules/users/user.routes");
const businessRoutes = require("../modules/businesses/business.routes");
const transactionRoutes = require("../modules/transactions/transaction.routes");
const payableRoutes = require("../modules/payables/payable.routes");
const receivableRoutes = require("../modules/receivables/receivable.routes");

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

router.use("/users", userRoutes);
router.use("/businesses", businessRoutes);
router.use("/transactions", transactionRoutes);
router.use("/payables", payableRoutes);
router.use("/receivables", receivableRoutes);



module.exports = router;