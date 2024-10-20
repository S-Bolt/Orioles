const router = require('express').Router();
const  BlogPosts  = require('../../models/blogPosts');
const User = require('../../models/user')
const { 
  authenticateToken, 
  authorizeAdmin, 
  authorizeWriterOrAdmin,
  authorizePostEdit
 } = require('../../middleware/auth');

// Get all blog posts
router.get('/', async (req, res) => {
    try {
      const posts = await BlogPosts.findAll({
        include: {
          model: User,
          attributes: ['id', 'username'],
        }
      });
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  });

//Get specific blog post
  router.get('/:id', async (req, res) => {
    
    try {
      const blogPost = await BlogPosts.findOne({
        where: { id: req.params.id },
        include: [{
          model: User,
          attributes: ['username']
        }],
      }); 
      if (!blogPost) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      res.status(200).json(blogPost);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({ error: 'Error fetching blog post', details: error.message });
    }
  });
  

  // Create a new blog post
  router.post('/post', authenticateToken, authorizeWriterOrAdmin, async (req, res) => {
    const { title, content } = req.body;
  
    try {
      const newPost = await BlogPosts.create({ title, content, authorId: req.user.id });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Error creating blog post', details: error.message });
    }
  });

  // Delete blog post (admin or author)
  router.delete('/:id', authenticateToken, authorizePostEdit, async (req, res) => {
    try {
      const post = await BlogPosts.findByPk(req.params.id);
      if (!post){
        return res.status(404).json({ error: 'Blog post not found'})
      }

      await post.destroy();
      res.status(200).json({ message: 'Blog post deleted'})
    } catch (error){
      res.status(500).json({ error: 'Error deleting blog post', details: error.message })
    }
  });

  // Edit post route (admin or auther)
  router.put('/:id', authenticateToken, authorizePostEdit, async (req, res) => {
    const { title, content } = req.body;

    try {
      req.post.title = title || req.post.title;
      req.post.content = content || req.post.content;
      await req.post.save();

      res.status(200).json(req.post)
    } catch (error){
      res.status(500).json({ error: 'Error updating post', details: error.message})
    }
  })



  module.exports = router;