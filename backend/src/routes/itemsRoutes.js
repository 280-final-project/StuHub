const { requireAuth } = require("../middleware/authMiddleware");
const optionalAuth = require("../middleware/optionalAuth");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

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
const { registerForItem, unregisterFromItem } = require("../controllers/registrationsController");

router.get("/", getAllItems);
router.get("/pending", requireAuth, getPendingItems);
router.get("/admin/all", requireAuth, getAllItemsForAdmin);
router.get("/:id", optionalAuth, getItemById);
router.post("/", requireAuth, upload.single("image"), createItem);
router.patch("/:id/approval", requireAuth, updateItemApprovalStatus);
router.patch("/:id", requireAuth, updateItem);
router.delete("/:id", requireAuth, deleteItem);

router.post("/:id/register", requireAuth, registerForItem);
router.delete("/:id/register", requireAuth, unregisterFromItem);

module.exports = router;