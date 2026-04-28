const { requireAuth } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const {
  getAllItems,
  getItemById,
  createItem,
  getPendingItems,
  updateItemApprovalStatus
} = require("../controllers/itemsController");

router.get("/", getAllItems);
router.get("/pending", requireAuth, getPendingItems);
router.get("/:id", getItemById);
router.post("/", requireAuth, createItem);
router.patch("/:id/approval", requireAuth, updateItemApprovalStatus);

module.exports = router;