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



// app.get("/test-db", async (req, res) => {
//   try {
//     const result = await require("./config/db").query("SELECT NOW()");
//     res.json({ ok: true, time: result.rows[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ ok: false, error: err.message });
//   }
// });
// app.get("/test-users", async (req, res) => {
//   try {
//     const result = await require("./config/db").query(
//       "SELECT user_id, user_name, email FROM users LIMIT 5"
//     );
//     res.json({ ok: true, users: result.rows });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ ok: false, error: err.message });
//   }
// });