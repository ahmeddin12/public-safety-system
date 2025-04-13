const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Create a new user
const createUser = async (name, email, phone, role, password) => {
  // Hash the password before saving to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  const query =
    "INSERT INTO public.users (name, email, phone, role, password) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [name, email, phone, role, hashedPassword];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Get a user by ID
const getUserById = async (id) => {
  const query = "SELECT * FROM public.users WHERE id = $1";
  const result = await db.query(query, [id]);
  return result.rows[0];
};

// Get all users
const getAllUsers = async () => {
  const query = "SELECT * FROM public.users";
  const result = await db.query(query);
  return result.rows;
};

// Get a user by email
const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const result = await db.query(query, [email]);
  return result.rows[0];
};

// Update a user's information
const updateUser = async (id, name, email, phone, role) => {
  const query =
    "UPDATE public.users SET name = $1, email = $2, phone = $3, role = $4 WHERE id = $5 RETURNING *";
  const values = [name, email, phone, role, id];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Delete a user
const deleteUser = async (id) => {
  const query = "DELETE FROM public.users WHERE id = $1 RETURNING *";
  const result = await db.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
};
