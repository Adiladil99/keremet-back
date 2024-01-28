const db = require("../models");
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  db.category.findAll({
    include: [
      {
        model: db.sub_category,
        as: 'subcategories'
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
        as: 'subcategories'
      }
    ]
  })
    .then(async data => {
      let ids = data.subcategories.map(item => item.id)
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
          data.dataValues.cards = service
          data.dataValues.filters = {
            types: ['Мастер', 'Барбер', 'Врач', 'Массажист', 'Косметолог', 'Парикмахер', 'Стилист']
          }
          res.send({ data });
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


exports.findBySlugSub = (req, res) => {
  db.sub_category.findOne({
    where: {
      slug: req.params.slug
    }
  })
    .then(async data => {
      await db.service.findAll({
        where: {
          subcategory_id: data.id
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
          data.dataValues.cards = service
          data.dataValues.filters = {
            types: ['Мастер', 'Барбер', 'Врач', 'Массажист', 'Косметолог', 'Парикмахер', 'Стилист']
          }
          res.send({ data });
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