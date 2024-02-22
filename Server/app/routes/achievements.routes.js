const achievementscontroller = require("../controllers/achievements.controller");
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

  app.post('/api/v1/achieve/add', multermiddleware.single('achievent_image'),achievementscontroller.addAchievements);
  app.put('/api/v1/achieve/update/:id', multermiddleware.single('achievent_image'),achievementscontroller.updateAchievent);
  app.get("/api/v1/achieve/list",achievementscontroller.getAllList);
  app.get("/api/v1/achieve/list/:id",achievementscontroller.getOneRecord);
  app.get("/api/v1/achieve/delete/:id",achievementscontroller.delete);
 
};





