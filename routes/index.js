// import express, router
const express = require("express");
const router = express.Router();

// import register controller, login controller
const registerController = require("../controllers/RegisterController");
const loginController = require("../controllers/LoginController");

// import validation register,login
const { validateRegister, validateLogin } = require("../utils/validators/auth");

// define route for register, login
router.post("/register", validateRegister, registerController.register);
router.post("/login", validateLogin, loginController.login);

module.exports = router;
