const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const router = express.Router();

// ✅ User Registration Route
router.post("/register", async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password

    // Call the model correctly with individual parameters
    const newUser = await userModel.createUser(
      name,
      email,
      phone,
      role,
      hashedPassword
    );

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ User Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("🔐 Stored hashed password:", user.password);
    console.log("🔐 Plain input password:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ Password match:", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("💥 Error during login:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Protected Route Example
router.get("/protected", (req, res) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({ message: "Access denied, token required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      message: "Protected route accessed",
      userId: decoded.userId,
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
