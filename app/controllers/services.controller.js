const db = require("../models");
const Op = db.Sequelize.Op;

exports.findBySubcategoryId = (req, res) => {
  db.service.findAll({
    include: [
      {
        model: db.sub_category,
        as: 'subcategory',
        where: {
          id: req.params.id
        }
      }
    ]
  })
    .then(data => {
      const newArray = data.map(item => {
        const { subcategory, ...rest } = item.dataValues;
        return rest;
      });
      res.send({data: newArray});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};