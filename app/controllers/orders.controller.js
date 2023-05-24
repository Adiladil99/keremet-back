const db = require("../models");
const Op = db.Sequelize.Op;

// Retrieve all Products from the database.
exports.getOrders = async (req, res) => {
  await db.order_status.findAll({ 
    include: [{
      model: db.orders,
      as: 'orderId'
    }, {
      model: db.drivers,
      as: 'driverId',
      attributes: ["fio", "email", "phone"]
    }],
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
  const price = req.body.price
  db.orders.create({	
    type: req.body.type,
    door_to_door: req.body.door_to_door,
    weight: req.body.weight,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    sender_city: req.body.sender_city,
    recipient_city: req.body.recipient_city,
    sender_address: req.body.sender_address,
    recipient_address: req.body.recipient_address,
    sender_postcode: req.body.sender_postcode,
    recipient_postcode: req.body.recipient_postcode,
    send_date: req.body.send_date,
    sender_name: req.body.sender_name,
    recipient_name: req.body.recipient_name,
    sender_phone: req.body.sender_phone,
    recipient_phone: req.body.recipient_phone,
    comments: req.body.comments,
    map_data: req.body.map_data,
    type_payment: req.body.type_payment
  })
  .then(order => {
    const orderId = order.id;

    db.order_status.create({
      client_id: client_id,
      order_id: orderId,
        price: price
    })
    .then(status => {
      res.status(200).send({
        order: order,
        status: status,
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    })
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  })
}

exports.returnOrder = async (req, res) => {
  
}
