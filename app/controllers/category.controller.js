const db = require("../models");
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  db.category.findAll({
    include: [
      {
        model: db.sub_category,
        as: 'childs'
      }
    ]
  })
    .then(data => {
      res.send({data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};

exports.findBySlug = (req, res) => {
  db.category.findOne({
    where: {
      slug: req.params.slug
    },
    include: [
      {
        model: db.sub_category,
        as: 'childs'
      }
    ]
  })
    .then(async data => {
      let ids = data.childs.map(item => item.id)
      await db.service.findAll({
        where: {
          subcategory_id: {
            [Op.in]: ids
          }
        },
      }).then(async card => {
        let idxses = card.map(item => item.id)
        await db.master.findAll({
          attributes: {exclude: ['password', 'createdAt', 'updatedAt', 'birthday', 'email']},
          include: [
            {
              model: db.master_services,
              as: 'services',
              attributes: {exclude: ['createdAt', 'updatedAt']},
              where: {
                service_id: {
                  [Op.in]: idxses
                }
              }
            }
          ]
        }).then(service => {
          res.send({ data: {
            data: data,
            cards: service
          }});
        })
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};