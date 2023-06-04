const { authJwt } = require("../middleware");
module.exports = app => {
  const orders = require("../controllers/orders.controller.js");

  var router = require("express").Router();

  router.get("/", [authJwt.verifyToken], orders.getOrders);
  router.post("/drivers", orders.getOrders1);
  router.post("/", [authJwt.verifyToken], orders.postOrders);
  router.post("/returned", [authJwt.verifyToken], orders.returnOrder);

  app.use('/api/orders', router);
};
