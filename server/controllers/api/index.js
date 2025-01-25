const router = require("express").Router();
const blogPostRoutes = require("./blogPostRoutes");
const usersRoutes = require("./usersRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/blogPosts", blogPostRoutes);
router.use("/users", usersRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
