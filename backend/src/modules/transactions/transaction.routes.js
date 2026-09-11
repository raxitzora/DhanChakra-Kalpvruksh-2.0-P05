const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");
const transactionController = require("./transaction.controller");

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  transactionController.createTransaction
);

router.get(
  "/",
  transactionController.getTransactions
);

router.get(
  "/:id",
  transactionController.getTransaction
);

router.put(
  "/:id",
  transactionController.updateTransaction
);

router.delete(
  "/:id",
  transactionController.deleteTransaction
);

module.exports = router;