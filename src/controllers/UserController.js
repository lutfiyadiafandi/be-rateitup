const { validationResult } = require("express-validator");
const UserService = require("../services/UserService");

class UserController {
  //  Create user
  async createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    try {
      const user = await UserService.createUser(req.body);
      res.status(201).send({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Find all users
  async findUsers(req, res) {
    try {
      const users = await UserService.findAllUsers();
      res.status(200).send({
        success: true,
        message: "Get all users successfully",
        data: users,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Find user by ID
  async findUserById(req, res) {
    const userId = parseInt(req.params.id);
    try {
      const user = await UserService.findUserById(userId);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
      res.status(200).send({
        success: true,
        message: `Get user by ID: ${userId} successfully`,
        data: user,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Update user
  async updateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const userId = parseInt(req.params.id);
    try {
      const user = await UserService.updateUser(userId, req.body);
      res.status(200).send({
        success: true,
        message: `User with ID ${userId} updated successfully`,
        data: user,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Delete user
  async deleteUser(req, res) {
    const userId = parseInt(req.params.id);
    try {
      await UserService.deleteUser(userId);
      res.status(200).json({
        success: true,
        message: `User with ID ${userId} deleted successfully`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

module.exports = new UserController();
