// import express, validationResult, bcrypt, jwt, prisma
const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

// login function
const login = async (req, res) => {
  // validate request body
  const errors = validationResult(req);
  // check for validation errors
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }

  try {
    // find user
    const user = await prisma.user.findFirst({
      where: {
        username: req.body.username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        password: true,
      },
    });
    // check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // compare password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    // generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // destructure user without password
    const { password, ...userWithoutPassword } = user;
    // return response
    res.status(201).send({
      success: true,
      message: "Login successfully",
      data: {
        user: userWithoutPassword,
        token: token,
      },
    });
  } catch (error) {
    // handle errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { login };
