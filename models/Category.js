const Sequelize = require("sequelize");
const sequelize = require("../database/db");

const Category = sequelize.define("category", {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = Category;
