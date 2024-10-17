// models/bookModel.js

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    book_title: {
      type: String,
      required: true,
    },
    authors: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema, "books");

module.exports = Book;
