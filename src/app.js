const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", authRoutes);
app.use("/api/admin", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
