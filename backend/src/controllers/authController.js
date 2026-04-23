const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "Missing idToken" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload.email?.toLowerCase();
    const userName = payload.name || "";
    const pfpUrl = payload.picture || "";

    if (!email || !email.endsWith("@sjsu.edu")) {
      return res.status(403).json({ error: "Only SJSU accounts allowed" });
    }

    let userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    let user = userResult.rows[0];

    if (!user) {
      const insertResult = await pool.query(
        `INSERT INTO users (user_name, email, pfp_url, verification_token, verified_at)
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING *`,
        [userName, email, pfpUrl, idToken]
      );

      user = insertResult.rows[0];
    } else {
      const updateResult = await pool.query(
        `UPDATE users
        SET user_name = $1,
            pfp_url = $2,
            verification_token = $3,
            verified_at = NOW(),
            updated_at = NOW()
        WHERE email = $4
        RETURNING *`,
        [userName, pfpUrl, idToken, email]
      );

  user = updateResult.rows[0];
}

    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Google auth successful",
      token,
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email,
        pfp_url: user.pfp_url,
      },
    });
  } catch (err) {
    console.error("Google auth error:", err);
    return res.status(401).json({ error: "Invalid Google token" });
  }
};

module.exports = { googleLogin };