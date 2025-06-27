// import express, cors, body-parser, router
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes");

// init app, use cors, set port
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

// route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// define API routes
app.use("/api", router);

// start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
