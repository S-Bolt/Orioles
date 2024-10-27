require('dotenv').config();

module.exports = {

  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.PG_PORT || 5433,
    dialect: process.env.DB_DIALECT || "postgres"
  },
  test: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST || "127.0.0.1",
    port: process.env.PG_PORT || 5432,
    dialect: process.env.PG_DIALECT || "postgres"
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST || "127.0.0.1",
    port: process.env.PG_PORT || 5432,
    dialect: "postgres"
  }
}
