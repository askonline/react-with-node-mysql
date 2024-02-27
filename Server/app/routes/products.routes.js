const productcontroller = require("../controllers/product.controller");
const multermiddleware = require("../multer/imageupload");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
      "multipart/form-data"
    );
    next();
  });
 
  app.post('/api/v1/product/add',multermiddleware.any(),productcontroller.addProduct);
  app.get('/api/v1/product/list', productcontroller.findAll);
  app.get('/api/v1/product/delete/:catId', productcontroller.delete);
  app.get('/api/v1/product/list/:pId', productcontroller.findOne);
  app.get('/api/v1/productbysubcategory/:sId', productcontroller.findProductBySubcategoryList);
  
    
};



