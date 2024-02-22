const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
//---------------------Start Mail Function
const nodemailer = require('nodemailer');
let transport = nodemailer.createTransport({
    host: "mail.xyz.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "do-not-reply@xyz.com", // generated ethereal user
      pass: "Local@1122" // generated ethereal password

    }
});
//---------------------End Mail Function
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
randnogenrate=Math.floor(100000 + Math.random() * 900000);
exports.signup = (req, res) => {
  const user = new User({
    username: req.body.email,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    verify_code : randnogenrate,
    email_status : 0,
    mobile_status: 0,
    mobile_number :req.body.mobile_number,
    user_image :'src/',
    user_status :0,
	kycid : 0,
	bankid : 0,
    ip_Mack_addres:req.body.ip_Mack_addres

  });

  user.save((err, user) => {
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

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            //----------------------Start Send Mail
             var token = jwt.sign({ user:req.body.email }, config.secret, {
              expiresIn: 900 // 15 mnts
            });
              host=req.get('host');
              verify_link="";
            const message = {
                  from: 'do-not-reply@xyz.com', // Sender address
                  to: req.body.email,// recipients
                  subject : "Please confirm your Email account ✔",
		               html : "<strong>Verify your email</strong><br>To continue setting up your Mrt account, we need to confirm your email address. Please click on the button below to verify your email address..<br><a href="+verify_link+">Click here to verify</a><br><br><span style='color:red;'>This link is valid for only 15 mins.</span>"
              };
              transport.sendMail(message, function(mailerr,mailinfo) {
                  if (mailerr) {
                    //console.log(mailerr)
                  } else {
                    //console.log('mail has sent.');
                    //console.log(mailinfo);
                    
                  }
              });
              //----------------------End Send Mail
            res.send({ message: "Your account has been registered successfully please verify email",status:1 });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User has been registered successfully!",status:1 });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found.",status:0 });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
	  
	  
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Your login credentials are incorrect, let's try again!",
          status:0
        });
      }
	if(user.email_status==0 && user.user_status==0)
	  {
		 return res.status(404).send({ message: "Your email is not verify. please verify email . A verification link has been already sent to your email account.",status:0 }); 
	  }

	if(user.mobile_status==0)
	  {
		 return res.status(404).send({ message: "Your mobile number is not verify . please verify mobile.",status:0 }); 
	  }
	  
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
      
       usersigndata: [
        {
          id: user._id, 
          username: user.username,
          email: user.email,
          //roles: authorities,
          email_status : user.email_status,
          mobile_number : user.mobile_number,
          mobile_status : user.mobile_status,
          user_image : user.user_image,
          user_status : user.user_status,
		  kycid :		user.kycid,
		  bankid : user.bankid,
          accessToken: token,
          createdDate:user.createdDate
         
          }
        ],
        message:"Success",
        status:1
        
       
       
      });
    });
};

exports.findAll = (req, res) => {
    User.find()
    .then(user => {
      if(!user) {
            return res.status(404).send({
                message: "User not found " ,
                status : 0
            });            
        }
        //res.send(user);
		res.status(200).send({
				data : user,
                message: "Record founded!" ,
                status : 1
            });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users.",
			status : 0
        });
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.uId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found " ,
                status : 0
            });            
        }
       res.status(200).send({
				//data : user,
				email : user.email,
				email_status : user.email_status,
				mobile_status : user.mobile_status,
				mobile : user.mobile_number,
				user_status : user.user_status,
				createdDate : user.createdDate,
				message: "Record founded!" ,
                status : 1
            }); 
		
    }).catch(err => {
           
            res.status(404).send({
            message: "User not found !",
            status : 0
            });                
       
    });
};

//------------------------------Virification Email Id

exports.emailvarification = (req, res) => {
    
    User.findById(req.params.uId)
    .then(user => { 
      if(user.verify_code != req.body.verify_code)
      {
        return res.status(404).send({
                message: "Your verify code is not found !" ,
                status : 0
            }); 
      }
      else 
      {
        User.findOneAndUpdate({verify_code : req.body.verify_code}, {
            email_status: 1,
            user_status : 1,
            mobile_status : 1
            }, {new: true,useFindAndModify: false})
          .then(user => {
              res.status(200).send({
                message: "Email & Mobile has been successfully verified !",
                status : 1
              }); 
         }).catch(err => {
            res.status(500).send({
                  message: "User verify code not found!",
                  status : 0 
              });
           
        });
      }
    }).catch(err => {
        res.status(500).send({
            message: "User not found!",
            status :0
        });
    });

};

//-------------------------------- SEND SMS
exports.sendOTPSms = (req, res) => {
require('dotenv').config();
var AWS = require('aws-sdk');
randnogenrate=Math.floor(100000 + Math.random() * 900000);
var params = {
        Message: "Your Local Bitcoin Xchange Verification Code  is : " + randnogenrate,
        PhoneNumber: '+91' + req.body.mobilenumber,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': "LBX"
            }
        }
    };
    //------------------------ Resend OTP
    User.findByIdAndUpdate(req.body.userid, {
                verify_code: randnogenrate
                }, {new: true,useFindAndModify: false})
              .then(user => {
                var publishTextPromise = new AWS.SNS({ apiVersion: '2020-03-31' }).publish(params).promise();
                  publishTextPromise.then(
                      function (data) {
                        res.status(200).send({
                        message: "A One-Time OTP has been sent  to +91 "+ req.body.mobilenumber, 
                        MessageID: data.MessageId,
                        //otp:randnogenrate,
                        status:1
                      }); 
                      //res.end(JSON.stringify({message: "OTP send successfully !" , MessageID: data.MessageId,otp:randnogenrate,status:1}));
                  }).catch(
                      function (err) {
                         res.status(200).send({
                            Error: err,
                            status:0
                         });
                          //res.end(JSON.stringify({ Error: err }));
                  });
                 
            }).catch(err => {
                res.status(500).send({
                      message: "User  not found!",
                      status : 0 
                  });
              
            });
   

};

//---------------------------------------- Mail Notification
exports.mailnotification = (req, res) => {
	
	//----------------------Start Send Mail
	host=req.get('host');
    const message = {
		  from: 'do-not-reply@localbitcoinxchange.com', // Sender address
		  to: req.body.email,// recipients
		  subject : "You have just signed in to your LBX account from new IP " + req.body.ipaddress ,
		  html : "<strong>You have successfully login to your LBX account just now.</strong><br> Device Name :"+req.body.devicename+ "<br>IP :" + req.body.ipaddress + "<br>Date&Time : " + req.body.datetime
	  };
	  transport.sendMail(message, function(mailerr,mailinfo) {
		  if (mailerr) {
			res.status(500).send({
                message: "Email  not send successfully!",
                status : 0
              }); 
		  } else {
			res.status(200).send({
                message: "Email  has been send successfully!",
                status : 1
              }); 
			
		  }
	  });
	  //----------------------End Send Mail
};

