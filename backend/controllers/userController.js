import mongoose from "mongoose";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Authenticate user and get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const checkUser = await User.findOne({ email });

  if (checkUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  const users = await User.find({}).select("-password");

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "No user found",
      });
    }
  } else {
    res.status(404).json({
      success: false,
      error: "No user found",
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "No user found",
      });
    }
  } else {
    res.status(404).json({
      success: false,
      error: "No user found",
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "No user found",
      });
    }
  } else {
    res.status(404).json({
      success: false,
      error: "No user found",
    });
  }
};
export {
  authUser,
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
