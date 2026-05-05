const pool = require("../config/db");

function publicUser(row) {
  if (!row) return null;
  return {
    user_id: row.user_id,
    user_name: row.user_name,
    pfp_url: row.pfp_url,
    bio: row.bio,
    created_at: row.created_at,
  };
}

const getMe = async (req, res) => {
  try {
    const u = await pool.query(
      `SELECT user_id, user_name, email, pfp_url, bio, created_at
       FROM users WHERE user_id = $1`,
      [req.user.user_id]
    );
    if (u.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const items = await pool.query(
      `SELECT * FROM items WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.user.user_id]
    );

    const reviews = await pool.query(
      `SELECT r.*, i.item_name, i.item_id AS i_item_id
       FROM reviews r
       LEFT JOIN items i ON r.item_id = i.item_id
       WHERE r.user_id = $1
       ORDER BY r.created_at DESC`,
      [req.user.user_id]
    );

    const registrations = await pool.query(
      `SELECT i.item_id, i.item_name, i.item_desc, i.timeframe, i.loc_content,
              i.img_url, i.item_type, i.approval_status, i.ai_summary,
              er.registered_at
       FROM event_registrations er
       JOIN items i ON er.item_id = i.item_id
       WHERE er.user_id = $1
       ORDER BY er.registered_at DESC`,
      [req.user.user_id]
    );

    res.json({
      user: {
        ...publicUser(u.rows[0]),
        email: u.rows[0].email,
      },
      items: items.rows.map((row) => ({
        id: row.item_id,
        title: row.item_name,
        description: row.item_desc,
        timeframe: row.timeframe,
        location: row.loc_content,
        image: row.img_url,
        item_type: row.item_type,
        approval_status: row.approval_status,
        ai_summary: row.ai_summary,
        created_at: row.created_at,
      })),
      reviews: reviews.rows.map((row) => ({
        id: row.review_id,
        header: row.review_header,
        desc: row.review_desc,
        rating: row.rating,
        item_id: row.item_id,
        item_name: row.item_name,
        created_at: row.created_at,
      })),
      registrations: registrations.rows.map((row) => ({
        id: row.item_id,
        title: row.item_name,
        description: row.item_desc,
        timeframe: row.timeframe,
        location: row.loc_content,
        image: row.img_url,
        item_type: row.item_type,
        approval_status: row.approval_status,
        ai_summary: row.ai_summary,
        registered_at: row.registered_at,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const u = await pool.query(
      `SELECT user_id, user_name, pfp_url, bio, created_at
       FROM users WHERE user_id = $1`,
      [id]
    );
    if (u.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const items = await pool.query(
      `SELECT * FROM items
       WHERE user_id = $1 AND approval_status = 'approved'
       ORDER BY created_at DESC`,
      [id]
    );

    res.json({
      user: publicUser(u.rows[0]),
      items: items.rows.map((row) => ({
        id: row.item_id,
        title: row.item_name,
        timeframe: row.timeframe,
        location: row.loc_content,
        image: row.img_url,
        item_type: row.item_type,
        ai_summary: row.ai_summary,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateMe = async (req, res) => {
  const { user_name, bio } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users
       SET user_name = COALESCE($1, user_name),
           bio = COALESCE($2, bio),
           updated_at = NOW()
       WHERE user_id = $3
       RETURNING user_id, user_name, email, pfp_url, bio, created_at`,
      [user_name ?? null, bio ?? null, req.user.user_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ ...publicUser(result.rows[0]), email: result.rows[0].email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getMe, getUserById, updateMe };
