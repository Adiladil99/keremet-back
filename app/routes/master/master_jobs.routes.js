const router = require("express").Router();
const upload = require("../../middleware/upload.js");
const { authJwt } = require("../../middleware");

module.exports = app => {
  const jobs = require("../../controllers/master/master_jobs.controller.js");

  router.post("/", [authJwt.verifyToken], upload.single("image"), jobs.create);

  router.get("/", [authJwt.verifyToken], jobs.findAll);

  router.put("/:id", [authJwt.verifyToken], upload.single("image"), jobs.update);

  router.delete("/:id", [authJwt.verifyToken], jobs.delete);

  app.use('/api/master/jobs', router);
};
