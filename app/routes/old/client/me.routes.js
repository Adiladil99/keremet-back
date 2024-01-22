const { authJwt } = require("../../../middleware");
module.exports = app => {
  const authClient = require("../../../controllers/old/auth.controller.js");
  var router = require("express").Router();
  app.use('/api/me', router);
  app.get("/api/me", [authJwt.verifyToken], authClient.me);
  app.put("/api/me", [authJwt.verifyToken], authClient.update);
};
