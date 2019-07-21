const express = require("express");
const CategoryController = require("../controllers/CategoryController");

const category = express.Router();

category.get("/", CategoryController.index);

category.get("/:id", CategoryController.show);

category.post("/", CategoryController.store);

category.put("/:id", CategoryController.update);

category.delete("/:id", CategoryController.delete);

module.exports = category;
