const express = require("express");
const router = express.Router();

const {
  getReviewsByItem,
  createReview
} = require("../controllers/reviewsController");

router.get("/items/:id/reviews", getReviewsByItem);
router.post("/reviews", createReview);

module.exports = router;