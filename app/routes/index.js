module.exports = (app) => {
 require("./cities.routes")(app);
 require('./orders.routes')(app);
 require('./search.routes')(app);
 require('./client/auth.routes')(app);
 require('./client/me.routes')(app);
}