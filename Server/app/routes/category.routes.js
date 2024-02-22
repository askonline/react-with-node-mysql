const categorycontroller = require("../controllers/category.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
 
  app.post("/api/v1/category/add",categorycontroller.addcategory);
  app.get('/api/v1/category/list', categorycontroller.findAll);
  app.get('/api/v1/category/list/:catId', categorycontroller.findOne);
  app.get('/api/v1/category/delete/:catId', categorycontroller.delete);
  app.post('/api/v1/category/update/:catId', categorycontroller.updateCategory);
  app.get('/api/v1/subcategory/list', categorycontroller.findSubCategoryList);
  app.get('/api/v1/subcategorybycategory/:catId', categorycontroller.findSubCategoryByCategoryid);
};



