// One-off seed script for demo data.
//
// Idempotent: each item is keyed on (item_name, item_type) and skipped
// if already present. Events get an AI summary via summarizeText;
// deals and resources skip the LLM call (their descriptions are
// already one-liners).
//
// Usage:  node scripts/seed_demo_data.js
require("dotenv").config();
const pool = require("../src/config/db");
const summarizeText = require("../src/utils/summarizeText");
const { SYSTEM_USER, EVENTS, DEALS, RESOURCES } = require("./seed_demo_fixtures");

async function ensureSystemUser() {
  const existing = await pool.query(
    "SELECT user_id FROM users WHERE email = $1",
    [SYSTEM_USER.email]
  );
  if (existing.rows.length) return existing.rows[0].user_id;

  const inserted = await pool.query(
    `INSERT INTO users (user_name, email, pfp_url, bio)
     VALUES ($1, $2, $3, $4)
     RETURNING user_id`,
    [SYSTEM_USER.user_name, SYSTEM_USER.email, SYSTEM_USER.pfp_url, SYSTEM_USER.bio]
  );
  return inserted.rows[0].user_id;
}

async function existingNames(item_type) {
  const r = await pool.query(
    "SELECT item_name FROM items WHERE item_type = $1",
    [item_type]
  );
  return new Set(r.rows.map((row) => row.item_name));
}

async function seedType(items, item_type, userId, { runSummary }) {
  const already = await existingNames(item_type);
  let inserted = 0;
  for (const item of items) {
    if (already.has(item.item_name)) {
      console.log(`  skip (exists): ${item.item_name}`);
      continue;
    }
    const ai_summary = runSummary
      ? await summarizeText(item.item_name, item.item_desc)
      : null;
    await pool.query(
      `INSERT INTO items
        (item_name, item_desc, is_timed, timeframe, loc_content, img_url,
         user_id, approval_status, ai_summary, item_type, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'approved', $8, $9, $10)`,
      [
        item.item_name,
        item.item_desc || null,
        item.is_timed ?? false,
        item.timeframe || null,
        item.loc_content || null,
        item.img_url || null,
        userId,
        ai_summary,
        item_type,
        item.metadata || null,
      ]
    );
    inserted += 1;
    console.log(`  + ${item_type}: ${item.item_name}${ai_summary ? " (with summary)" : ""}`);
    if (runSummary) await new Promise((r) => setTimeout(r, 1500));
  }
  return inserted;
}

(async () => {
  try {
    const userId = await ensureSystemUser();
    console.log(`system user_id = ${userId}`);

    console.log("\nseeding events…");
    const e = await seedType(EVENTS, "event", userId, { runSummary: true });

    console.log("\nseeding deals…");
    const d = await seedType(DEALS, "deal", userId, { runSummary: false });

    console.log("\nseeding resources…");
    const r = await seedType(RESOURCES, "resource", userId, { runSummary: false });

    console.log(`\nDone. inserted: events=${e}, deals=${d}, resources=${r}`);
  } catch (err) {
    console.error("seed failed:", err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
