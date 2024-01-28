module.exports = (app) => {
 require("./category.routes")(app);
 require("./pages.routes")(app);
 require("./master/auth.routes")(app);
 require("./master/master.routes")(app);
 require("./client/auth.routes")(app);
 require("./client/favourites.routes")(app);
}