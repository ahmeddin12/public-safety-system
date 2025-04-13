require("dotenv").config();
const { Pool } = require("pg");

// Create a pool using the connection string from the environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then(() => console.log("📡 Database connected successfully123!"))
  .catch((err) => console.error("❌ Database connection error:", err));

module.exports = pool;
