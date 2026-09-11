const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");
const businessController = require("./business.controller");

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  businessController.createBusiness
);

router.get(
  "/",
  businessController.getBusinesses
);

router.get(
  "/:id",
  businessController.getBusiness
);

router.put(
  "/:id",
  businessController.updateBusiness
);

router.delete(
  "/:id",
  businessController.deleteBusiness
);

module.exports = router;