const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const router = express.Router();

const departments = JSON.parse(
  fs.readFileSync(path.join(__dirname, "json", "departments.json"), "utf8")
);

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

router.post("/", async (req, res) => {
  try {
    // 🔹 STEP 1: extract buddy_id too
    const { hospital_number, password, buddy_id } = req.body;

    if (!hospital_number || !password || !buddy_id) {
      return res.status(400).json({ message: "Missing credentials or buddy" });
    }

    // 🔹 STEP 2: find user
    const [rows] = await db.query(
      "SELECT * FROM users WHERE hospital_number = ? LIMIT 1",
      [hospital_number]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    // 🔹 STEP 3: verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔹 STEP 4: department lookup (unchanged)
    const department = departments.find((d) => d.id === user.department_id) || {
      name: "Unknown",
      details: "No details available",
    };

    // 🔹 STEP 5: fetch selected buddy
    const [buddyRows] = await db.query(
      "SELECT * FROM hospital_buddies WHERE id = ? LIMIT 1",
      [buddy_id]
    );

    if (buddyRows.length === 0) {
      return res.status(400).json({ message: "Invalid hospital buddy" });
    }

    const buddy = buddyRows[0];

    // 🔹 STEP 6: remove password from user
    const { password: pwd, ...safeUser } = user;

    // 🔹 STEP 7: send everything frontend needs
    return res.status(200).json({
      message: "Login successful",
      user: {
        ...safeUser,
        department,
      },
      buddy,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
