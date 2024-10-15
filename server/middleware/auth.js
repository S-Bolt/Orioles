const jwt = require('jsonwebtoken');

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

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Permission denied' });
  }
  next();
};

module.exports = { authenticateToken, authorizeAdmin };
