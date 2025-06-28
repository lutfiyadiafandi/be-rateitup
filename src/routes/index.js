// import express, router, verifyToken
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

// import register controller, login controller, user controller
const registerController = require("../controllers/RegisterController");
const loginController = require("../controllers/LoginController");
const userController = require("../controllers/UserController");

// import validation register login
const { validateRegister, validateLogin } = require("../utils/validators/auth");
// const { validateUser } = require("../utils/validators/user");

// define route for register, login, get users, create users, get user by id, update user, delete user
router.post("/register", validateRegister, registerController.register);
router.post("/login", validateLogin, loginController.login);
router.post(
  "/admin/users",
  verifyToken,
  ...validateRegister,
  userController.createUser
);
router.get("/admin/users", verifyToken, userController.findUsers);
router.get("/admin/users/:id", verifyToken, userController.findUserById);
router.put(
  "/admin/users/:id",
  verifyToken,
  ...validateRegister,
  userController.updateUser
);
router.delete("/admin/users/:id", verifyToken, userController.deleteUser);

module.exports = router;
