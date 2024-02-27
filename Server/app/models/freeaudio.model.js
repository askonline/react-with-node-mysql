const audiomongoose = require("mongoose");
const AudioSchema = audiomongoose.model(
  "Mrt_Freeaudio",
  new audiomongoose.Schema({
    select_type: {type: String},
    title:{type:String},
    image:{type:String},
    upload_audio_record_audio:{type:String},
    isStatus: {type:String},
    isActive: {type:Number},
    createdDate: { type: Date, default: Date.now }
  })
);
module.exports = AudioSchema;


