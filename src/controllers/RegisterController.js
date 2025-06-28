// import express, validationResult, bcrypt, prisma
const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const prisma = require("../../prisma/client");

// register function
const register = async (req, res) => {
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
  // hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    // insert data user
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
      },
    });
    // return success response
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    // handle errors
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { register };
