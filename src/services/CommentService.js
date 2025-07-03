const prisma = require("../../prisma/client");

class CommentService {
  // Create comment
  async createComment(data, reviewId, userId) {
    const { text } = data;
    const comment = await prisma.comment.create({
      data: {
        text: text,
        user_id: userId,
        review_id: reviewId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
    return comment;
  }

  // Find all comments for a review
  async findAllComments(reviewId) {
    const comments = await prisma.comment.findMany({
      where: { review_id: reviewId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });
    return comments;
  }

  // Find comment by ID
  async findCommentById(commentId) {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
    return comment;
  }

  // Delete comment only admin can delete a comment
  async deleteComment(commentId) {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw new Error("Comment not found");

    await prisma.comment.delete({
      where: { id: commentId },
    });
    return true;
  }
}

module.exports = new CommentService();
