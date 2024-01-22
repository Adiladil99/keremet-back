const db = require("../../models");

exports.findAll = (req, res) => {
  db.cities.findAll()
    .then(data => {
      res.send(data.length ? data : {message: 'Города не найдены'});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};