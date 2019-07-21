const Sequelize = require("sequelize");
const sequelize = require("../database/db");

const Transaction = sequelize.define("transaction", {
  total: {
    type: Sequelize.DOUBLE
  },
  discount: {
    type: Sequelize.DOUBLE
  },
  grandTotal: {
    type: Sequelize.DOUBLE
  }
});

module.exports = Transaction;
