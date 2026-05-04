const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const {
  getReviewsByItem,
  createReview,
  deleteReview
} = require("../controllers/reviewsController");

router.get("/items/:id/reviews", getReviewsByItem);
router.post("/reviews", requireAuth, createReview);
router.delete("/reviews/:id", requireAuth, deleteReview);

module.exports = router;