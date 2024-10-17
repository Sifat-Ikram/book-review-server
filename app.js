const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://book-house-1234.web.app",
        "https://book-house-1234.firebaseapp.com",
      ],
      methods: ["GET", "POST", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
  
app.use(express.json());

// jwt api
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = await jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

// Routes
app.use(userRoutes);
app.use(reviewRoutes);
app.use(bookRoutes);

module.exports = app;
