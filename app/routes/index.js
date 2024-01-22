module.exports = (app) => {
 require("./category.routes")(app);
 require("./master/auth.routes")(app);
 require("./client/auth.routes")(app);
}