const jwt = require("jsonwebtoken");

const TOKEN_EXPIRY = "7d";

function issueAuthToken(user) {
  return jwt.sign(
    { user_id: user.user_id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

function publicAuthUser(user) {
  return {
    user_id: user.user_id,
    user_name: user.user_name,
    email: user.email,
    pfp_url: user.pfp_url,
  };
}

function normalizeEmail(email) {
  return typeof email === "string" ? email.toLowerCase() : email;
}

module.exports = { issueAuthToken, publicAuthUser, normalizeEmail };
