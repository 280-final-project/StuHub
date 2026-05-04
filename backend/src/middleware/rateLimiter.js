const rateLimit = require("express-rate-limit");

const aiChatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many chat requests. Try again in an hour." },
});

module.exports = { aiChatLimiter };
