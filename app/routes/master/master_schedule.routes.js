const router = require("express").Router();
const upload = require("../../middleware/upload.js");
const { authJwt } = require("../../middleware");

module.exports = app => {
  const schedule = require("../../controllers/master/master_schedule.controller.js");

  router.post("/", [authJwt.verifyToken], upload.single(""), schedule.create);

  router.get("/", [authJwt.verifyToken], schedule.findAll);

  router.put("/:id", [authJwt.verifyToken], upload.single(""), schedule.update);

  router.delete("/:id", [authJwt.verifyToken], schedule.delete);

  app.use('/api/master/schedule', router);
};
