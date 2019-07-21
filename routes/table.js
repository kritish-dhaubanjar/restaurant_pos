const express = require("express");
const TableController = require("../controllers/TableController");

const table = express.Router();

table.get("/", TableController.index);

table.post("/", TableController.store);

table.put("/:id", TableController.update);

table.delete("/:id", TableController.delete);

table.post("/reserve/:id", TableController.reserve);

table.post("/addItem/:id", TableController.addItem);

table.delete("/removeItem/:id", TableController.removeItem);

table.post("/checkout/:id", TableController.checkout);

module.exports = table;
