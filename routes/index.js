// import express, router
const express = require("express");
const router = express.Router();

// import register controller and validation register
const registerController = require("../controllers/RegisterController");
const { validateRegister } = require("../utils/validators/auth");

// define route for register
router.post("/register", validateRegister, registerController.register);

module.exports = router;
