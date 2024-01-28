const db = require("../models");
const Op = db.Sequelize.Op;

exports.findByNick = (req, res) => {
  db.master.findOne({
    where: {
      nickname: req.params.id
    },
    include: [
      {
        model: db.master_services,
        as: 'services',
        include: [
          {
            model: db.service,
            as: "service",
            include: [
              {
                model: db.sub_category,
                as: "subcategory"
              }
            ]
          }
        ]
      },
      {
        model: db.master_comments,
        as: 'comments',
        include: [
          {
            model: db.client,
            as: "client",
            attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
          }
        ]
      },
      {
        model: db.master_gallery,
        as: 'gallery'
      },
      {
        model: db.master_jobs,
        as: 'jobs'
      },
      {
        model: db.master_socials,
        as: 'socials'
      }
    ]
  })
    .then(data => {
      let serviceArray = {}
      data.services.forEach(item => {
        const subcategory = item.service.subcategory;
        if (serviceArray.hasOwnProperty(item.service.subcategory_id)) {
          serviceArray[item.service.subcategory_id].services.push({
            id: item.id,
            name: item.service.name,
            description: item.service.description,
            image: item.service.image,
            time: item.time,
            price: item.price,
            is_home: item.is_home,
            master_service_id: item.id
          })
        } else {
          serviceArray[item.service.subcategory_id] = {
            id: subcategory.id,
            name: subcategory.name,
            slug: subcategory.slug,
            description: subcategory.description,
            image: subcategory.image,
            category_id: subcategory.category_id,
            services: [{
              id: item.id,
              name: item.service.name,
              description: item.service.description,
              image: item.service.image,
              time: item.time,
              price: item.price,
              is_home: item.is_home,
              master_service_id: item.id
            }]
          }
        }
      });
      data.dataValues.services = Object.values(serviceArray)
      res.send({data: data.dataValues});
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