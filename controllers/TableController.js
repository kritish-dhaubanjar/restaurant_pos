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

exports.index = () => {
  return Table.findAll();
};

exports.store = () => {
  let name = "Table 1";
  return Table.create({
    name
  });
};

exports.update = () => {
  let table_id = 2;
  let name = "Table 2";
  return findById(table_id).then(table => {
    table.name = name;
    return table.save();
  });
};

exports.delete = () => {
  let table_id = 1;
  return findById(table_id).then(table => {
    return table.destroy();
  });
};

/* */

exports.reserve = () => {
  let table_id = 1;
  return findById(table_id).then(table => {
    if (!table.reserved) {
      return table.createReservation({});
    } else {
      return false;
    }
  });
};

exports.addItem = () => {
  table_id = 1;
  item = {
    id: 1,
    qty: 3
  };
  return Reservation.findAll({
    where: { tableId: table_id },
    order: [["id", "DESC"]]
  }).then(reservations => {
    return findMenuById(item.id).then(menu => {
      return reservations[0].addMenus(menu, {
        through: { qty: item.qty, rate: menu.rate }
      });
    });
  });
};

exports.removeItem = () => {
  table_id = 1;
  item_id = 1;
  return Reservation.findAll({
    where: { tableId: table_id },
    order: [["id", "DESC"]]
  }).then(reservations => {
    return findMenuById(item_id).then(menu => {
      return reservations[0].removeMenu(menu);
    });
  });
};

exports.checkout = () => {
  let table_id = 1;
  let discount = 15;
  let total = 0;
  return Reservation.findAll({
    where: { tableId: table_id },
    order: [["id", "DESC"]]
  }).then(reservations => {
    return Item.findAll({
      where: {
        reservationId: reservations[0].id
      }
    }).then(items => {
      items.forEach(item => {
        total += item.qty * item.rate;
      });
      return reservations[0]
        .createTransaction({
          discount,
          total,
          grandTotal: total - (discount / 100) * total
        })
        .then(res => {
          return findById(table_id).then(table => {
            table.reserved = false;
            return table.save();
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
