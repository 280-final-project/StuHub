const jwt = require("jsonwebtoken");

// Decode the JWT if present and valid; otherwise pass through unauth'd.
// Lets a public endpoint personalize the response when the caller
// happens to be signed in (e.g. include is_registered on item detail).
const optionalAuth = (req, _res, next) => {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    const token = header.slice(7);
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      // ignore — treat as anonymous
    }
  }
  next();
};

module.exports = optionalAuth;
