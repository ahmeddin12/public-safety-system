const db = require("../config/db");

// Create an incident
exports.createIncident = async (req, res) => {
  const { alert_id, responder_id, description, status } = req.body;

  try {
    // Insert new incident
    const result = await db.query(
      "INSERT INTO incidents (alert_id, responder_id, description, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [alert_id, responder_id, description, status]
    );

    res.status(201).json({
      message: "Incident created successfully",
      incident: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all incidents
exports.getAllIncidents = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM incidents");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
