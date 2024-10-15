// controllers/bookReviewController.js
const BookReview = require("../models/reviewModel");

// Add a new book review
const addBookReview = async (req, res) => {
  const { bookTitle, author, reviewText, rating } = req.body;
  const userId = req.user._id;

  try {
    const newReview = new BookReview({
      userId,
      bookTitle,
      author,
      reviewText,
      rating,
    });

    await newReview.save();
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error });
  }
};

// View all book reviews
const viewBookReviews = async (req, res) => {
  try {
    const reviews = await BookReview.find().populate("userId", "username"); // Populate user data
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};

// Edit a book review
const editBookReview = async (req, res) => {
  const { reviewId } = req.params;
  const { bookTitle, author, reviewText, rating } = req.body;
  const userId = req.user._id;

  try {
    const review = await BookReview.findOne({ _id: reviewId, userId });

    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found or not authorized" });
    }

    review.bookTitle = bookTitle;
    review.author = author;
    review.reviewText = reviewText;
    review.rating = rating;
    review.updatedAt = Date.now();

    await review.save();
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Failed to update review", error });
  }
};

// Delete a book review
const deleteBookReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user._id;

  try {
    const review = await BookReview.findOne({ _id: reviewId, userId });

    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found or not authorized" });
    }

    await review.remove();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review", error });
  }
};

module.exports = {
  addBookReview,
  viewBookReviews,
  editBookReview,
  deleteBookReview,
};
