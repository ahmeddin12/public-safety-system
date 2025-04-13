const db = require("../config/db");
const jwt = require("jsonwebtoken");

// Find user by email
const getUserByEmail = async (email) => {
  const query = "SELECT * FROM public.users WHERE email = $1;";
  const values = [email];
  try {
    const result = await db.query(query, values);
    return result.rows[0]; // Return user found by email
  } catch (err) {
    throw new Error("Error fetching user: " + err.message);
  }
};

// Generate JWT token for the user
const generateAuthToken = (user) => {
  const payload = { userId: user.id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

module.exports = { getUserByEmail, generateAuthToken };
