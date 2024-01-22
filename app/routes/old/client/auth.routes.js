const upload = require("../../../middleware/upload");

module.exports = function(app) {
  
  const authClient = require("../../../controllers/old/auth.controller.js");

  var router = require("express").Router();

  router.post("/login", upload.single(""), authClient.signin);
  router.post("/logout", upload.single(""), authClient.logout);
  router.post("/register", upload.single("image"), authClient.signup);

  app.use('/api/auth', router);
};
