const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");
const dashboardController = require("./dashboard.controller");

const router = express.Router();

router.use(authMiddleware);

router.get(
  "/",
  dashboardController.getDashboard
);

module.exports = router;