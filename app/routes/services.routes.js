const router = require("express").Router();

module.exports = app => {

  const services = require("../controllers/services.controller.js");

  router.get("/:id", services.findBySubcategoryId);

  // router.post("/category", upload.single("main_image"), products.findByCategories);

  app.use('/api/services', router);
};
