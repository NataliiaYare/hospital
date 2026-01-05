const express = require("express");
const router = express.Router();
const connection = require("../db");

// Get all appointments for a user
router.get("/:userid", (req, res) => {
  const userId = req.params.userid;

  const query = `
    SELECT a.*, d.name AS doctor_name
    FROM appointments a
    LEFT JOIN doctors d ON a.doctor_id = d.id
    WHERE a.user_id = ?
    ORDER BY a.appointment_date, a.appointment_time
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Get next upcoming appointment
router.get("/:userid/next", (req, res) => {
  const userId = req.params.userid;

  const query = `
    SELECT a.*, d.name AS doctor_name
    FROM appointments a
    LEFT JOIN doctors d ON a.doctor_id = d.id
    WHERE a.user_id = ? 
      AND STR_TO_DATE(CONCAT(a.appointment_date, ' ', a.appointment_time), '%Y-%m-%d %H:%i:%s') >= NOW()
    ORDER BY a.appointment_date, a.appointment_time
    LIMIT 1
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results[0] || null);
  });
});

module.exports = router;
