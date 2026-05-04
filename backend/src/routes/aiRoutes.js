const express = require("express");
const { chatHandler } = require("../controllers/aiController");
const { aiChatLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/chat", aiChatLimiter, chatHandler);

module.exports = router;
