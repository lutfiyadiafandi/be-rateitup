const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/ReviewController");
const { verifyToken, authorizeRole } = require("../middlewares/auth");
const {
  validateCreateReview,
  validateUpdateReview,
} = require("../utils/validators/review");

// Review routes
router.post(
  "/restaurants/:restaurantId/reviews",
  verifyToken,
  authorizeRole("user", "admin"),
  validateCreateReview,
  ReviewController.createReview
);
router.get("/restaurants/:restaurantId/reviews", ReviewController.findReviews);
router.get("/reviews/:id", ReviewController.findReviewById);
router.put(
  "/reviews/:id",
  verifyToken,
  authorizeRole("user", "admin"),
  validateUpdateReview,
  ReviewController.updateReview
);
router.delete(
  "/reviews/:id",
  verifyToken,
  authorizeRole("user", "admin"),
  ReviewController.deleteReview
);

module.exports = router;
