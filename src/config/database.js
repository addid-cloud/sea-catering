const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "dbsea-cathering",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: "localhost",
    dialect: "mysql",
  }
);
module.exports = sequelize;
