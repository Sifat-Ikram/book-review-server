// routes/bookReviewRoutes.js
const express = require("express");
const router = express.Router();
const {
  addBookReview,
  viewBookReviews,
  editBookReview,
  deleteBookReview,
} = require("../controllers/reviewController");

// Add a new book review (logged-in users only)
router.post("/", addBookReview);

// View all book reviews (open to all users)
router.get("/", viewBookReviews);

// Edit a book review (only the owner of the review can edit)
router.put("/:reviewId", editBookReview);

// Delete a book review (only the owner of the review can delete)
router.delete("/:reviewId", deleteBookReview);

module.exports = router;
