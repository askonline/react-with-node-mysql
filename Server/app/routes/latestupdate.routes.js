const latestupdatecontroller = require("../controllers/latestupdate.controller");
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

  app.post('/api/v1/latest/add', multermiddleware.single('lp_image'),latestupdatecontroller.addlatest);
  app.put('/api/v1/latest/update/:id', multermiddleware.single('lp_image'),latestupdatecontroller.updateLatest);
  app.get("/api/v1/latest/list",latestupdatecontroller.getAllList);
  app.get("/api/v1/latest/list/:id",latestupdatecontroller.getOneRecord);
  app.get("/api/v1/latest/delete/:id",latestupdatecontroller.delete);
 
};





