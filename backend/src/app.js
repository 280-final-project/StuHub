const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const itemsRoutes = require("./routes/itemsRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("StudentHub backend running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/items", itemsRoutes);
app.use("/auth", authRoutes);
app.use("/", reviewsRoutes);

app.use(errorHandler);

module.exports = app;


