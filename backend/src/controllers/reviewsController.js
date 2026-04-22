const pool = require("../config/db");

const getReviewsByItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM reviews WHERE item_id = $1 ORDER BY created_at DESC",
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const createReview = async (req, res) => {
  const { review_header, review_desc, user_id, item_id } = req.body;

  if (!item_id) {
    return res.status(400).json({ error: "item_id is required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO reviews (review_header, review_desc, user_id, item_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        review_header || null,
        review_desc || null,
        user_id || null,
        item_id
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getReviewsByItem, createReview };