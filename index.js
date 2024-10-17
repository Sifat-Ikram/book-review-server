const app = require("./app");
const connectDB = require("./config/db");

const port = process.env.PORT || 4321;

// Connect to the database
connectDB();


app.get("/", async (req, res) => {
  res.send("Book review is running");
});

// Start the server
app.listen(port, () => {
  console.log(`Book review is running on port: ${port}`);
});
