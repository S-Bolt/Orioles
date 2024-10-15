const router = require('express').Router();
const  blogPosts  = require('../../models/blogPosts');
const { authenticateToken, authorizeAdmin } = require('../../middleware/auth');

// Get all blog posts
router.get('/', async (req, res) => {
    try {
      const posts = await blogPosts.findAll();
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  });

//Get specific blog post
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const blogPost = await blogPosts.findByPk(id); 
      if (!blogPost) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      res.json(blogPost);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({ error: 'Error fetching blog post', details: error.message });
    }
  });
  

  // Create a new blog post
  router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
    const { title, content, summary } = req.body;
  
    try {
      const newPost = await blogPosts.create({ title, content, summary, authorId: req.user.id });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Error creating blog post', details: error.message });
    }
  });

  module.exports = router;