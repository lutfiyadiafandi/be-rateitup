// import express, cors, body-parser
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

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

// start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
