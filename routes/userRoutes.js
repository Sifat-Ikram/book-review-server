const express = require("express");
const {
  createUser,
  getAllUsers,
  updateUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/user", createUser);
router.get("/user", getAllUsers);
router.patch("/user/:id", updateUser);

module.exports = router;
