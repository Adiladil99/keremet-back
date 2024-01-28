const upload = require("../../middleware/upload");
const { authJwt } = require("../../middleware");

module.exports = function(app) {
  
  const authClient = require("../../controllers/auth-master.controller.js");

  var router = require("express").Router();

  router.post("/login", upload.single(""), authClient.signin);
  router.post("/register", upload.single("image"), authClient.signup);
  router.get("/me", [authJwt.verifyToken], authClient.me);
  router.put("/update", [authJwt.verifyToken], authClient.update);

  app.use('/api/auth-master', router);
};
