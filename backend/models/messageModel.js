const db = require("../config/db");

// Send a message
const sendMessage = async (senderId, receiverId, message) => {
  const query =
    "INSERT INTO public.messages (sender_id, receiver_id, message) VALUES ($1, $2, $3) RETURNING *";
  const values = [senderId, receiverId, message];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Get all messages between two users
// messageModel.js

const getMessagesBetweenUsers = async (senderId, receiverId) => {
  try {
    const query = `
      SELECT * FROM messages
      WHERE (sender_id = $1 AND receiver_id = $2)
      OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY created_at;
    `;
    const result = await db.query(query, [senderId, receiverId]);
    return result.rows; // Return the fetched messages
  } catch (err) {
    throw new Error("Error fetching messages: " + err.message);
  }
};

module.exports = {
  getMessagesBetweenUsers,
};

// Delete a message
const deleteMessage = async (id) => {
  const query = "DELETE FROM public.messages WHERE id = $1 RETURNING *";
  const result = await db.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  sendMessage,
  getMessagesBetweenUsers,
  deleteMessage,
};
