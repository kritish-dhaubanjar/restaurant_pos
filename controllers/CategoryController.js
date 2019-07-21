const Category = require("../models/Category");
const Menu = require("../models/Menu");

findById = id => {
  return Category.findAll({ where: { id } }).then(categories => {
    return categories[0];
  });
};

exports.index = (req, res, next) => {
  Category.findAll().then(categories => {
    return res.send(categories);
  });
};

exports.show = (req, res, nex) => {
  let id = req.params.id;
  Menu.findAll({ where: { categoryId: id } }).then(menus => {
    return res.send(menus);
  });
};

exports.store = (req, res, next) => {
  let name = req.body.name;
  Category.create({
    name
  }).then(() => {
    return res.send({ status: 201 });
  });
};

exports.update = (req, res, next) => {
  let category_id = req.params.id;
  let name = req.body.name;
  findById(category_id).then(category => {
    category.name = name;
    category.save().then(() => {
      return res.send({ status: 200 });
    });
  });
};

exports.delete = (req, res, next) => {
  let category_id = req.params.id;
  findById(category_id).then(category => {
    category.destroy().then(() => {
      return res.send({ status: 200 });
    });
  });
};
