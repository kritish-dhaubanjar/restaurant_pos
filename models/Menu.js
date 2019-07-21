const Sequelize = require("sequelize");
const sequelize = require("../database/db");

const Menu = sequelize.define("menu", {
  name: {
    type: Sequelize.STRING
  },
  rate: {
    type: Sequelize.DOUBLE
  }
});

module.exports = Menu;
