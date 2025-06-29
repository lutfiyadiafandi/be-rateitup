const { validationResult } = require("express-validator");
const AuthService = require("../services/AuthService");

class AuthController {
  // User register
  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    try {
      const { name, username, password } = req.body;
      const user = await AuthService.register(name, username, password);
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

  // User login
  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    try {
      const { username, password } = req.body;
      const { user, token } = await AuthService.login(username, password);
      res.status(200).send({
        success: true,
        message: "Login successfully",
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();
