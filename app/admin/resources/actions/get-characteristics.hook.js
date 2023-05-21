const { ActionRequest, ActionResponse, After, flat } = require('adminjs');
const { isGETMethod } = require('../config/admin.utils.js');
const db = require('../../../models')

module.exports = () =>
  async (response, request) => {
   if (!isGETMethod(request)) {
    return response;
   }

    const id = parseInt(request.params.recordId, 10);
    const attribute = await db.category_characteristics.findAll({
      include: [{
        model: db.pr_category,
        attributes: ['name'],
        where: {id: id}
      }, {
        model: db.pr_attribute,
        include: [
          {
            model: db.pr_attribute_values,
            attributes: ['name']
          }
        ],
      }]
    });
    
    // attribute.map(async (item, id) => {
    //   attribute[id].dataValues.details = db.pr_attribute.findOne({
    //     include: [
    //       {
    //         model: db.pr_attribute_values,
    //         attributes: ['name']
    //       }
    //     ],
    //     where: {id: attribute[id].dataValues.attribute}
    //   });
    // })
    
    //  order.features?.map(item => console.log(item))   
    const params = flat.unflatten(response.record.params);
    params.characteristics = attribute?.map((cart) => (cart.dataValues));

    response.record.params = params;
    console.log(attribute);
    // console.log(response.record.params.characteristics[0].details);

    return response;
  };
