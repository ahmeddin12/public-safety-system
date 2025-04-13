const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs"); // For hashing the password
const router = express.Router();

// Create a new user
router.post("/create", async (req, res) => {
  const { name, email, phone, role, password } = req.body; // Make sure password is included
  try {
    const user = await userModel.createUser(name, email, phone, role, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user information
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, role } = req.body;
  try {
    const updatedUser = await userModel.updateUser(
      id,
      name,
      email,
      phone,
      role
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userModel.deleteUser(id);
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
