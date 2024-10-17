const User = require("../models/userModel");
const mongoose = require("mongoose");

const createUser = async (req, res) => {
  try {
    const user = req.body;

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      // Return a conflict error if the email is already in use
      return res
        .status(409)
        .send({ error: "User with this email already exists." });
    }

    // If no duplicate, proceed with creating the user
    const result = await User.create(user);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const item = req.body;

    const updatedDoc = {
      $set: {
        username: item.username,
        email: item.email,
      },
    };

    const result = await User.findByIdAndUpdate(id, updatedDoc, { new: true });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
};
