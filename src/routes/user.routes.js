const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { verifyToken, authorizeRole } = require("../middlewares/auth");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("../utils/validators/user");

// User routes
router.post(
  "/admin/users",
  verifyToken,
  authorizeRole("admin"),
  validateCreateUser,
  UserController.createUser
);
router.get(
  "/admin/users",
  verifyToken,
  authorizeRole("admin"),
  UserController.findUsers
);
router.get(
  "/users/:id",
  verifyToken,
  authorizeRole("user", "admin"),
  UserController.findUserById
);
router.put(
  "/users/:id",
  verifyToken,
  authorizeRole("user", "admin"),
  validateUpdateUser,
  UserController.updateUser
);
router.delete(
  "/users/:id",
  verifyToken,
  authorizeRole("user", "admin"),
  UserController.deleteUser
);

module.exports = router;
