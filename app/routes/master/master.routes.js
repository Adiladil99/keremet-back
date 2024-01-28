const router = require("express").Router();

module.exports = app => {

  const categories = require("../../controllers/master.controller.js");

  router.get("/:id", categories.findByNick);
  router.get("/c/:slug", categories.findBySlug);

  // router.post("/category", upload.single("main_image"), products.findByCategories);

  app.use('/api/masters', router);
};
