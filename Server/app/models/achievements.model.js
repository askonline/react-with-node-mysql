const achievementsmongoose = require("mongoose");
const AchievementsSchema = achievementsmongoose.model(
  "Mrt_Achievements",
  new achievementsmongoose.Schema({
    achievent_title:{type:String},
    achievent_desc:{type:String},
    achievent_year:{type:String},
    achievent_image:{type:String},
    isActive: {type:String},
    createdDate: { type: Date, default: Date.now }
  })
);
module.exports = AchievementsSchema;


