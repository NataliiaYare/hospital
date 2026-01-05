// routes/medicines.js
const express = require("express");
const db = require("../db"); // CommonJS version

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await db.query(
      `
      SELECT
        m.id,
        m.name,
        m.dosage,
        m.time,
        m.start_date,
        m.end_date,
        m.is_taken,
        d.name AS doctor_name
      FROM medicines m
      LEFT JOIN doctors d ON m.doctor_id = d.id
      WHERE m.user_id = ?
        AND CURDATE() BETWEEN m.start_date AND m.end_date
      ORDER BY m.time
      `,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch medicines" });
  }
});

module.exports = router;
