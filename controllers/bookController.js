// controllers/bookController.js
const Book = require("../models/bookModel");

// Create a new book
const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: savedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating book",
      error: error.message,
    });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error.message,
    });
  }
};

module.exports = {
  createBook,
  getAllBooks
};
