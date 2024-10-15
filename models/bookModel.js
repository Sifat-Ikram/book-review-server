const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  book_title: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

const Book = mongoose.model("Book", bookSchema, "books");

module.exports = Book;
