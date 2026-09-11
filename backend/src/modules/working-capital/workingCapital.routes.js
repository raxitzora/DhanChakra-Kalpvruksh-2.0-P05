const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");
const workingCapitalController = require("./workingCapital.controller");

const router = express.Router();

router.use(authMiddleware);

router.get(
  "/",
  workingCapitalController.getWorkingCapital
);

module.exports = router;