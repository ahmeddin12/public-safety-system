const db = require("../config/db");

// Create assignment
exports.assignResponder = async (req, res) => {
  const { incident_id, responder_id } = req.body;

  try {
    // Insert assignment into the database
    const result = await db.query(
      "INSERT INTO assignments (incident_id, responder_id) VALUES ($1, $2) RETURNING *",
      [incident_id, responder_id]
    );

    res.status(201).json({
      message: "Responder assigned successfully",
      assignment: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM assignments");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
