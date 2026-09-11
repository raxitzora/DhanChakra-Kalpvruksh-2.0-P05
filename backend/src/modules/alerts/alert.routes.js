const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");
const alertController = require("./alert.controller");

const router = express.Router();

router.use(authMiddleware);

router.get(
  "/risk",
  alertController.getRiskAnalysis
);

module.exports = router;