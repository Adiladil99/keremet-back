const router = require("express").Router();

module.exports = app => {
  const search = require("../controllers/search.controller.js");

  router.get("/",  search.getSearchResult);

  app.use('/api/search', router);
};
