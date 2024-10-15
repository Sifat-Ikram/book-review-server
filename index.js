const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 4321;
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const booksRoutes = require("./routes/bookRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/review", reviewRoutes);
app.use("/book", booksRoutes);

app.get("/", (req, res) => {
  res.send("server is running");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
