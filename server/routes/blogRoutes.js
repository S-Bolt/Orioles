const express = require('express');
const BlogController = require('../controllers/blogController');

const router = express.Router();

// Route to get all posts
router.get('/posts', BlogController.getPosts);

// Route to create a new post
router.post('/posts', BlogController.createPost);

module.exports = router;
