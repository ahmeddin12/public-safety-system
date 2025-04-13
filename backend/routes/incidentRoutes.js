const express = require("express");
const incidentModel = require("../models/incidentModel");
const router = express.Router();

// Create a new incident
router.post("/create", async (req, res) => {
  const { alertId, responderId, description, status } = req.body;
  try {
    const incident = await incidentModel.createIncident(
      alertId,
      responderId,
      description,
      status
    );
    res.status(201).json(incident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all incidents
router.get("/", async (req, res) => {
  try {
    const incidents = await incidentModel.getAllIncidents();
    res.status(200).json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get an incident by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const incident = await incidentModel.getIncidentById(id);
    if (incident) {
      res.status(200).json(incident);
    } else {
      res.status(404).json({ message: "Incident not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an incident's status
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedIncident = await incidentModel.updateIncidentStatus(
      id,
      status
    );
    res.status(200).json(updatedIncident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an incident
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedIncident = await incidentModel.deleteIncident(id);
    if (deletedIncident) {
      res.status(200).json({ message: "Incident deleted successfully" });
    } else {
      res.status(404).json({ message: "Incident not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
