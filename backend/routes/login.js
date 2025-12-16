/**
 * LOGIN ROUTE (Optimized + Fully Commented)
 * -----------------------------------------
 * - Uses MySQL connection pool for performance
 * - Compares hashed passwords using bcrypt
 * - Loads departments.json only once (more efficient)
 * - Uses clean early-return structure
 * - Removes password from response for security
 */

const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const router = express.Router();

/**
 * Load departments.json only once when the server starts.
 * This prevents reading the file on every request.
 */
const departments = JSON.parse(
  fs.readFileSync(path.join(__dirname, "json", "departments.json"), "utf8")
);

/**
 * Create a MySQL connection pool
 * --------------------------------
 * A pool is better than a single connection because:
 * - It can serve many requests at the same time
 * - Automatically handles reconnections
 * - More stable for production use
 */
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

/**
 * LOGIN ENDPOINT
 * ---------------
 * Route: POST /login
 * Steps:
 * 1. Validate input from the user
 * 2. Search for user in the database
 * 3. Compare provided password with hashed password
 * 4. Return user info (excluding password)
 * 5. Merge department info with user details
 */
router.post("/", async (req, res) => {
  try {
    const { hospital_number, password } = req.body;

    // Ensure both fields are provided
    if (!hospital_number || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    /**
     * Query the database for the user
     * LIMIT 1 ensures only one row is returned
     */
    const [rows] = await db.query(
      "SELECT * FROM users WHERE hospital_number = ? LIMIT 1",
      [hospital_number]
    );

    // If the user does not exist
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    /**
     * Compare plaintext password with the database hash
     * bcrypt.compare() returns true or false
     */
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      // Password incorrect
      return res.status(401).json({ message: "Invalid credentials" });
    }

    /**
     * Find the user's department using department_id
     * If not found, return default values
     */
    const department = departments.find((d) => d.id === user.department_id) || {
      name: "Unknown",
      details: "No details available",
    };

    /**
     * Remove the password field before sending data to the frontend
     * This prevents exposing password hashes to the client
     */
    const { password: pwd, ...safeUser } = user;

    // Combine user data with department info
    const responseData = {
      ...safeUser,
      department,
    };

    // Send success response
    return res.status(200).json({
      message: "Login successful",
      user: responseData,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Export the router so server.js can use it
module.exports = router;
