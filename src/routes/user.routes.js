const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const verifyToken = require("../middlewares/auth");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("../utils/validators/user");

// User routes
router.post(
  "/users",
  verifyToken,
  validateCreateUser,
  UserController.createUser
);
router.get("/users", verifyToken, UserController.findUsers);
router.get("/users/:id", verifyToken, UserController.findUserById);
router.put(
  "/users/:id",
  verifyToken,
  validateUpdateUser,
  UserController.updateUser
);
router.delete("/users/:id", verifyToken, UserController.deleteUser);

module.exports = router;
