//Model imports
const User = require('./user');
const Comments = require('./comment');
const BlogPosts = require('./blogPosts');
  
//User and Comment relationships
User.hasMany(Comments, { 
    foreignKey: 'userId', 
    onDelete: 'CASCADE'
}); 

Comments.belongsTo(User, { 
    foreignKey: 'userId',
});

//BlogPost and Comment relationships
BlogPosts.hasMany(Comments, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Comments.belongsTo(BlogPosts, {
    foreignKey: 'postId',
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