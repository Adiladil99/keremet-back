const { ActionRequest, ActionResponse, After, flat } = require('adminjs');
const { isGETMethod } = require('../config/admin.utils.js');
const db = require('../../../models')

module.exports = () =>
  async (response, request) => {
   if (!isGETMethod(request)) {
    return response;
   }

   const id = parseInt(request.params.recordId, 10);

  //  const attribute = await db.pr_brand.findAll();
   const attribute = await db.category_brands.findAll({
     include: [{
       model: db.pr_category,
       attributes: ['name'],
       where: {id: id}
     }, {
       model: db.pr_brand,
     }]
   });
   console.log(attribute);
    //  order.features?.map(item => console.log(item))   
   const params = flat.unflatten(response.record.params);
   params.brands = attribute?.map((cart) => (cart.dataValues));

   response.record.params = params;

   return response;
  };
