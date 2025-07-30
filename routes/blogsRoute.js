const express = require('express');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const { default: ADMIN_ROLE } = require('../config');

const router = express.Router();

// @route   GET /blogs
// @desc    Get all blogs
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { title, category, sortby } = req.query;
    const filter = {};
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }
    if (category) {
      filter.category = category;
    }

    let sortOptions = {};
    if (sortby === 'latest') {
      sortOptions = { createdAt: -1 };
    } else if (sortby === 'oldest') {
      sortOptions = { createdAt: 1 };
    }

    const blogs = await Blog.find(filter).sort(sortOptions).populate('userId', 'username');
    res.status(200).json({
      success: true,
      posts: blogs,
      totalPosts: blogs.length,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /blogs/:id
// @desc    Get a single blog
// @access  Public
router.get('/:id', auth([]), async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('userId', 'username');
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /blogs
// @desc    Create a new blog
// @access  Private
router.post('/', auth([ADMIN_ROLE]), async (req, res, next) => {
  try {
    const { title, content, image, category, slug } = req.body;
    const userId = req.user._id;

    const blog = new Blog({
      title,
      content,
      image,
      category,
      slug,
      userId,
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
