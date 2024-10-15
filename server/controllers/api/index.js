const router = require('express').Router();
const blogPostRoutes = require('./blogPostRoutes');
const usersRoutes = require('./usersRoutes')

router.use('/blogPosts', blogPostRoutes)
router.use('/users', usersRoutes)

module.exports = router;