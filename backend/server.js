// ==========================
// IMPORTS
// ==========================
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// ==========================
// APP SETUP
// ==========================
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// ==========================
// MYSQL CONNECTION (MAMP)
// ==========================
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // 8889 for MAMP
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }
  console.log("✅ MySQL connected");
});

// ==========================
// ROUTES (existing)
// ==========================
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const medicineRoute = require("./routes/medicines");
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/medicines", medicineRoute);

// Static JSON routes
const games = JSON.parse(
  fs.readFileSync(path.join(__dirname, "routes/json/games.json"), "utf-8")
);

const departments = JSON.parse(
  fs.readFileSync(path.join(__dirname, "routes/json/departments.json"), "utf-8")
);

app.get("/games", (req, res) => res.json(games));
app.get("/departments", (req, res) => res.json(departments));

// ==========================
// START SERVER (LAST)
// ==========================
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = { db };
