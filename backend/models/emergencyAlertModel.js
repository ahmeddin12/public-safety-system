const db = require("../config/db");

// Create a new emergency alert
const createEmergencyAlert = async (
  userId,
  latitude,
  longitude,
  emergencyType,
  status
) => {
  const query =
    "INSERT INTO public.emergency_alerts (user_id, latitude, longitude, emergency_type, status) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [userId, latitude, longitude, emergencyType, status];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Get all emergency alerts
const getAllEmergencyAlerts = async () => {
  const query = "SELECT * FROM public.emergency_alerts";
  const result = await db.query(query);
  return result.rows;
};

// Get an emergency alert by ID
const getEmergencyAlertById = async (id) => {
  const query = "SELECT * FROM public.emergency_alerts WHERE id = $1";
  const result = await db.query(query, [id]);
  return result.rows[0];
};

// Update the status of an emergency alert
const updateEmergencyAlertStatus = async (id, status) => {
  const query =
    "UPDATE public.emergency_alerts SET status = $1 WHERE id = $2 RETURNING *";
  const result = await db.query(query, [status, id]);
  return result.rows[0];
};

// Delete an emergency alert
const deleteEmergencyAlert = async (id) => {
  const query = "DELETE FROM public.emergency_alerts WHERE id = $1 RETURNING *";
  const result = await db.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createEmergencyAlert,
  getAllEmergencyAlerts,
  getEmergencyAlertById,
  updateEmergencyAlertStatus,
  deleteEmergencyAlert,
};
