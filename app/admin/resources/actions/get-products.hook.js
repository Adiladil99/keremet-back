const { ActionRequest, ActionResponse, After, flat } = require('adminjs');
const { isGETMethod } = require('../config/admin.utils.js');
const db = require('../../../models')

module.exports = () =>
  async (response, request) => {
   if (!isGETMethod(request)) {
    return response;
   }

   const id = parseInt(request.params.recordId, 10);

   const order = await db.features.findAll({
    where: { productId: id },
    include: [
      { 
        model: db.pr_attribute,
        attributes: ['name'],
      }, 
      {
        model: db.pr_attribute_values,
        attributes: ['name']
      }
      ]
    });

    

   const atributeId = await db.category_characteristics.findAll({
    where: { categoryId: 11 },
    attributes: ['attributeId']
    });

    const character = await db.pr_attribute.findAll({
      where: { id: atributeId?.map((cart) => (cart.dataValues.attributeId)) },
      include: [
        {
          model: db.pr_attribute_values,
          attributes: ['id', 'name']
        }
      ],
      attributes: ['id', 'name', 'mandatory', 'position']
      });
    
   const params = response.record.params;
   params.features = order?.map((cart) => (cart.dataValues));
   params.character = character?.map((cart) => cart);

   response.record.params = params;

   return response;
  };
