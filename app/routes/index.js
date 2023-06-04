module.exports = (app) => {
 require("./cities.routes")(app);
 require('./orders.routes')(app);
 require('./moving.routes')(app);
 require('./search.routes')(app);
 require('./client/auth.routes')(app);
 require('./client/me.routes')(app);
 require('./driver/auth.routes')(app);
 require('./driver/me.routes')(app);
}