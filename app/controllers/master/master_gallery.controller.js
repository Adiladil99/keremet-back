const db = require("../../models");
const Schedule = db.master_gallery;
const Op = db.Sequelize.Op;

// Create and Save a new City
exports.create = (req, res) => {
  // Save City in the database
  let obj = req.body
  obj.master_id = req.userId
  if (req.file?.filename) {
    obj.image = "/upload/" + req.file.filename
  }
  Schedule.create(obj)
    .then(data => {
      res.send({data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the City."
      });
    });
};

// Retrieve all Schedule from the database.
exports.findAll = (req, res) => {
  db.master.findOne({
    where: {
      id: req.userId
    },
    include: [
      {
        model: db.master_gallery,
        as: "gallery"
      }
    ]
  })
  .then(data => {
    res.send({data: data.gallery});
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving cities."
    });
  });
};

// Update a City by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  let obj = req.body
  if (req.file?.filename) {
    obj.image = "/upload/" + req.file.filename
  }

  Schedule.update(obj, {
    where: { id: id, master_id: req.userId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "График работы успешно изменен!"
        });
      } else {
        res.send({
          message: `Не удалось найти график работы по id = ${id}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating City with id=" + id
      });
    });
};

// Delete a City with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Schedule.destroy({
    where: { id: id, master_id: req.userId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "График работы успешно удален!"
        });
      } else {
        res.send({
          message: `Не удалось найти график работы по id = ${id}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Schedule with id=" + id
      });
    });
};