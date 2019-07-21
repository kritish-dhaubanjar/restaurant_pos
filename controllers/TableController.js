const Table = require("../models/Table");
const Menu = require("../models/Menu");
const Reservation = require("../models/Reservation");
const Item = require("../models/Item");

findMenuById = id => {
  return Menu.findAll({ where: { id } }).then(menus => {
    return menus[0];
  });
};

findById = id => {
  return Table.findAll({ where: { id } }).then(tables => {
    return tables[0];
  });
};

exports.index = (req, res, next) => {
  Table.findAll().then(tables => {
    return res.send(tables);
  });
};

exports.store = (req, res, next) => {
  let name = req.body.name;
  Table.create({
    name,
    reserved: false
  }).then(() => {
    return res.send({ status: 201 });
  });
};

exports.update = (req, res, next) => {
  let table_id = req.params.id;
  let name = req.body.name;
  findById(table_id).then(table => {
    table.name = name;
    table.save().then(() => {
      return res.send({ status: 200 });
    });
  });
};

exports.delete = (req, res, next) => {
  let table_id = req.params.id;
  findById(table_id).then(table => {
    table.destroy().then(() => {
      return res.send({ status: 200 });
    });
  });
};

/* */

exports.reserve = (req, res, next) => {
  let table_id = req.params.id;
  findById(table_id).then(table => {
    if (!table.reserved) {
      table.createReservation({}).then(() => {
        table.reserved = true;
        table.save().then(() => {
          return res.send({ status: 200 });
        });
      });
    } else {
      return res.send({ status: 500 });
    }
  });
};

exports.addItem = (req, res, next) => {
  table_id = req.params.id;
  item = req.body.item;
  // item = {
  //   id: 1,
  //   qty: 3
  // };
  Reservation.findAll({
    where: { tableId: table_id },
    order: [["id", "DESC"]]
  }).then(reservations => {
    findMenuById(item.id).then(menu => {
      reservations[0]
        .addMenus(menu, {
          through: { qty: item.qty, rate: menu.rate }
        })
        .then(() => {
          return res.send({ status: 201 });
        });
    });
  });
};

exports.removeItem = (req, res, next) => {
  table_id = req.params.id;
  item_id = req.body.item_id;
  Reservation.findAll({
    where: { tableId: table_id },
    order: [["id", "DESC"]]
  }).then(reservations => {
    findMenuById(item_id).then(menu => {
      reservations[0].removeMenu(menu).then(() => {
        return res.send({ status: 200 });
      });
    });
  });
};

exports.checkout = (req, res, next) => {
  let table_id = req.params.id;
  let discount = req.body.discount;
  let total = 0;
  Reservation.findAll({
    where: { tableId: table_id },
    order: [["id", "DESC"]]
  }).then(reservations => {
    Item.findAll({
      where: {
        reservationId: reservations[0].id
      }
    }).then(items => {
      items.forEach(item => {
        total += item.qty * item.rate;
      });
      reservations[0]
        .createTransaction({
          discount,
          total,
          grandTotal: total - (discount / 100) * total
        })
        .then(() => {
          findById(table_id).then(table => {
            table.reserved = false;
            table.save().then(() => {
              return res.send({ status: 200 });
            });
          });
        });
    });
  });
};

// exports.addItems = () => {
//   let order = {
//     table_id: 1,
//     items: [
//       {
//         id: 1,
//         qty: 3
//       },
//       {
//         id: 2,
//         qty: 2
//       }
//     ]
//   };
//   return Reservation.findAll({
//     where: { tableId: order.table_id },
//     order: [["id", "DESC"]]
//   }).then(reservations => {
//     order.items.forEach(item => {
//       findMenuById(item.id).then(menu => {
//         reservations[0].addMenus(menu, {
//           through: { qty: item.qty, rate: menu.rate }
//         });
//       });
//     });
//   });
// };
