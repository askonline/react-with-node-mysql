const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const nodemailer = require('nodemailer');
const db = require("../models");
const UserVarification = db.user;
let transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "santosh.askonline@gmail.com",
        pass: ""
    }
});

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/validate/all", controller.allAccess);

  app.get("/api/v1/validate/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/v1/validate/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/v1/validate/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get('/api/send_plain_mail', function(req, res) {
    randnogenrate=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    verify_link="http://"+req.get('host')+"/verify?id="+randnogenrate;
		const message = {
	    from: 'santosh.askonline@gmail.com', // Sender address
	    to: 'heraldinfo16@gmail.com',         // recipients
	    subject: 'Please Verify Your Email Address ', // Subject line
	    html : "<strong>Verify your email</strong><br>To continue setting up your Akonic account, we need to confirm your email address. Please click on the button below to verify your email address..<br><a href="+verify_link+">Click here to verify</a>"
	};
	transport.sendMail(message, function(err, info) {
	    if (err) {
	      console.log(err)
	    } else {
	      console.log('mail has sent.');
	      console.log(info);
	    }
	});
});

//------------------------- Virification Email Id

};


