// Shared helpers for the seed scripts in backend/scripts/.
// Idempotent insert pattern: look up by email, return id if present,
// otherwise insert and return the new id.

async function findUserIdByEmail(pool, email) {
  const r = await pool.query(
    "SELECT user_id FROM users WHERE email = $1",
    [email]
  );
  return r.rows[0]?.user_id ?? null;
}

async function findOrCreateUser(pool, { user_name, email, pfp_url = null, bio = null, password_hash = null }) {
  const existing = await findUserIdByEmail(pool, email);
  if (existing) return { user_id: existing, created: false };

  const inserted = await pool.query(
    `INSERT INTO users (user_name, email, pfp_url, bio, password_hash, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW())
     RETURNING user_id`,
    [user_name, email, pfp_url, bio, password_hash]
  );
  return { user_id: inserted.rows[0].user_id, created: true };
}

module.exports = { findUserIdByEmail, findOrCreateUser };
