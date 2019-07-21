const express = require("express");
const MenuController = require("../controllers/MenuController");

const menu = express.Router();

menu.post("/", MenuController.store);

menu.put("/:id", MenuController.update);

menu.delete("/:id", MenuController.delete);

module.exports = menu;
