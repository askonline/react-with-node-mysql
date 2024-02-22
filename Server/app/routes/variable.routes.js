const variablecontroller = require("../controllers/variable.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/v1/variable/add",variablecontroller.addvariable);
  app.get('/api/v1/variable/list', variablecontroller.variableList);
  app.get('/api/v1/variable/delete/:vId', variablecontroller.delete);
  app.get('/api/v1/variable/list/:vId', variablecontroller.findOne);
  app.post('/api/v1/variable/update/:vId', variablecontroller.updateVariable);

  
  
};



