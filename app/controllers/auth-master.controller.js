const db = require("../models");
const config = require("../config/auth.config");
const Master = db.master;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
  let queryAuth = req.body.email ? {email: req.body.email} : {phone: req.body.phone}
  Master.findOne({
    where: queryAuth,
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
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

exports.signup = (req, res) => {
  Master.create({	
    surname: req.body.surname,
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    birthday: req.body.birthday,
    password: bcrypt.hashSync(req.body.password, 8),
  })
  .then(user => {
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
  Master.findOne({
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

exports.me = (req, res) => {
  Master.findOne({
    where: {id: req.userId},
    include: [
      {
        model: db.master_services,
        as: "services"
      },
      {
        model: db.master_comments,
        as: "comments"
      },
      {
        model: db.master_gallery,
        as: "gallery"
      },
      {
        model: db.master_socials,
        as: "socials"
      },
    ],
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
  Master.findOne({
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