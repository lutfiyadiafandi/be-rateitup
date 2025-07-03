const { validationResult } = require("express-validator");
const ReviewService = require("../services/ReviewService");
const camelcaseKeys = require("camelcase-keys");

class ReviewController {
  // Create review
  async createReview(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const userId = req.userId;
    const restaurantId = parseInt(req.params.restaurantId);
    try {
      const review = await ReviewService.createReview(
        req.body,
        restaurantId,
        userId
      );
      res.status(201).send({
        success: true,
        message: "Review created successfully",
        data: camelcaseKeys(review, { deep: true }),
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Find all reviews for a restaurant
  async findReviews(req, res) {
    const restaurantId = parseInt(req.params.restaurantId);
    try {
      const reviews = await ReviewService.findAllReviews(restaurantId);
      res.status(200).send({
        success: true,
        message: `Get all reviews for restaurant ID: ${restaurantId} successfully`,
        data: camelcaseKeys(reviews, { deep: true }),
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Find review by ID
  async findReviewById(req, res) {
    const reviewId = parseInt(req.params.id);
    try {
      const review = await ReviewService.findReviewById(reviewId);
      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }
      res.status(200).send({
        success: true,
        message: `Get review by ID: ${reviewId} successfully`,
        data: camelcaseKeys(review, { deep: true }),
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Update review
  async updateReview(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const reviewId = parseInt(req.params.id);
    const userId = req.userId;
    try {
      const review = await ReviewService.updateReview(
        reviewId,
        req.body,
        userId
      );
      res.status(200).send({
        success: true,
        message: `Review with ID ${reviewId} updated successfully`,
        data: camelcaseKeys(review, { deep: true }),
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Delete review
  async deleteReview(req, res) {
    const reviewId = parseInt(req.params.id);
    const userId = req.userId;
    try {
      await ReviewService.deleteReview(reviewId, userId);
      res.status(200).send({
        success: true,
        message: `Review with ID ${reviewId} deleted successfully`,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

module.exports = new ReviewController();
