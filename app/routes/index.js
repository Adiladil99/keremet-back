module.exports = (app) => {
 require("./category.routes")(app);
 require("./services.routes")(app);
 require("./pages.routes")(app);
 require("./master/auth.routes")(app);
 require("./master/master_services.routes")(app);
 require("./master/master_gallery.routes")(app);
 require("./master/master_jobs.routes")(app);
 require("./master/master_socials.routes")(app);
 require("./master/master_weekend.routes")(app);
 require("./master/master_schedule.routes")(app);
 require("./master/master_weekend.routes")(app);
 require("./master/master.routes")(app);
 require("./client/auth.routes")(app);
 require("./client/favourites.routes")(app);
}