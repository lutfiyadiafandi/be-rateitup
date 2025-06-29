const { body } = require("express-validator");

// CREATE
const validateCreateReview = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("text")
    .notEmpty()
    .withMessage("Text is required")
    .isString()
    .withMessage("Text must be a string")
    .isLength({ max: 1000 })
    .withMessage("Text must not exceed 1000 characters"),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isNumeric()
    .withMessage("Rating must be a number"),
];

// UPDATE
const validateUpdateReview = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("text")
    .optional()
    .isString()
    .withMessage("Text must be a string")
    .isLength({ max: 1000 })
    .withMessage("Text must not exceed 1000 characters"),

  body("rating").optional().isNumeric().withMessage("Rating must be a number"),
];

module.exports = { validateCreateReview, validateUpdateReview };
