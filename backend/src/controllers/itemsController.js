const formatItem = require("../utils/formatItem");
const pool = require("../config/db");

const getAllItems = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT i.*, u.user_name, u.pfp_url
      FROM items i
      LEFT JOIN users u ON i.user_id = u.user_id
      WHERE i.approval_status = 'approved'
      ORDER BY i.created_at DESC
    `);

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
      `SELECT i.*, u.user_name, u.pfp_url
      FROM items i
      LEFT JOIN users u ON i.user_id = u.user_id
      WHERE i.item_id = $1 AND i.approval_status = 'approved'`,
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
    loc_content,
    img_url
  } = req.body;

  const user_id = req.user.user_id;


  // console.log('HEADERS:', req.headers);                       //<== temp to check if it is reaching admin 
  // console.log('IS ADMIN HEADER:', req.headers['x-admin']);    //<== temp to check if it is reaching admin  

  
  if (!item_name || !loc_content) {
    return res.status(400).json({
      error: "item_name and loc_content are required"
    });
  }
  
  if (typeof is_timed !== "boolean" && is_timed !== undefined) {
    return res.status(400).json({
      error: "is_timed must be true or false"
    });
  }
  
  try {
    const isAdmin = req.headers['x-admin'] === 'true';
    console.log('FINAL APPROVAL STATUS:', isAdmin ? 'approved' : 'pending');  

    const result = await pool.query(
      `INSERT INTO items
      (item_name, item_desc, is_timed, timeframe, loc_content, img_url, user_id, approval_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        item_name,
        item_desc || null,
        is_timed ?? null,
        timeframe || null,
        loc_content,
        img_url || null,
        user_id,
        isAdmin ? 'approved' : 'pending'
      ]
    );

    res.status(201).json(formatItem(result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getPendingItems = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT i.*, u.user_name, u.pfp_url
      FROM items i
      LEFT JOIN users u ON i.user_id = u.user_id
      WHERE i.approval_status = 'pending'
      ORDER BY i.created_at DESC
    `);

    res.json(result.rows.map(formatItem));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateItemApprovalStatus = async (req, res) => {
  const { id } = req.params;
  const { approval_status } = req.body;

  if (!['approved', 'rejected'].includes(approval_status)) {
    return res.status(400).json({ error: "approval_status must be approved or rejected" });
  }

  try {
    const result = await pool.query(
      `UPDATE items
       SET approval_status = $1,
           updated_at = NOW()
       WHERE item_id = $2
       RETURNING *`,
      [approval_status, id]
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

const getAllItemsForAdmin = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT i.*, u.user_name, u.pfp_url
      FROM items i
      LEFT JOIN users u ON i.user_id = u.user_id
      ORDER BY i.created_at DESC
    `);

    res.json(result.rows.map(formatItem));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  getPendingItems,
  updateItemApprovalStatus,
  getAllItemsForAdmin
};