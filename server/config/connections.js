require("dotenv").config();
const Sequelize = require("sequelize");


  const sequelize = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
      host: 'localhost',
      port: process.env.PG_PORT || 5432, 
      dialect: 'postgres',
    },
  );

module.exports = sequelize;
