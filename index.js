const sequelize = require("./database/db");
const Table = require("./models/Table");
const Reservation = require("./models/Reservation");
const Category = require("./models/Category");
const Menu = require("./models/Menu");
const Item = require("./models/Item");
const Transaction = require("./models/Transaction");

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

/**************************************************************************************************** */

const express = require("express");
const category = require("./routes/category");
const menu = require("./routes/menu");
const table = require("./routes/table");
const app = express();

app.use(express.json());
app.use("/category", category);
app.use("/menu", menu);
app.use("/table", table);

app.listen(8000, () => {
  console.log("Server running @ 8000.");
});
