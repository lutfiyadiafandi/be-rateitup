const { body } = require("express-validator");
const prisma = require("../../../prisma/client");

// CREATE
const validateCreateUser = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .trim()
    .matches(/^[a-z0-9_]+$/)
    .withMessage(
      "Username can only contain lowercase letters, numbers, and underscores"
    )
    .custom(async (value) => {
      const user = await prisma.user.findUnique({ where: { username: value } });
      if (user) throw new Error("Username already exists");
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("role")
    .optional()
    .isString()
    .withMessage("Role must be a string")
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),
];

// UPDATE
const validateUpdateUser = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty"),

  body("username")
    .optional()
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .trim()
    .matches(/^[a-z0-9_]+$/)
    .withMessage(
      "Username can only contain lowercase letters, numbers, and underscores"
    )
    .custom(async (value, { req }) => {
      const existingUser = await prisma.user.findUnique({
        where: { username: value },
      });
      const userId = parseInt(req.params.id);
      if (existingUser && existingUser.id !== userId) {
        throw new Error("Username already exists");
      }
      return true;
    }),

  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = { validateCreateUser, validateUpdateUser };
