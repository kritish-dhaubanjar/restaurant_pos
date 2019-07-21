const Category = require("../models/Category");
const Menu = require("../models/Menu");

findById = id => {
  return Menu.findAll({ where: { id } }).then(menus => {
    return menus[0];
  });
};

exports.store = () => {
  let category_id = 1;
  let name = "Ved(Steam)";
  let rate = 85.0;

  Category.findAll({
    where: {
      id: category_id
    }
  }).then(categories => {
    categories[0].createMenu({ name, rate });
  });
};

exports.update = () => {
  let menu_id = 2;
  let name = "Mushroom Pizza";
  let rate = 250;
  return findById(menu_id).then(menu => {
    menu.name = name;
    menu.rate = rate;
    return menu.save();
  });
};

exports.delete = () => {
  let menu_id = 1;
  return findById(menu_id).then(menu => {
    return menu.destroy();
  });
};
