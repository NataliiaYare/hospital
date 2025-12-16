const express = require("express");
const router = express.Router();
const db = require("../db"); // ✅ CORRECT

router.get("/", (req, res) => {
  const sql = "SELECT * FROM hospital_buddies";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Buddy fetch error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

module.exports = router;
