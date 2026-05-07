const pool = require("../config/db");
const { serverError } = require("../utils/requestHelpers");

async function fetchState(itemId, userId) {
  const countRow = await pool.query(
    "SELECT COUNT(*)::int AS count FROM event_registrations WHERE item_id = $1",
    [itemId]
  );
  let registered = false;
  if (userId) {
    const r = await pool.query(
      "SELECT 1 FROM event_registrations WHERE item_id = $1 AND user_id = $2",
      [itemId, userId]
    );
    registered = r.rows.length > 0;
  }
  return { count: countRow.rows[0].count, registered };
}

const registerForItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.user_id;

  try {
    const item = await pool.query(
      "SELECT item_id, item_type FROM items WHERE item_id = $1 AND approval_status = 'approved'",
      [id]
    );
    if (item.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (item.rows[0].item_type !== "event") {
      return res.status(400).json({ error: "You can only register for events" });
    }

    // ON CONFLICT DO NOTHING makes this idempotent: registering twice
    // is silently a no-op rather than a 500 from the UNIQUE constraint.
    await pool.query(
      `INSERT INTO event_registrations (user_id, item_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, item_id) DO NOTHING`,
      [userId, id]
    );

    const state = await fetchState(id, userId);
    res.status(201).json(state);
  } catch (err) {
    serverError(res, err, "REGISTER_ERROR");
  }
};

const unregisterFromItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.user_id;

  try {
    await pool.query(
      "DELETE FROM event_registrations WHERE user_id = $1 AND item_id = $2",
      [userId, id]
    );
    const state = await fetchState(id, userId);
    res.json(state);
  } catch (err) {
    serverError(res, err, "UNREGISTER_ERROR");
  }
};

module.exports = { registerForItem, unregisterFromItem };
