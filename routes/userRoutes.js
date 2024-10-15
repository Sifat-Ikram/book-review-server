const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createNewUser,
  getUserById,
} = require("../controllers/userController");

// Get all users
router.get("/", getAllUsers);

// Create a new user
router.post("/", createNewUser);

// get user by ID
router.get("/:id", getUserById);

module.exports = router;
