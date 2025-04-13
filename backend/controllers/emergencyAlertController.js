const db = require("../config/db");

// Create emergency alert
exports.createAlert = async (req, res) => {
  const { user_id, latitude, longitude, emergency_type, status } = req.body;

  try {
    // Insert new alert
    const result = await db.query(
      "INSERT INTO emergency_alerts (user_id, latitude, longitude, emergency_type, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, latitude, longitude, emergency_type, status]
    );

    res.status(201).json({
      message: "Emergency alert created successfully",
      alert: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all emergency alerts
exports.getAllAlerts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM emergency_alerts");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
