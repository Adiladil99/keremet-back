const router = require("express").Router();
const upload = require("../../middleware/upload.js");
const { authJwt } = require("../../middleware");

module.exports = app => {
  const services = require("../../controllers/master/master_services.controller.js");

  router.post("/", [authJwt.verifyToken], upload.single("image"), services.create);

  router.get("/", [authJwt.verifyToken], services.findAll);

  router.put("/:id", [authJwt.verifyToken], upload.single("image"), services.update);

  router.delete("/:id", [authJwt.verifyToken], services.delete);

  app.use('/api/master/services', router);
};
