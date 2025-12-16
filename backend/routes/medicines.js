const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../server").db; // We'll slightly modify server.js to export db

// GET medicines for a user
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT *
    FROM medicines
    WHERE user_id = ?
    ORDER BY time
    LIMIT 1
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("❌ Medicine query error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results[0] || null);
  });
});

module.exports = router;
