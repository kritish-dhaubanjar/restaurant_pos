const Category = require("../models/Category");
const Menu = require("../models/Menu");

findById = id => {
  return Menu.findAll({ where: { id } }).then(menus => {
    return menus[0];
  });
};

exports.store = (req, res, next) => {
  let category_id = req.body.category_id;
  let name = req.body.name;
  let rate = req.body.rate;

  Category.findAll({
    where: {
      id: category_id
    }
  }).then(categories => {
    categories[0].createMenu({ name, rate }).then(() => {
      return res.send({ status: 201 });
    });
  });
};

exports.update = (req, res, next) => {
  let menu_id = req.params.id;
  let name = req.body.name;
  let rate = req.body.rate;
  findById(menu_id).then(menu => {
    menu.name = name;
    menu.rate = rate;
    menu.save().then(() => {
      return res.send({ status: 200 });
    });
  });
};

exports.delete = (req, res, next) => {
  let menu_id = req.params.id;
  findById(menu_id).then(menu => {
    menu.destroy().then(() => {
      return res.send({ status: 200 });
    });
  });
};
