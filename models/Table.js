const Sequelize = require("sequelize");
const sequelize = require("../database/db");

const Table = sequelize.define(
  "table",
  {
    name: {
      type: Sequelize.STRING
    },
    reserved: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    // options
  }
);

module.exports = Table;
