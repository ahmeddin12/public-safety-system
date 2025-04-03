// Import necessary libraries
require("dotenv").config();
const express = require("express");
const db = require("./config/db");

const app = express();
app.use(express.json());

// Test route to verify database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()"); // Simple query to test the connection
    res.status(200).json({
      message: "Database connected successfully!",
      time: result.rows[0],
    });
  } catch (err) {
    console.error("❌ Error querying database:", err);
    res
      .status(500)
      .json({ message: "Error connecting to database", error: err });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
