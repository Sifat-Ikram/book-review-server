const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    getBookById,
  } = require('../controllers/bookController');

// Get all books
router.get('/', getAllBooks);

// Get a book by ID
router.get('/:id', getBookById);

module.exports = router;