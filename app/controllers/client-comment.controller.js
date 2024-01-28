const db = require("../models");
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const client_id = req.userId
  db.master_comments.create({
    client_id: client_id,
    master_id: req.body.master_id,
    is_like: req.body.is_like || false,
    rating: req.body.rating || 5,
    comment: req.body.comment || "",
    service_id: req.body.service_id,
  })
  .then(data => {
    res.status(200).send({
      data
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  })
}