const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const buddyRoute = require("./routes/buddies");

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
// ROUTES (existing)
// ==========================
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const medicineRoute = require("./routes/medicines");
const appointmentsRoute = require("./routes/appointments");
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/api/medicines", medicineRoute);
app.use("/api/appointments", appointmentsRoute);
app.use("/api/buddies", buddyRoute);

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
