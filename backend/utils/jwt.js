// backend/utils/jwt.js
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = { id: user.id, email: user.email, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
