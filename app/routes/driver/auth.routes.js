const upload = require("../../middleware/upload");

module.exports = function(app) {
  
  const authClient = require("../../controllers/auth-driver.controller.js");

  var router = require("express").Router();

  router.post("/login", upload.single(""), authClient.signin);
  router.post("/logout", upload.single(""), authClient.logout);
  router.post("/updateloc", upload.single(""), authClient.updateloc);
  router.post("/updateOrder", upload.single(""), authClient.updateOrder);
  router.post("/getLoc", upload.single(""), authClient.getLoc);

  app.use('/api/auth-driver', router);
};
