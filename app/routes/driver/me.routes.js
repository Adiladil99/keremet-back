const { authJwt } = require("../../middleware");
module.exports = app => {
  const authClient = require("../../controllers/auth-driver.controller.js");
  var router = require("express").Router();
  app.use('/api/driver/me', router);
  app.get("/api/driver/me", [authJwt.verifyToken], authClient.me);
};
