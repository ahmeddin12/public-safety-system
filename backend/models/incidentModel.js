const db = require("../config/db");

// Create a new incident
const createIncident = async (alertId, responderId, description, status) => {
  const query =
    "INSERT INTO public.incidents (alert_id, responder_id, description, status) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [alertId, responderId, description, status];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Get all incidents
const getAllIncidents = async () => {
  const query = "SELECT * FROM public.incidents";
  const result = await db.query(query);
  return result.rows;
};

// Get an incident by ID
const getIncidentById = async (id) => {
  const query = "SELECT * FROM public.incidents WHERE id = $1";
  const result = await db.query(query, [id]);
  return result.rows[0];
};

// Update an incident's status
const updateIncidentStatus = async (id, status) => {
  const query =
    "UPDATE public.incidents SET status = $1 WHERE id = $2 RETURNING *";
  const result = await db.query(query, [status, id]);
  return result.rows[0];
};

// Delete an incident
const deleteIncident = async (id) => {
  const query = "DELETE FROM public.incidents WHERE id = $1 RETURNING *";
  const result = await db.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncidentStatus,
  deleteIncident,
};
