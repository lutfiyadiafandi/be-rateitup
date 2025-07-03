const { validationResult } = require("express-validator");
const RestaurantService = require("../services/RestaurantService");
const camelcaseKeys = require("camelcase-keys");

class RestaurantController {
  //  Create restaurant
  async createRestaurant(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const userId = req.userId;
    try {
      const restaurant = await RestaurantService.createRestaurant(
        req.body,
        userId
      );
      res.status(201).send({
        success: true,
        message: "Restaurant created successfully",
        data: camelcaseKeys(restaurant, { deep: true }),
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Find all restaurants
  async findRestaurants(req, res) {
    try {
      const restaurants = await RestaurantService.findAllRestaurants();
      res.status(200).send({
        success: true,
        message: "Get all restaurants successfully",
        data: camelcaseKeys(restaurants, { deep: true }),
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Find restaurant by ID
  async findRestaurantById(req, res) {
    const restaurantId = parseInt(req.params.id);
    try {
      const restaurant = await RestaurantService.findRestaurantById(
        restaurantId
      );
      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: "Restaurant not found",
        });
      }
      res.status(200).send({
        success: true,
        message: `Get restaurant by ID: ${restaurantId} successfully`,
        data: camelcaseKeys(restaurant, { deep: true }),
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Update restaurant
  async updateRestaurant(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const restaurantId = parseInt(req.params.id);
    const userId = req.userId;
    try {
      const restaurant = await RestaurantService.updateRestaurant(
        restaurantId,
        req.body,
        userId
      );
      res.status(200).send({
        success: true,
        message: `Restaurant with ID ${restaurantId} updated successfully`,
        data: camelcaseKeys(restaurant, { deep: true }),
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Delete restaurant
  async deleteRestaurant(req, res) {
    const restaurantId = parseInt(req.params.id);
    const userId = req.userId;
    try {
      await RestaurantService.deleteRestaurant(restaurantId, userId);
      res.status(200).send({
        success: true,
        message: `Restaurant with ID ${restaurantId} deleted successfully`,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

module.exports = new RestaurantController();
