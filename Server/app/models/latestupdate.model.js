const latestupdatemongoose = require("mongoose");
const LatestupdateSchema = latestupdatemongoose.model(
  "Mrt_latestupdate",
  new latestupdatemongoose.Schema({
    lp_title:{type:String},
    lp_smalldesc:{type:String},
    lp_date:{type:Date,deault:Date.now },
    lp_location:{type:String},
    lp_image:{type:String},
    isActive: {type:String},
    createdDate: { type: Date, default: Date.now }
  })
);
module.exports = LatestupdateSchema;


