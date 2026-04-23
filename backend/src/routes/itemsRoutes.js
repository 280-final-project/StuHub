const express = require("express");
const router = express.Router();

const {
  getAllItems,
  getItemById,
  createItem
} = require("../controllers/itemsController");

router.get("/", getAllItems);
router.get("/:id", getItemById);
router.post("/", createItem);

module.exports = router;