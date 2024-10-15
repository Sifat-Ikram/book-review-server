const User = require("../models/userModel");
const jwtHelper = require("../jwt/jwtHelpers");

// Register user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({ token: jwtHelper.generateToken(user._id) });
  } catch (error) {
    res.status(400).json({ error: "Registration failed" });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ token: jwtHelper.generateToken(user._id) });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(400).json({ error: "Login failed" });
  }
};
