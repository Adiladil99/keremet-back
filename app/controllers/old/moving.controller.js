const db = require("../../models");
const Op = db.Sequelize.Op;

// Retrieve all Products from the database.
exports.getOrders = async (req, res) => {
  await db.moving.findAll({
    where: { client_id: req.userId},
  })
  .then(order => {
    res.status(200).send({
      data: order
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  })
};

exports.postOrders = async (req, res) => {
  const client_id = req.userId
  db.moving.create({
    type: req.body.type,
    type_payment: req.body.type_payment,
    car_bool: req.body.car_bool,
    count_employee: req.body.count_employee,
    total: req.body.total,
    address: req.body.address,
    date_start: req.body.date_start,
    hours: req.body.hours,
    client_id: client_id
  })
  .then(status => {
    res.status(200).send({
      data: status
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  })
}
