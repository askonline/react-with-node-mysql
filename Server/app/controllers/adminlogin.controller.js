const config = require("../config/auth.config");
const db = require("../models");
const Adminuser = db.adminuser;
const Role = db.role;
//---------------------Start Mail Function
const nodemailer = require('nodemailer');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
randnogenrate=Math.floor(100000 + Math.random() * 900000);
exports.adminsignup = (req, res) => {
  const adminuser = new Adminuser({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    verify_code : randnogenrate,
    email_status : 0,
    mobile_status: 0,
    mobile_number :req.body.mobile_number,
    user_status :0,
    ip_Mack_addres:req.body.ip_Mack_addres
  });

  adminuser.save((err, adminuser) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          adminuser.roles = roles.map(role => role._id);
          adminuser.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
          
            res.send({ message: "Your account has been registered successfully!",status:1 });
          });
        }
      );
    } else {
      Role.findOne({ name: "admin" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        adminuser.roles = [role._id];
        adminuser.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Admin user has been registered successfully!",status:1 });
        });
      });
    }
  });
};

exports.adminsignin = (req, res) => {
  Adminuser.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, adminuser) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!adminuser) {
        return res.status(404).send({ message: "User Not found.",status:0 });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        adminuser.password
      );
	  
	  
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
          status:0
        });
      }
	if(adminuser.email_status==0 && adminuser.user_status==0)
	  {
		 return res.status(404).send({ message: "Your email is not verify. please verify email . A verification link has been already sent to your email account.",status:0 }); 
	  }

	if(adminuser.mobile_status==0)
	  {
		 return res.status(404).send({ message: "Your mobile number is not verify . please verify mobile.",status:0 }); 
	  }
	  
      var token = jwt.sign({ id: adminuser.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < adminuser.roles.length; i++) {
        authorities.push("ROLE_" + adminuser.roles[i].name.toUpperCase());
      }
      res.status(200).send({
      
       usersigndata: [
        {
          id: adminuser._id, 
          username: adminuser.username,
          email: adminuser.email,
          roles: authorities,
          email_status : adminuser.email_status,
          mobile_number : adminuser.mobile_number,
          mobile_status : adminuser.mobile_status,
          user_status : adminuser.user_status,
		  accessToken: token,
          createdDate:adminuser.createdDate
         
          }
        ],
        message:"Success",
        status:1
        
       
       
      });
    });
};

