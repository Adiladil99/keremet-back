const db = require("../models");
const Op = db.Sequelize.Op;

// Retrieve all Products from the database.
exports.getSearchResult = async (req, res) => {
  const text = req.query.text;
  const lang = req.query.lang;
  db.pr_product.findAll(
    { 
      include: [{
        model: db.translates,
        as: 'nameField',
        attributes: {exclude: ['id', 'createdAt', 'updatedAt']}, 
        where: {
          [Op.or]: [
            { 
              ru: {
                [Op.like]: '%' + text + '%'
              } 
            },
            { 
              en: {
                [Op.like]: '%' + text + '%'
              } 
            },
            { 
              ru: {
                [Op.like]: '%' + text + '%'
              } 
            },
          ]
        },
      }, {
        model: db.translates,
        as: 'descriptionField',
        attributes: {exclude: ['id', 'createdAt', 'updatedAt']}, 
      },{
        model: db.sh_inventory,
        attributes: {exclude: ['pharmacyProductStatusId', 'pharmacyAddressId', 'productId', 'createdAt', 'updatedAt']}, 
        include: [{
          model: db.sh_addresses,
          attributes: {exclude: ['is_warehouse', 'status', 'createdAt',, 'pharmacyId', 'cityId', 'updatedAt']},
        }]
      }],
      order: [
        [db.sh_inventory, 'price']
      ]
    }    
  )
    .then(data => {
      data.forEach((item, id) => {
        data[id]['name'] = item.nameField[lang || 'ru']
        data[id]['description'] = item.descriptionField[lang || 'ru']
        delete data[id]['descriptionField'];
      })
      res.send(data.length ? data : {message: 'Товар не найден'});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};
