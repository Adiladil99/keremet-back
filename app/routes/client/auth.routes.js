const upload = require("../../middleware/upload");
const { authJwt } = require("../../middleware");

module.exports = function(app) {
  
  const authClient = require("../../controllers/auth-client.controller.js");

  var router = require("express").Router();

  router.post("/login", upload.single(""), authClient.signin);
  router.post("/register", upload.single("image"), authClient.signup);
  router.get("/me", [authJwt.verifyToken], authClient.me);
  router.put("/update", [authJwt.verifyToken], authClient.update);
  router.put("/update-image", [authJwt.verifyToken], upload.single("image"), authClient.updateImage);
  router.put("/change-password", [authJwt.verifyToken], upload.single("image"), authClient.changePassword);

  app.use('/api/auth-client', router);
};
