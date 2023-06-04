const { authJwt } = require("../middleware");
module.exports = app => {
  const moving = require("../controllers/moving.controller.js");

  var router = require("express").Router();

  router.get("/", [authJwt.verifyToken], moving.getOrders);
  router.post("/", [authJwt.verifyToken], moving.postOrders);

  app.use('/api/moving', router);
};
