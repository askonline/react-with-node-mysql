const sql = require("../config/db");

const Events = function(events) {
  name = events.name;
  description = events.description;
  image = events.image;
  from_date = events.from_date;
  to_date = events.to_date;
  status = events.status;
  
};
module.exports = Events;


