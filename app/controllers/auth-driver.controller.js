const db = require("../models");
const config = require("../config/auth.config");
const Driver = db.drivers;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
  let queryAuth = req.body.email ? {email: req.body.email} : {phone: req.body.phone}
  Driver.findOne({
    where: queryAuth,
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // var passwordIsValid = bcrypt.compareSync(
      //   req.body.password,
      //   user.password
      // );

      if (req.body.password !== user.password) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      
      res.status(200).send({
        user: user,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.logout = (req, res) => {
  Driver.findOne({
    where: {id: req.userId},
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // var passwordIsValid = bcrypt.compareSync(
      //   req.body.password,
      //   user.password
      // );

      if (req.body.password !== user.password) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      
      res.status(200).send({
        user: user,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateloc = (req, res) => {
  Driver.update({ geoloc: req.body.geoloc }, {
    where: {id: req.body.user_id}
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send({
        data: user
      });
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
}; 

exports.updateOrder = (req, res) => {
  db.order_status.update({ status: req.body.status }, {
    where: {
      id: req.body.id
    }
  })
    .then(order => {
      if (!order) {
        return res.status(404).send({ message: "Order Not found." });
      }
      res.status(200).send({
        data: order
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}; 

exports.getLoc = (req, res) => {
  db.drivers.findAll({
    where: {
      id: req.body.id
    }
  })
    .then(driver => {
      if (!driver) {
        return res.status(404).send({ message: "Driver Not found." });
      }
      res.status(200).send({
        location: driver[0].geoloc
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}; 


exports.me = (req, res) => {
  Driver.findOne({
    where: {id: req.userId},
    attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send({
        user
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}; 

exports.update = (req, res) => {
  Driver.findOne({
    where: {id: req.userId},
    attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send({
        user
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}; 