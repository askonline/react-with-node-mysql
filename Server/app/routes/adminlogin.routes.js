const { adminverifySignUp } = require("../middlewares");
const admincontroller = require("../controllers/adminlogin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/auth/adminsignup",
    [
      adminverifySignUp.checkAdminDuplicateUsernameOrEmail,
      adminverifySignUp.checkAdminRolesExisted
    ],
    admincontroller.adminsignup
  );

  app.post("/api/v1/auth/adminsignin", admincontroller.adminsignin);


};
