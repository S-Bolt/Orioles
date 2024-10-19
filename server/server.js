const express = require('express');
require('dotenv').config({ path: './server/.env' });
const cors = require('cors');
const routes = require('./controllers');
const sequelize = require('./config/connections')
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

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

sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}) 
})

