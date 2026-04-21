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

    const email = payload.email;

    // only allow SJSU emails
    if (!email.endsWith("@sjsu.edu")) {
      return res.status(403).json({ error: "Only SJSU accounts allowed" });
    }

    res.json({
      message: "Google auth successful",
      email,
      name: payload.name,
      picture: payload.picture
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Google token" });
  }
};

module.exports = { googleLogin };