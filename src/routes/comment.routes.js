const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const { verifyToken, authorizeRole } = require("../middlewares/auth");
const { validateCreateComment } = require("../utils/validators/comment");

// Review routes
router.post(
  "/reviews/:reviewId/comments",
  verifyToken,
  authorizeRole("user", "admin"),
  validateCreateComment,
  CommentController.createComment
);
router.get("/reviews/:reviewId/comments", CommentController.findComments);
router.get("/comments/:id", CommentController.findCommentById);
router.delete(
  "/comments/:id",
  verifyToken,
  authorizeRole("user", "admin"),
  CommentController.deleteComment
);

module.exports = router;
