const sequelize = require("./database/db");
const Table = require("./models/Table");
const Reservation = require("./models/Reservation");
const Category = require("./models/Category");
const Menu = require("./models/Menu");
const Item = require("./models/Item");
const Transaction = require("./models/Transaction");

/* */

const CategoryController = require("./controllers/CategoryController");
const MenuController = require("./controllers/MenuController");
const TableController = require("./controllers/TableController");

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync();

    Table.hasMany(Reservation);
    Category.hasMany(Menu, { onDelete: "cascade" });
    Menu.belongsTo(Category);
    Reservation.belongsToMany(Menu, { through: Item });
    Reservation.hasOne(Transaction);
    Transaction.belongsTo(Reservation);
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
