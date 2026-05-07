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
const { findUserIdByEmail, findOrCreateUser } = require("./lib/seedHelpers");

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
      if (await findUserIdByEmail(pool, u.email)) {
        console.log(`  skip (exists): ${u.email}`);
        skipped += 1;
        continue;
      }
      const password_hash = await bcrypt.hash(u.password, SALT_ROUNDS);
      await findOrCreateUser(pool, {
        user_name: u.user_name,
        email: u.email,
        bio: u.bio,
        password_hash,
      });
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
