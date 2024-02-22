const profilemongoose = require("mongoose");
const ProfileSchema = profilemongoose.model(
  "Mrt_Profile",
  new profilemongoose.Schema({
    title:{type:String},
    main_image: {type: String},
    main_video:{type:String},
    short_desc:{type:String},
    isActive: {type:String},
    createdDate: { type: Date, default: Date.now }
  })
);
module.exports = ProfileSchema;


