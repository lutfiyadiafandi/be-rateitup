const { body } = require("express-validator");

// CREATE
const validateCreateRestaurant = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("photoUrl")
    .notEmpty()
    .withMessage("Photo URL is required")
    .isString()
    .withMessage("Photo URL must be a string")
    .isURL()
    .withMessage("Photo URL must be a valid URL"),

  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .isString()
    .withMessage("Location must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Location must be between 3 and 100 characters"),

  body("mapsUrl")
    .notEmpty()
    .withMessage("Maps URL is required")
    .isString()
    .withMessage("Maps URL must be a string")
    .isURL()
    .withMessage("Maps URL must be a valid URL"),
];

// UPDATE
const validateUpdateRestaurant = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("photoUrl")
    .optional()
    .isString()
    .withMessage("Photo URL must be a string")
    .isURL()
    .withMessage("Photo URL must be a valid URL"),

  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Location must be between 3 and 100 characters"),

  body("mapsUrl")
    .optional()
    .isString()
    .withMessage("Maps URL must be a string")
    .isURL()
    .withMessage("Maps URL must be a valid URL"),
];

module.exports = { validateCreateRestaurant, validateUpdateRestaurant };
