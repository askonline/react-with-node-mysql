const productcontroller = require("../controllers/product.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
 

  app.get('/api/v1/product/list', productcontroller.findAll);
  app.get('/api/v1/product/delete/:catId', productcontroller.delete);
    app.get('/api/v1/product/list/:pId', productcontroller.findOne);
  app.get('/api/v1/productbysubcategory/:sId', productcontroller.findProductBySubcategoryList);
  
  
};



