const express = require("express");
const emergencyAlertModel = require("../models/emergencyAlertModel");
const router = express.Router();

// Create a new emergency alert
router.post("/create", async (req, res) => {
  const { userId, latitude, longitude, emergencyType, status } = req.body;
  try {
    const alert = await emergencyAlertModel.createEmergencyAlert(
      userId,
      latitude,
      longitude,
      emergencyType,
      status
    );
    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all emergency alerts
router.get("/", async (req, res) => {
  try {
    const alerts = await emergencyAlertModel.getAllEmergencyAlerts();
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get an emergency alert by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const alert = await emergencyAlertModel.getEmergencyAlertById(id);
    if (alert) {
      res.status(200).json(alert);
    } else {
      res.status(404).json({ message: "Alert not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update the status of an emergency alert
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedAlert = await emergencyAlertModel.updateEmergencyAlertStatus(
      id,
      status
    );
    res.status(200).json(updatedAlert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an emergency alert
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAlert = await emergencyAlertModel.deleteEmergencyAlert(id);
    if (deletedAlert) {
      res.status(200).json({ message: "Alert deleted successfully" });
    } else {
      res.status(404).json({ message: "Alert not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
