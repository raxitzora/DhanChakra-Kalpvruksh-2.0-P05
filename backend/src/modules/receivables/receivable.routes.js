const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");
const receivableController = require("./receivable.controller");

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  receivableController.createReceivable
);

router.get(
  "/",
  receivableController.getReceivables
);

router.get(
  "/:id",
  receivableController.getReceivable
);

router.put(
  "/:id",
  receivableController.updateReceivable
);

router.delete(
  "/:id",
  receivableController.deleteReceivable
);

module.exports = router;