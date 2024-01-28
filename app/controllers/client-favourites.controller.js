const db = require("../models");
const Op = db.Sequelize.Op;

// Retrieve all Products from the database.
exports.getAll = async (req, res) => {
  await db.client_favourites.findAll({
    where: { client_id: req.userId},
    include: [
      {
        model: db.master,
        as: 'master'
      }
    ]
  })
  .then(data => {
    res.status(200).send({
      data
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  })
};

exports.create = async (req, res) => {
  const client_id = req.userId
  db.client_favourites.create({
    client_id: client_id,
    master_id: req.body.master_id
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

// Retrieve all Products from the database.
exports.delete = async (req, res) => {
  const id = req.params.id;
  const client_id = req.userId

  db.client_favourites.destroy({
    where: { 
      master_id: id,
      client_id: client_id
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Favourite was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Category_cargo with id=${id}. Maybe Category_cargo was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category_cargo with id=" + id
      });
    });
};
