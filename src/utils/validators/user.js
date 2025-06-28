// import express validator, prisma
const { body } = require("express-validator");
const prisma = require("../../../prisma/client");

// define validation for create user
const validateCreateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .trim()
    .matches(/^[a-z0-9_]+$/)
    .withMessage(
      "Username can only contain lowercase letters, numbers, and underscores"
    )
    .custom(async (value) => {
      const user = await prisma.user.findUnique({ where: { username: value } });
      if (user) {
        throw new Error("Username already exists");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// define validation for update user
const validateUpdateUser = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("username")
    .optional()
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
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = { validateCreateUser, validateUpdateUser };
