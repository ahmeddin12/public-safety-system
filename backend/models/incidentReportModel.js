const db = require("../config/db");

// Create a new incident report
const createIncidentReport = async (incidentId, report) => {
  const query =
    "INSERT INTO public.incident_reports (incident_id, report) VALUES ($1, $2) RETURNING *";
  const values = [incidentId, report];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Get all reports for a specific incident
const getReportsByIncidentId = async (incidentId) => {
  const query = "SELECT * FROM public.incident_reports WHERE incident_id = $1";
  const result = await db.query(query, [incidentId]);
  return result.rows;
};

// Delete an incident report
const deleteIncidentReport = async (id) => {
  const query = "DELETE FROM public.incident_reports WHERE id = $1 RETURNING *";
  const result = await db.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createIncidentReport,
  getReportsByIncidentId,
  deleteIncidentReport,
};
