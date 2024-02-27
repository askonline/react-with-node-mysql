const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  if(!req.body.mobile_number) {
        return res.status(400).send({
            message: "Mobile number can not be empty",
            status:0
        });
    }
  if(!req.body.email) {
        return res.status(400).send({
            message: "Email can not be empty",
            status:0
        });
    }
  if(!req.body.password) {
        return res.status(400).send({
            message: "Password can not be empty",
            status:0
        });
    }
    if(!req.body.ip_Mack_addres) {
        return res.status(400).send({
            message: "IP or mack addres can not be empty",
            status:0
        });
    }
  User.findOne({
    mobile_number: req.body.mobile_number
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    //console.log(user);
    if (user) {
      res.status(400).send({ message: "Failed! Mobile no is already in used!",status:0});
      return;
    }
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in used!" ,status:0});
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,status:0
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
