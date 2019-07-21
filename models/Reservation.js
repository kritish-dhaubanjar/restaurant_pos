const sequelize = require("../database/db");

const Reservation = sequelize.define("reservation", {});

module.exports = Reservation;
