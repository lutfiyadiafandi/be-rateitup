// import express, prisma, validationResult, bcrypt
const express = require("express");
const prisma = require("../../prisma/client");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// createUser function
const createUser = async (req, res) => {
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
        role: "user",
      },
    });
    const { password, ...userWithoutPassword } = user;
    // return success response
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
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

// findUser function
const findUsers = async (req, res) => {
  try {
    // get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    // return success response
    res.status(200).send({
      success: true,
      message: "Get all users successfully",
      data: users,
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

// findUser by Id function
const findUserById = async (req, res) => {
  // get user id from params
  const userId = parseInt(req.params.id);
  try {
    // get user by id
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
      },
    });
    // return success response
    res.status(200).send({
      success: true,
      message: `Get user by ID: ${userId} successfully`,
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

// updateUser function
const updateUser = async (req, res) => {
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
  // get user id from params
  const userId = parseInt(req.params.id);
  // destructure request body
  const { name, username, password } = req.body;
  const updatedData = {};
  if (name !== undefined) updatedData.name = name;
  if (username !== undefined) updatedData.username = username;
  if (password !== undefined)
    updatedData.password = await bcrypt.hash(password, 10);

  try {
    // update user
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: updatedData,
    });
    const { password, ...userWithoutPassword } = user;
    // return success response
    res.status(200).send({
      success: true,
      message: `User with ID ${userId} updated successfully`,
      data: userWithoutPassword,
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

// deleteUser function
const deleteUser = async (req, res) => {
  // get user id from params
  const userId = parseInt(req.params.id);
  try {
    // delete user
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    // return success response
    res.status(200).send({
      success: true,
      message: `User with ID ${userId} deleted successfully`,
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

module.exports = {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
