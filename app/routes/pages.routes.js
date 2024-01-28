const router = require("express").Router();

module.exports = app => {

  const pages = require("../controllers/pages.controller.js");

  router.get("/static/:type", pages.findByStatic);
  router.get("/mainpage", pages.getMainPage)
  // router.get("/c/:slug", pages.findBySlug);

  // router.post("/category", upload.single("main_image"), products.findByCategories);

  app.use('/api/pages', router);
};
