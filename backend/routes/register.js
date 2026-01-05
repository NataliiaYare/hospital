const express = require("express");
const mysql = require("mysql2/promise"); // Use promise-based MySQL for async/await
const bcrypt = require("bcrypt");
require("dotenv").config();

const router = express.Router();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      surname,
      hospital_number,
      email,
      department_id,
      telephone_number,
      password,
      dob,
    } = req.body;

    // Validate required fields
    if (!firstName || !surname || !hospital_number || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Hash the password with 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert new user safely
    const query = `
      INSERT INTO users 
      (firstName, surname, hospital_number, email, department_id, telephone_number, password, dob)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute query with parameterized values
    await db.query(query, [
      firstName,
      surname,
      hospital_number,
      email,
      department_id,
      telephone_number,
      hashedPassword,
      dob,
    ]);

    // Return success response
    return res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error("Registration error:", err);

    // Handle duplicate entries (e.g., email or hospital_number already exists)
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "User with this email or hospital number already exists",
      });
    }

    // Handle other server errors
    return res
      .status(500)
      .json({ message: "Server error during registration" });
  }
});

module.exports = router;
