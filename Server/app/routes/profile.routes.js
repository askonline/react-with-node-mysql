const profilecontroller = require("../controllers/profile.controller");
const multermiddleware = require("../multer/profile");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
      "multipart/form-data"
    );
    next();
  });

  app.post('/api/v1/profile/add', multermiddleware.single('main_image'),profilecontroller.addprofile);
  app.put('/api/v1/profile/update/:id', multermiddleware.single('main_image'),profilecontroller.updateProfile);
  app.get("/api/v1/profile/list",profilecontroller.getAllList);
  app.get("/api/v1/profile/list/:id",profilecontroller.getOneRecord);

 
};





