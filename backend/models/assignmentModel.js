const db = require("../config/db");

// Create a new assignment
const createAssignment = async (incidentId, responderId) => {
  const query =
    "INSERT INTO public.assignments (incident_id, responder_id) VALUES ($1, $2) RETURNING *";
  const values = [incidentId, responderId];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Get all assignments
const getAllAssignments = async () => {
  const query = "SELECT * FROM public.assignments";
  const result = await db.query(query);
  return result.rows;
};

// Get assignment by ID
const getAssignmentById = async (id) => {
  const query = "SELECT * FROM public.assignments WHERE id = $1";
  const result = await db.query(query, [id]);
  return result.rows[0];
};

// Delete an assignment
const deleteAssignment = async (id) => {
  const query = "DELETE FROM public.assignments WHERE id = $1 RETURNING *";
  const result = await db.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  deleteAssignment,
};
