const router = require("express").Router();

module.exports = app => {

  const categories = require("../controllers/category.controller.js");

  router.get("/", categories.findAll);
  router.get("/c/:slug", categories.findBySlug);

  // router.post("/category", upload.single("main_image"), products.findByCategories);

  app.use('/api/categories', router);
};
