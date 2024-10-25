//Model imports
const User = require('./user');
const Comments = require('./comment');
const BlogPosts = require('./blogPosts');
  
//User and Comment relationships
User.hasMany(Comments, { 
    foreignKey: 'userId', 
    onDelete: 'CASCADE',
    as: 'comments',
}); 

Comments.belongsTo(User, { 
    foreignKey: 'userId',
    as: 'author',
});

//BlogPost and Comment relationships
BlogPosts.hasMany(Comments, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    as: 'comments'
});

Comments.belongsTo(BlogPosts, {
    foreignKey: 'postId',
    as: 'post',
})

//User and BlogPost relationships
User.hasMany(BlogPosts, { 
    foreignKey: 'authorId', 
    onDelete: 'CASCADE',
    as: 'posts'
});

BlogPosts.belongsTo(User, { 
    foreignKey: 'authorId',
    as: 'author'
});

module.exports = {User, BlogPosts, Comments}