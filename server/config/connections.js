require("dotenv").config();
const Sequelize = require("sequelize");

const isProduction = process.env.NODE_ENV === "production";

console.log("PG_USER:", process.env.PG_USER);
console.log("PG_PASSWORD:", process.env.PG_PASSWORD);
console.log("PG_HOST:", process.env.PG_HOST);
console.log("PG_DATABASE:", process.env.PG_DATABASE);
console.log("PG_PORT:", process.env.PG_PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: isProduction
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : false,
    },
    logging: false,
  }
);
// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
