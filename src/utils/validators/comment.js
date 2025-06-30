const { body } = require("express-validator");

// CREATE
const validateCreateComment = [
  body("text")
    .notEmpty()
    .withMessage("Text is required")
    .isString()
    .withMessage("Text must be a string")
    .isLength({ max: 1000 })
    .withMessage("Text must not exceed 1000 characters"),
];

module.exports = { validateCreateComment };
