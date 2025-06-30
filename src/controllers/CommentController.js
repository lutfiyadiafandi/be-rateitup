const { validationResult } = require("express-validator");
const CommentService = require("../services/CommentService");

class CommentController {
  // Create comment
  async createComment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const userId = req.userId;
    const reviewId = parseInt(req.params.reviewId);
    try {
      const comment = await CommentService.createComment(
        req.body,
        reviewId,
        userId
      );
      res.status(201).send({
        success: true,
        message: "Comment created successfully",
        data: comment,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Find all comments for a review
  async findComments(req, res) {
    const reviewId = parseInt(req.params.reviewId);
    try {
      const comments = await CommentService.findAllComments(reviewId);
      res.status(200).send({
        success: true,
        message: `Get all comments for review ID: ${reviewId} successfully`,
        data: comments,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Find comment by ID
  async findCommentById(req, res) {
    const commentId = parseInt(req.params.id);
    try {
      const comment = await CommentService.findCommentById(commentId);
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: `Comment with ID ${commentId} not found`,
        });
      }
      res.status(200).send({
        success: true,
        message: `Get comment by ID: ${commentId} successfully`,
        data: comment,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Delete comment
  async deleteComment(req, res) {
    const commentId = parseInt(req.params.id);
    try {
      const comment = await CommentService.deleteComment(commentId);
      res.status(200).send({
        success: true,
        message: `Comment with ID: ${commentId} deleted successfully`,
        data: comment,
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

module.exports = new CommentController();
