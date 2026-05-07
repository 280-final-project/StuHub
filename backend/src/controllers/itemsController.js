const formatItem = require("../utils/formatItem");
const summarizeText = require("../utils/summarizeText");
const pool = require("../config/db");
const {
  parseAdminFlag,
  parseMetadata,
  parseIsTimed,
  serverError,
  ensureOwnerOrAdmin,
} = require("../utils/requestHelpers");

const ITEM_TYPES = ["event", "deal", "resource", "place"];

const getAllItems = async (req, res) => {
  try {
    const { type, q, from, to, location } = req.query;

    if (type && !ITEM_TYPES.includes(type)) {
      return res.status(400).json({ error: `type must be one of: ${ITEM_TYPES.join(", ")}` });
    }

    const params = [];
    const clauses = ["i.approval_status = 'approved'"];

    if (type) {
      params.push(type);
      clauses.push(`i.item_type = $${params.length}`);
    }

    if (q && q.trim()) {
      params.push(`%${q.trim()}%`);
      const idx = params.length;
      clauses.push(`(i.item_name ILIKE $${idx} OR i.item_desc ILIKE $${idx})`);
    }

    if (location && location.trim()) {
      params.push(`%${location.trim()}%`);
      clauses.push(`i.loc_content ILIKE $${params.length}`);
    }

    if (from) {
      params.push(from);
      clauses.push(`i.timeframe >= $${params.length}`);
    }
    if (to) {
      params.push(to);
      clauses.push(`i.timeframe <= $${params.length}`);
    }

    const result = await pool.query(
      `SELECT i.*, u.user_name, u.pfp_url
       FROM items i
       LEFT JOIN users u ON i.user_id = u.user_id
       WHERE ${clauses.join(" AND ")}
       ORDER BY i.created_at DESC`,
      params
    );

    res.json(result.rows.map(formatItem));
  } catch (err) {
    serverError(res, err);
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT i.*, u.user_name, u.pfp_url,
              (SELECT COUNT(*)::int FROM event_registrations er WHERE er.item_id = i.item_id) AS registration_count
       FROM items i
       LEFT JOIN users u ON i.user_id = u.user_id
       WHERE i.item_id = $1 AND i.approval_status = 'approved'`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    const row = result.rows[0];
    const formatted = formatItem(row);
    formatted.registration_count = row.registration_count || 0;

    if (req.user?.user_id) {
      const r = await pool.query(
        "SELECT 1 FROM event_registrations WHERE item_id = $1 AND user_id = $2",
        [id, req.user.user_id]
      );
      formatted.is_registered = r.rows.length > 0;
    } else {
      formatted.is_registered = false;
    }

    res.json(formatted);
  } catch (err) {
    serverError(res, err);
  }
};

const createItem = async (req, res) => {
  try {
    const {
      item_name,
      item_desc,
      is_timed,
      timeframe,
      loc_content,
      img_url: bodyImgUrl,
      item_type: rawItemType,
      metadata: rawMetadata,
    } = req.body;

    const item_type = rawItemType || "event";
    if (!ITEM_TYPES.includes(item_type)) {
      return res.status(400).json({ error: `item_type must be one of: ${ITEM_TYPES.join(", ")}` });
    }

    const metaResult = parseMetadata(rawMetadata);
    if (!metaResult.ok) {
      return res.status(400).json({ error: metaResult.error });
    }
    const metadata = metaResult.value === undefined ? null : metaResult.value;

    const user_id = req.user?.user_id;
    const img_url = req.file ? req.file.path : (bodyImgUrl || null);

    const isTimedResult = parseIsTimed(is_timed);
    if (!isTimedResult.ok) {
      return res.status(400).json({ error: isTimedResult.error });
    }
    const parsedIsTimed = isTimedResult.value;

    if (!item_name || !loc_content) {
      return res.status(400).json({
        error: "item_name and loc_content are required"
      });
    }

    if (!user_id) {
      return res.status(401).json({
        error: "User not authenticated"
      });
    }

    const isAdmin = parseAdminFlag(req);

    const ai_summary = item_type === "event" ? await summarizeText(item_name, item_desc) : null;

    const result = await pool.query(
      `INSERT INTO items
       (item_name, item_desc, is_timed, timeframe, loc_content, img_url, user_id, approval_status, ai_summary, item_type, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        item_name,
        item_desc || null,
        parsedIsTimed,
        timeframe || null,
        loc_content,
        img_url,
        user_id,
        isAdmin ? "approved" : "pending",
        ai_summary,
        item_type,
        metadata
      ]
    );

    res.status(201).json(formatItem(result.rows[0]));
  } catch (err) {
    serverError(res, err, "CREATE ITEM ERROR");
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
    serverError(res, err);
  }
};

const updateItemApprovalStatus = async (req, res) => {
  const { id } = req.params;
  const { approval_status } = req.body;

  if (!["pending", "approved", "rejected"].includes(approval_status)) {
    return res.status(400).json({
      error: "approval_status must be pending, approved, or rejected"
    });
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
    serverError(res, err);
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
    serverError(res, err);
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const {
    item_name,
    item_desc,
    timeframe,
    loc_content,
    img_url,
    metadata: rawMetadata,
  } = req.body;
  const user_id = req.user.user_id;
  const isAdmin = parseAdminFlag(req);

  const metaResult = parseMetadata(rawMetadata);
  if (!metaResult.ok) {
    return res.status(400).json({ error: metaResult.error });
  }
  const metadata = metaResult.value;

  try {
    const existing = await pool.query(
      `SELECT * FROM items WHERE item_id = $1`,
      [id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    const item = existing.rows[0];

    if (!ensureOwnerOrAdmin(res, { ownerId: item.user_id, requesterId: user_id, isAdmin, action: "edit this item" })) {
      return;
    }

    const nextName = item_name ?? item.item_name;
    const nextDesc = item_desc ?? item.item_desc;
    const nameOrDescChanged =
      (item_name !== undefined && item_name !== item.item_name) ||
      (item_desc !== undefined && item_desc !== item.item_desc);
    const nextSummary = item.item_type === "event" && nameOrDescChanged
      ? await summarizeText(nextName, nextDesc)
      : item.ai_summary;
    const nextMetadata = metadata !== undefined ? metadata : item.metadata;

    const result = await pool.query(
      `UPDATE items
       SET item_name = $1,
           item_desc = $2,
           timeframe = $3,
           loc_content = $4,
           img_url = $5,
           ai_summary = $6,
           metadata = $7,
           updated_at = NOW()
       WHERE item_id = $8
       RETURNING *`,
      [
        nextName,
        nextDesc,
        timeframe ?? item.timeframe,
        loc_content ?? item.loc_content,
        img_url ?? item.img_url,
        nextSummary,
        nextMetadata,
        id
      ]
    );

    res.json(formatItem(result.rows[0]));
  } catch (err) {
    serverError(res, err);
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;
  const isAdmin = parseAdminFlag(req);

  try {
    const existing = await pool.query(
      `SELECT * FROM items WHERE item_id = $1`,
      [id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    const item = existing.rows[0];

    if (!ensureOwnerOrAdmin(res, { ownerId: item.user_id, requesterId: user_id, isAdmin, action: "delete this item" })) {
      return;
    }

    await pool.query(`DELETE FROM items WHERE item_id = $1`, [id]);

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    serverError(res, err);
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  getPendingItems,
  updateItemApprovalStatus,
  getAllItemsForAdmin,
  updateItem,
  deleteItem
};