const express = require("express");
const assignmentModel = require("../models/assignmentModel");
const router = express.Router();

// Create a new assignment
router.post("/create", async (req, res) => {
  const { incidentId, responderId } = req.body;
  try {
    const assignment = await assignmentModel.createAssignment(
      incidentId,
      responderId
    );
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await assignmentModel.getAllAssignments();
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get an assignment by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const assignment = await assignmentModel.getAssignmentById(id);
    if (assignment) {
      res.status(200).json(assignment);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an assignment
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAssignment = await assignmentModel.deleteAssignment(id);
    if (deletedAssignment) {
      res.status(200).json({ message: "Assignment deleted successfully" });
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
