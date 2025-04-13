const express = require("express");
const incidentReportModel = require("../models/incidentReportModel");
const router = express.Router();

// Create a new incident report
router.post("/create", async (req, res) => {
  const { incidentId, report } = req.body;
  try {
    const report = await incidentReportModel.createIncidentReport(
      incidentId,
      report
    );
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reports for a specific incident
router.get("/incident/:incidentId", async (req, res) => {
  const { incidentId } = req.params;
  try {
    const reports = await incidentReportModel.getReportsByIncidentId(
      incidentId
    );
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an incident report
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReport = await incidentReportModel.deleteIncidentReport(id);
    if (deletedReport) {
      res.status(200).json({ message: "Report deleted successfully" });
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
