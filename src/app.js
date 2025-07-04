const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const authRoutes = require("./routes/auth.routes");
// const userRoutes = require("./routes/user.routes");
// const restaurantRoutes = require("./routes/restaurant.routes");
// const reviewRoutes = require("./routes/review.routes");
// const commentRoutes = require("./routes/comment.routes");

const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// app.use("/api/auth", authRoutes);
// app.use("/api", userRoutes);
// app.use("/api", restaurantRoutes);
// app.use("/api", reviewRoutes);
// app.use("/api", commentRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
