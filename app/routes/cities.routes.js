const router = require("express").Router();

module.exports = app => {

  const cities = require("../controllers/cities.controller.js");

  router.get("/", cities.findAll);

  // router.post("/category", upload.single("main_image"), products.findByCategories);

  app.use('/api/cities', router);
};
