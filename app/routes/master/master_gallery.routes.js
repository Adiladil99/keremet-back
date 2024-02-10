const router = require("express").Router();
const upload = require("../../middleware/upload.js");
const { authJwt } = require("../../middleware");

module.exports = app => {
  const schedule = require("../../controllers/master/master_gallery.controller.js");

  router.post("/", [authJwt.verifyToken], upload.single("image"), schedule.create);

  router.get("/", [authJwt.verifyToken], schedule.findAll);

  router.put("/:id", [authJwt.verifyToken], upload.single("image"), schedule.update);

  router.delete("/:id", [authJwt.verifyToken], schedule.delete);

  app.use('/api/master/gallery', router);
};
