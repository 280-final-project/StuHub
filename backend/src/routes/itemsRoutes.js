const { requireAuth } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const {
  getAllItems,
  getItemById,
  createItem,
  getPendingItems,
  updateItemApprovalStatus,
  getAllItemsForAdmin,
  updateItem,
  deleteItem
} = require("../controllers/itemsController");

router.get("/", getAllItems);
router.get("/pending", requireAuth, getPendingItems);
router.get("/admin/all", requireAuth, getAllItemsForAdmin);
router.get("/:id", getItemById);
router.post("/", requireAuth, createItem);
router.patch("/:id/approval", requireAuth, updateItemApprovalStatus);
router.patch("/:id", requireAuth, updateItem);
router.delete("/:id", requireAuth, deleteItem);

module.exports = router;