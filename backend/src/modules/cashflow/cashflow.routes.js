const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");
const cashflowController = require("./cashflow.controller");

const router = express.Router();

router.use(authMiddleware);

router.get(
  "/",
  cashflowController.getCashflow
);

module.exports = router;