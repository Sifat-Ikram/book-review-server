const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(reviewRoutes);
app.use(bookRoutes);

module.exports = app;
