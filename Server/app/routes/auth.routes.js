const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/v1/auth/signin", controller.signin);

  app.put('/api/v1/akon/getusers/:uId', controller.findOne);
  
  app.put("/api/v1/akon/getallusers", controller.findAll);
  
  app.put("/api/v1/validate/email/:uId", controller.emailvarification);

  app.post('/api/v1/sendsms',controller.sendOTPSms);
  
   app.post('/api/v1/mailnotification',controller.mailnotification);

};
