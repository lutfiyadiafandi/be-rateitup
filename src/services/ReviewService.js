const prisma = require("../../prisma/client");

class ReviewService {
  // Create review
  async createReview(data, restaurantId, userId) {
    const { title, text, rating } = data;
    const review = await prisma.review.create({
      data: {
        title: title,
        text: text,
        rating: rating,
        user_id: userId,
        restaurant_id: restaurantId,
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
    return review;
  }

  // Find all reviews for a restaurant
  async findAllReviews(restaurantId) {
    const reviews = await prisma.review.findMany({
      where: { restaurant_id: restaurantId },
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
    return reviews;
  }

  // Find review by ID
  async findReviewById(reviewId) {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
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
    return review;
  }

  // Update review
  async updateReview(reviewId, data, userId) {
    let review = await prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!review) throw new Error("Review not found");
    if (review.user_id !== userId) throw new Error("Unauthorized");

    const updatedData = {};
    if (data.title) updatedData.title = data.title;
    if (data.text) updatedData.text = data.text;
    if (data.rating) updatedData.rating = data.rating;

    review = await prisma.review.update({
      where: { id: reviewId },
      data: updatedData,
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
    return review;
  }

  // Delete review
  async deleteReview(reviewId, userId) {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!review) throw new Error("Review not found");
    if (review.user_id !== userId) throw new Error("Unauthorized");

    await prisma.review.delete({
      where: { id: reviewId },
    });
    return true;
  }
}

module.exports = new ReviewService();
