// One-off seed script for demo accounts.
//
// Idempotent: checks for each email and only inserts if missing.
// Passwords are bcrypt-hashed exactly the same way the signup
// controller hashes them (SALT_ROUNDS=10), so logins work via
// POST /auth/login with the email/password listed in DEMO_USERS.md.
//
// Usage:  node backend/scripts/seed_demo_users.js
require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("../src/config/db");

const SALT_ROUNDS = 10;

const USERS = [
  {
    user_name: "Demo Admin",
    email: "demo.admin@stuhub.app",
    password: "Admin@2026",
    bio: "Demo admin account — approves events, manages content.",
  },
  {
    user_name: "Demo Student",
    email: "demo.student@stuhub.app",
    password: "Student@2026",
    bio: "Demo student account for browsing, posting events, and writing reviews.",
  },
  {
    user_name: "Demo Poster",
    email: "demo.poster@stuhub.app",
    password: "Poster@2026",
    bio: "Demo account for showing multi-user behavior (cross-user reviews, etc.).",
  },
];

(async () => {
  let inserted = 0;
  let skipped = 0;
  try {
    for (const u of USERS) {
      const existing = await pool.query(
        "SELECT user_id FROM users WHERE email = $1",
        [u.email]
      );
      if (existing.rows.length) {
        console.log(`  skip (exists): ${u.email}`);
        skipped += 1;
        continue;
      }
      const hash = await bcrypt.hash(u.password, SALT_ROUNDS);
      await pool.query(
        `INSERT INTO users (user_name, email, password_hash, bio, created_at)
         VALUES ($1, $2, $3, $4, NOW())`,
        [u.user_name, u.email, hash, u.bio]
      );
      console.log(`  + ${u.email}  (password: ${u.password})`);
      inserted += 1;
    }
    console.log(`\nDone. inserted: ${inserted}, skipped: ${skipped}`);
  } catch (err) {
    console.error("seed failed:", err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
