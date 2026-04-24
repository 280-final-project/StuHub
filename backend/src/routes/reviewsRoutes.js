const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const {
  getReviewsByItem,
  createReview
} = require("../controllers/reviewsController");

router.get("/items/:id/reviews", getReviewsByItem);
//router.post("/reviews", requireAuth, createReview);


router.post("/reviews", (req, res, next) => {
  req.user = { user_id: 5 };
  next();
}, createReview);

module.exports = router;