const db = require("../config/db");

// Send a message
exports.sendMessage = async (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO messages (sender_id, receiver_id, message) VALUES ($1, $2, $3) RETURNING *",
      [sender_id, receiver_id, message]
    );

    res.status(201).json({
      message: "Message sent successfully",
      messageData: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM messages");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
