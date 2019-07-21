// TableController.checkout();

// Table.create({
//   name: "Table 1",
//   reserved: false
// });

// Table.create({
//   name: "Table 2",
//   reserved: true
// });

// TableController.reserve();
// TableController.addItems();
// TableController.removeItem();

// CategoryController.delete();

// Reservation.findAll({ where: { id: 1 } }).then(reservations => {
//   Menu.findAll({ where: { id: 2 } }).then(menus => {
//     reservations[0].addMenus(menus[0], {
//       through: { qty: 4.5, rate: menus[0].rate }
//     });
//   });
// });

// CategoryController.findById(2).then(category => {
//   console.log(category);
// });

// CategoryController.update().then(res => {
//   console.log(res);
// });

// CategoryController.store();
// MenuController.store();

// Table.findAll({
//   where: {
//     tableName: "Table 1"
//   }
// }).then(table => {
//   table[0].getReservations().then(res => {
//     console.log(res);
//   });
// });

// Table.findAll({
//   where: {
//     tableName: "Table 1"
//   }
// }).then(table => {
//   table[0].createReservation({}).then(res => {
//     console.log(res);
//   });
// });

// Table.sync({ force: true }).then(() => {
//   //
//   Reservation.sync({ force: true });
//   //
//   Table.create({
//     tableName: "Table 1",
//     reserved: false
//   });

//   Table.create({
//     tableName: "Table 2",
//     reserved: false
//   });
// });
