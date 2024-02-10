const router = require("express").Router();
const upload = require("../../middleware/upload.js");
const { authJwt } = require("../../middleware");

module.exports = app => {
  const socials = require("../../controllers/master/master_socials.controller.js");

  router.post("/", [authJwt.verifyToken], upload.single("image"), socials.create);

  router.get("/", [authJwt.verifyToken], socials.findAll);

  router.put("/:id", [authJwt.verifyToken], upload.single("image"), socials.update);

  router.delete("/:id", [authJwt.verifyToken], socials.delete);

  app.use('/api/master/socials', router);
};
