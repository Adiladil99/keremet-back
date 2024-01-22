const upload = require("../../middleware/upload");
const { authJwt } = require("../../middleware");

module.exports = function(app) {
  
  const authClient = require("../../controllers/auth-master.controller.js");

  var router = require("express").Router();

  router.post("/login", upload.single(""), authClient.signin);
  router.post("/register", upload.single("image"), authClient.signup);
  router.post("/logout", upload.single(""), authClient.logout);
  router.get("/me", [authJwt.verifyToken], authClient.me);

  app.use('/api/auth-master', router);
};
