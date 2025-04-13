const db = require("../config/db");

// Create incident report
exports.createReport = async (req, res) => {
  const { incident_id, report } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO incident_reports (incident_id, report) VALUES ($1, $2) RETURNING *",
      [incident_id, report]
    );

    res.status(201).json({
      message: "Incident report created successfully",
      report: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM incident_reports");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
