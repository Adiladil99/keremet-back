const { authJwt } = require("../../middleware/index.js");
module.exports = app => {
  const moving = require("../../controllers/old/moving.controller.js");

  var router = require("express").Router();

  router.get("/", [authJwt.verifyToken], moving.getOrders);
  router.post("/", [authJwt.verifyToken], moving.postOrders);

  app.use('/api/moving', router);
};
