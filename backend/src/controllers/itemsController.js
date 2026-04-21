const formatItem = require("../utils/formatItem");
const pool = require("../config/db");

const getAllItems = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items");
    res.json(result.rows.map(formatItem));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM items WHERE item_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(formatItem(result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const createItem = async (req, res) => {
  const {
    item_name,
    item_desc,
    is_timed,
    timeframe,
    loc_is_coordinate,
    loc_content,
    img_url
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO items
      (item_name, item_desc, is_timed, timeframe, loc_is_coordinate, loc_content, img_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        item_name,
        item_desc,
        is_timed,
        timeframe,
        loc_is_coordinate,
        loc_content,
        img_url
      ]
    );

    res.status(201).json(formatItem(result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllItems, getItemById, createItem };