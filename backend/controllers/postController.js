import mongoose from "mongoose";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json({
        success: true,
        data: post,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "No post found",
      });
    }
  } else {
    res.status(404).json({
      success: false,
      error: "No post found",
    });
  }
};

// @desc    Create post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res, next) => {
  const { title, body, user } = req.body;
  const post = await Post.create({
    title,
    body,
    user,
  });

  res.status(201).json({
    success: true,
    data: post,
  });
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (post) {
    res.status(200).json({
      success: true,
      data: post,
    });
  } else {
    res.status(404).json({
      success: false,
      error: "No post found",
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (post) {
    res.status(200).json({
      success: true,
      data: {},
    });
  } else {
    res.status(404).json({
      success: false,
      error: "No post found",
    });
  }
};

export { getPosts, getPostById, createPost, updatePost, deletePost };
