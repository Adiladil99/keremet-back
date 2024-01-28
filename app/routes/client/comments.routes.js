const upload = require("../../middleware/upload");
const { authJwt } = require("../../middleware");

module.exports = function(app) {
  
  const clientComments = require("../../controllers/client-comment.controller.js");

  var router = require("express").Router();

  router.post("/", upload.single(""), [authJwt.verifyToken], clientComments.create);

  app.use('/api/client/comment', router);
};
