const express = require("express");
const messageModel = require("../models/messageModel");
const router = express.Router(); // Create router instance

// Send a message
router.post("/send", async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  try {
    const newMessage = await messageModel.sendMessage(
      senderId,
      receiverId,
      message
    );
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all messages between two users
router.get("/conversation/:senderId/:receiverId", async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const messages = await messageModel.getMessagesBetweenUsers(
      senderId,
      receiverId
    );
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a message
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMessage = await messageModel.deleteMessage(id);
    if (deletedMessage) {
      res.status(200).json({ message: "Message deleted successfully" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // Export the router for use in other files
