// Import necessary libraries
require("dotenv").config();
const express = require("express");
const db = require("./config/db");

const app = express();

// Import routes
const assignmentRoutes = require("./routes/assignmentRoutes");
const authRoutes = require("./routes/authRoutes");
const alertRoutes = require("./routes/emergencyAlertRoutes");
const reportRoutes = require("./routes/incidentReportRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes"); // Import userRoutes

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes
app.use("/api/incidents", incidentRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); // User Routes

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

// Error handling middleware (for unexpected errors)
app.use((err, req, res, next) => {
  console.error("❌ An error occurred:", err.message);
  res
    .status(500)
    .json({ message: "An unexpected error occurred", error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
