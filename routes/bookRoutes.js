// routes/bookRoutes.js
const express = require("express");
const router = express.Router();

const {
  createBook,
  getAllBooks
} = require("../controllers/bookController");

// Route to create a new book
router.post("/book", createBook);

// Route to get all books
router.get("/book", getAllBooks);

module.exports = router;
