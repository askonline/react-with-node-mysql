const modelcontroller = require("../controllers/model.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
 

  app.get('/api/v1/model/list', modelcontroller.findAll);
   app.get('/api/v1/model/list/:mId', modelcontroller.findOne);
  app.get('/api/v1/model/delete/:catId', modelcontroller.delete);
  
  
};



