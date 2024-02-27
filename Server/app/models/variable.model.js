const sql = require("../config/db");

const Variable = function(variable) {
  variable_name = variable.variable_name;
  description = variable.description;
  status = variable.status;
  
};
module.exports = Variable;


