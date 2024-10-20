//Model imports
const User = require('./user');
const Comments = require('./comment');
const BlogPost = require('./blogPosts');
  
//User and Comment relationships
User.hasMany(Comments, { 
    foreignKey: 'userId', 
    onDelete: 'CASCADE'
}); 

Comments.belongsTo(User, { 
    foreignKey: 'userId',
});

//BlogPost and Comment relationships
BlogPost.hasMany(Comments, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Comments.belongsTo(BlogPost, {
    foreignKey: 'postId',
})

//User and BlogPost relationships
User.hasMany(BlogPost, { 
    foreignKey: 'authorId', 
    onDelete: 'CASCADE' 
});

BlogPost.belongsTo(User, { 
    foreignKey: 'authorId' 
});

module.exports = {User, BlogPost, Comments}