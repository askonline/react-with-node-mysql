const sql = require("../config/db");

const Category = function(category) {
  name = category.name;
  parent_id = category.parent_id;
  status = category.status;
  
};
module.exports = Category;


