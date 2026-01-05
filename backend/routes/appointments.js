const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT a.*, d.name AS doctor_name
       FROM appointments a
       LEFT JOIN doctors d ON a.doctor_id = d.id
       WHERE a.user_id = ? 
       ORDER BY a.appointment_date, a.appointment_time`,
      [userId]
    );

    res.json(rows); // ✅ Must be an array
  } catch (err) {
    console.error("Failed to fetch appointments:", err);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
});

module.exports = router;
