const pool = require("../config/db");
const { parseAdminFlag } = require("../utils/requestHelpers");

function formatReview(row) {
  return {
    id: row.review_id,
    header: row.review_header,
    desc: row.review_desc,
    rating: row.rating,
    user_id: row.user_id,
    user_name: row.user_name,
    pfp_url: row.pfp_url,
    item_id: row.item_id,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

const getReviewsByItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT r.*, u.user_name, u.pfp_url
       FROM reviews r
       LEFT JOIN users u ON r.user_id = u.user_id
       WHERE r.item_id = $1
       ORDER BY r.created_at DESC`,
      [id]
    );

    res.json(result.rows.map(formatReview));
  } catch (err) {
    serverError(res, err);
  }
};

const createReview = async (req, res) => {
  const { review_header, review_desc, item_id, rating } = req.body;
  const user_id = req.user.user_id;

  if (!item_id) {
    return res.status(400).json({ error: "item_id is required" });
  }

  let parsedRating = null;
  if (rating !== undefined && rating !== null && rating !== "") {
    const n = Number(rating);
    if (!Number.isInteger(n) || n < 1 || n > 5) {
      return res.status(400).json({ error: "rating must be an integer between 1 and 5" });
    }
    parsedRating = n;
  }

  try {
    const inserted = await pool.query(
      `INSERT INTO reviews (review_header, review_desc, user_id, item_id, rating)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING review_id`,
      [review_header || null, review_desc || null, user_id, item_id, parsedRating]
    );

    const result = await pool.query(
      `SELECT r.*, u.user_name, u.pfp_url
       FROM reviews r
       LEFT JOIN users u ON r.user_id = u.user_id
       WHERE r.review_id = $1`,
      [inserted.rows[0].review_id]
    );

    res.status(201).json(formatReview(result.rows[0]));
  } catch (err) {
    serverError(res, err);
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;
  const isAdmin = parseAdminFlag(req);

  try {
    const existing = await pool.query(
      `SELECT user_id FROM reviews WHERE review_id = $1`,
      [id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (!isAdmin && existing.rows[0].user_id !== user_id) {
      return res.status(403).json({ error: "Not authorized to delete this review" });
    }

    await pool.query(`DELETE FROM reviews WHERE review_id = $1`, [id]);
    res.json({ message: "Review deleted" });
  } catch (err) {
    serverError(res, err);
  }
};

module.exports = { getReviewsByItem, createReview, deleteReview };
