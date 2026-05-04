const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const { getMe, getUserById, updateMe } = require("../controllers/usersController");

router.get("/me", requireAuth, getMe);
router.patch("/me", requireAuth, updateMe);
router.get("/:id", getUserById);

module.exports = router;
