
const db = require("../models");
const Achievements = db.achievements;

module.exports.addAchievements = async (request, response, next) => {
    try {
        
        let achievements = new Achievements({
            achievent_title:request.body.achievent_title,
            achievent_desc:request.body.achievent_desc,
            achievent_year:request.body.achievent_year,
            achievent_image:request.file.filename,
            isActive:1,
         });

        if (!achievements.achievent_title) {
            response.status(400).send({ message: "Achievements content can not be empty",status:false });
            return;
          }

        let result = await achievements.save();
        response.send({ message: "Achievements has been  added successfully!!",data:achievements,status:true });
    }
    catch (error) {
        response.status(400).send({ status: false, message: error.message });

    }
}
//-------------------- Get All Record For Achievements
module.exports.getAllList = async (request, response, next) => {
    
    try {
        var mysort = { _id: -1 };
        let achievements = await Achievements.find().sort(mysort);
        response.json(achievements);
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}
//-------------------- Get One Record In Achievements
module.exports.getOneRecord = async (request, response, next) => {
    try {
        let achievements = await Achievements.findOne({ _id: request.params.id });
        response.json(achievements);
        //response.status(200).send({achievements });
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}

//------------------ Update Achievements
module.exports.updateAchievent = async (request, response, next) => {
    try {
        checkachievements = await Achievements.findOne({ _id: request.params.id })
        if (!checkachievements)
        response.send({ status: false, message: "Id does not exist !" });
        let updatedprofile = {
           
            achievent_title:request.body.achievent_title,
            achievent_desc:request.body.achievent_desc,
            achievent_year:request.body.achievent_year,
            achievent_image:request.file.filename,
        }
        let result = await Achievements.updateOne({ _id: request.params.id }, updatedprofile);
        response.send({ message: 'Achievements has been  update successfully!!', status:true });

    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}

//------------ Delete Achievements
module.exports.delete = (req, res) => {
    //console.log(req.params.id)
    Achievements.findByIdAndRemove(req.params.id)
    .then(achievements => {
        if(!achievements) {
            return res.status(404).send({
                message: "Achievements not found with id " + req.params.id
            });
        }
        res.send({message: "Achievements deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "achievements not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete achievements with id " + req.params.id
        });
    });
};
