const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");
const aiController = require("./ai.controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/chat", aiController.chat);
router.post("/execute", aiController.execute);

module.exports = router;