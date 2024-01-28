const upload = require("../../middleware/upload");
const { authJwt } = require("../../middleware");

module.exports = function(app) {
  
  const clientFavourites = require("../../controllers/client-favourites.controller.js");

  var router = require("express").Router();

  router.get("/", [authJwt.verifyToken], clientFavourites.getAll);
  router.post("/", upload.single(""), [authJwt.verifyToken], clientFavourites.create);
  router.delete("/:id", [authJwt.verifyToken], clientFavourites.delete);

  app.use('/api/client/favourites', router);
};
