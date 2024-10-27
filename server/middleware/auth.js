const jwt = require('jsonwebtoken');
const  BlogPosts  = require('../models/blogPosts');

// Middleware to check JWT token and role
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};
//Middleware for admin users
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Permission denied' });
  }
  next();
};

// Middleware to allow both writers and admins
const authorizeWriterOrAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'writer' && role !== 'admin') {
    return res.status(403).json({ error: 'Permission denied: Writers or Admins only' });
  }
  next();
};

// Middleware to authorize only the post author or admin
const authorizePostEdit = async (req, res, next) => {
  const post = await BlogPosts.findByPk(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  // Allow admin or the post's author to proceed
  if (req.user.role === 'admin' || req.user.id === post.authorId) {
    req.post = post;
    next();
  } else {
    return res.status(403).json({ error: 'Permission denied' });
  }
};

module.exports = { authenticateToken, authorizeAdmin, authorizeWriterOrAdmin, authorizePostEdit };
