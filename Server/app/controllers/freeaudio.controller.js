
const db = require("../models");
const Freeaudio = db.freeaudio;

module.exports.addfreeaudio = async (request, response, next) => {
    try {
        console.log(request.body.title);
        //const { select_type, title, image,upload_audio_record_audio,isStatus,isActive} = request.body;
        let freeaudio = new Freeaudio({
            select_type:request.body.select_type,
            title:request.body.title,
            image:request.body.image,
            upload_audio_record_audio:request.file.filename,
            isStatus:request.body.isStatus,
            isActive:1
        });

        if (!freeaudio.select_type) {
            response.status(400).send({ message: "Audio content can not be empty",status:false });
            return;
          }

        let result = await freeaudio.save();
        response.send({ message: "The file has been uploaded successfully and will be available to users",data:freeaudio,status:true });
    }
    catch (error) {
        response.status(400).send({ status: false, messages: error.message });

    } 
}
//-------------------- Get All Record For Freeaudio
module.exports.getAllList = async (request, response, next) => {
    
    try {
         var mysort = { _id: -1 };
        let freeaudio = await Freeaudio.find().sort(mysort);
        response.json(freeaudio);
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}
//-------------------- Get One Record In Freeaudio
module.exports.getOneRecord = async (request, response, next) => {
    try {
        let freeaudio = await Freeaudio.findOne({ _id: request.params.id });
        response.json(freeaudio);
        //response.status(200).send({freeaudio });
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}

//------------------ Update Freeaudio
module.exports.updateAudio = async (request, response, next) => {
    try {
        checkAudio = await Freeaudio.findOne({ _id: request.params.id })
        if (!checkAudio)
        response.send({ status: false, message: "Id does not exist !" });
        let updatedaudio = {
            select_type:request.body.select_type,
            title:request.body.title,
            image:request.body.image,
            upload_audio_record_audio:request.file.filename,
            isStatus:request.body.isStatus,
            isActive:request.body.isActive,
            isActive:1          
        }
        let result = await Freeaudio.updateOne({ _id: request.params.id }, updatedaudio);
        response.send({ message: 'The file has been updated successfully and will be available to users', status:true });

    } catch (error) {
        response.status(400).send({ success: false, message:'Sorry the connection has lost, please try again after checking your internet connection' });
    }
}

//------------ Delete Latest
module.exports.delete = (req, res) => {
    Freeaudio.findByIdAndRemove(req.params.id)
    .then(latestupdate => {
        if(!latestupdate) {
            return res.status(404).send({
                message: "Freeaudio not found with id " + req.params.id
            });
        }
        res.send({message: "Freeaudio deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Freeaudio not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete latestupdate with id " + req.params.id
        });
    });
}; 

