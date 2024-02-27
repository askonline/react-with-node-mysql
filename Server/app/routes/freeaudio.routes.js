const audiocontroller = require("../controllers/freeaudio.controller");
//const multermiddleware = require("../middlewares");
const multermiddleware = require("../multer/freeaudio");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
      "multipart/form-data"
    );
    next();
  });

  app.post('/api/v1/audio/add',multermiddleware.single('upload_audio_record_audio'),audiocontroller.addfreeaudio);
  app.put('/api/v1/audio/update/:id',multermiddleware.single('upload_audio_record_audio'), audiocontroller.updateAudio);
  app.get("/api/v1/audio/list",audiocontroller.getAllList);
  app.get("/api/v1/audio/list/:id",audiocontroller.getOneRecord);
  app.get("/api/v1/audio/delete/:id",audiocontroller.delete);

 
};





