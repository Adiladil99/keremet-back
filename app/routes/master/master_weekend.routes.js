const router = require("express").Router();
const upload = require("../../middleware/upload.js");
const { authJwt } = require("../../middleware");

module.exports = app => {
  const weekend = require("../../controllers/master/master_weekend.controller.js");

  router.post("/", [authJwt.verifyToken], upload.single("image"), weekend.create);

  router.get("/", [authJwt.verifyToken], weekend.findAll);

  router.put("/:id", [authJwt.verifyToken], upload.single("image"), weekend.update);

  router.delete("/:id", [authJwt.verifyToken], weekend.delete);

  app.use('/api/master/weekend', router);
};
