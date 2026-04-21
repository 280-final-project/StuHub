const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const itemsRoutes = require("./routes/itemsRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("StudentHub backend running");
});

// health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// routes
app.use("/items", itemsRoutes);
app.use("/auth", authRoutes);

// error handler (always last)
app.use(errorHandler);

module.exports = app;