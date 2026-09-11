const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");
const payableController = require("./payable.controller");

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  payableController.createPayable
);

router.get(
  "/",
  payableController.getPayables
);

router.get(
  "/:id",
  payableController.getPayable
);

router.put(
  "/:id",
  payableController.updatePayable
);

router.delete(
  "/:id",
  payableController.deletePayable
);

module.exports = router;