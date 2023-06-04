const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const bodyParser = require('body-parser');
const path = require('path');
const express = require("express");
const Connect = require('connect-pg-simple')
const session = require('express-session')
const cors = require("cors");
const AdminJSSequelize = require('@adminjs/sequelize')
const adminOptions = require("./app/admin");
const moment = require('moment-timezone');

const PORT = process.env.PORT || 3002;
// const PORT = process.env.PORT || 3000;
const DEFAULT_ADMIN = {
  email: 'admin@keremet.kz',
  password: 'admin',
}
const db = require("./app/models");
// const Product = require("./app/models/product.model")

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
})

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

const start = async () => {
  // const adminOptions = {
  //   // We pass Category to `resources`
  //   resources: [Product],
  // }
  moment.tz.setDefault('Asia/Almaty');
  const app = express();
  const admin = new AdminJS(adminOptions)
  // const admin = new AdminJS({
  //   databases: [db]
  // })
  const ConnectSession = Connect(session)
  // const sessionStore = new ConnectSession({
  //   conObject: {
  //     connectionString: 'mysql://root:root@localhost:3306/ecommerce',
  //     ssl: process.env.NODE_ENV === 'production',
  //   },
  //   tableName: 'session',
  //   createTableIfMissing: true,
  // })

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      // store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    } 
  )
  
  app.use(admin.options.rootPath, adminRouter)
  admin.watch()
  
  // var corsOptions = {
  //   origin: "https://localhost:8080"
  // };
  app.use(cors());

  // parse requests of content-type - application/json
  app.use(bodyParser.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/upload', express.static(path.join(__dirname, "/upload"))); 
  app.use(express.static(path.join(__dirname, "/public")));

  const Role = db.role;
  // {alter:true}
  // {force: true}
  db.sequelize.sync()
    .then(() => {
      console.log("Synced db.");
      // initial()
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message); 
    });

  // db.sequelize.sync({ force: true }).then(() => {
  //   console.log("Drop and re-sync db.");
  // });

  // simple route
  app.get("/", (req, res) => {
    res.redirect("/admin");
  });

  // set port, listen for requests
  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
  });
  // require("./app/routes/product.routes")(app);
  // require("./app/routes/categories.routes")(app);
  // require('./app/routes/auth.routes')(app);
  // require('./app/routes/user.routes')(app);
  // require('./app/routes/merchant/auth.routes')(app);
  // require('./app/routes/merchant/addresses.routes')(app);
  require("./app/routes")(app);
  function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }
}

start()
