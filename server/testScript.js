const blogPosts = require('./models/blogPosts');  
const sequelize = require('./config/connections');  

sequelize.authenticate()
  .then(async () => {
    try {
      const posts = await blogPosts.findAll();  // Test if blogPosts model works
      console.log('Posts:', posts);  // Log the results
    } catch (error) {
      console.error('Error fetching posts:', error);  // Log any errors
    }
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);  // Log connection issues
  });
