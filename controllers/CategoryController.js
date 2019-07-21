const Category = require("../models/Category");
const Menu = require("../models/Menu");

findById = id => {
  return Category.findAll({ where: { id } }).then(categories => {
    return categories[0];
  });
};

exports.index = () => {
  return Category.findAll();
};

exports.show = id => {
  return Menu.findAll({ where: { categoryId: id } });
};

exports.store = () => {
  let name = "Mo:Mo";
  return Category.create({
    name
  });
};

exports.update = () => {
  let category_id = 2;
  let name = "Pizza";
  return findById(category_id).then(category => {
    category.name = name;
    return category.save();
  });
};

exports.delete = () => {
  let category_id = 1;
  return findById(category_id).then(category => {
    return category.destroy();
  });
};
