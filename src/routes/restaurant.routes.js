const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/RestaurantController");
const { verifyToken, authorizeRole } = require("../middlewares/auth");
const {
  validateCreateRestaurant,
  validateUpdateRestaurant,
} = require("../utils/validators/restaurant");

// Restaurant routes
router.post(
  "/restaurants",
  verifyToken,
  authorizeRole("user", "admin"),
  validateCreateRestaurant,
  RestaurantController.createRestaurant
);
router.get("/restaurants", RestaurantController.findRestaurants);
router.get("/restaurants/:id", RestaurantController.findRestaurantById);
router.put(
  "/restaurants/:id",
  verifyToken,
  authorizeRole("user", "admin"),
  validateUpdateRestaurant,
  RestaurantController.updateRestaurant
);
router.delete(
  "/restaurants/:id",
  verifyToken,
  authorizeRole("user", "admin"),
  RestaurantController.deleteRestaurant
);

module.exports = router;
