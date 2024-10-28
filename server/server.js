const express = require('express');
require('dotenv').config({ path: './server/.env' });
const cors = require('cors');
const routes = require('./controllers');
const sequelize = require('./config/connections')
const path = require('path');

const { User, Comments, BlogPosts } = require('./models'); 


const app = express();
const PORT = process.env.PORT || 3000;

// Log Sequelize associations for debugging
console.log('User Associations:', User.associations);
console.log('Comment Associations:', Comments.associations);
console.log('BlogPost Associations:', BlogPosts.associations);

//middleware
app.use(cors());
app.use(express.json());
app.use(routes);
// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Sequelize Connection Verification
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    
  });

  const { exec } = require('child_process');

exec('npm run migrate', (error, stdout, stderr) => {
  if (error) {
    console.error(`Migration error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Migration stderr: ${stderr}`);
    return;
  }
  console.log(`Migration stdout: ${stdout}`);
});

sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}) 
})

