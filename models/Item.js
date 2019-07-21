const Sequelize = require("sequelize");
const sequelize = require("../database/db");

const Item = sequelize.define("item", {
  qty: {
    type: Sequelize.DOUBLE
  },

  rate: {
    type: Sequelize.DOUBLE
  }
});

module.exports = Item;
