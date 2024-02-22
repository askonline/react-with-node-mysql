
const db = require("../models");
const Profile = db.profile;

module.exports.addprofile = async (request, response, next) => {
    try {
       
        let profile = new Profile({
            title:request.body.title,
            main_image:request.file.filename,
            main_video:request.body.main_video,
            short_desc:request.body.short_desc,
           
         });

        if (!profile.title) {
            response.status(400).send({ message: "Profile content can not be empty",status:false });
            return;
          }

        let result = await profile.save();
        response.send({ message: "Profile has been  added successfully!!",data:profile,status:true });
    }
    catch (error) {
        response.status(400).send({ status: false, message: error.message });

    }
}
//-------------------- Get All Record For Profile
module.exports.getAllList = async (request, response, next) => {
    
    try {
        let profile = await Profile.find();
        response.json(profile);
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}
//-------------------- Get One Record In Profile
module.exports.getOneRecord = async (request, response, next) => {
    try {
        let profile = await Profile.findOne({ _id: request.params.id });
        response.json(profile);
        //response.status(200).send({profile });
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}

//------------------ Update Profile
module.exports.updateProfile = async (request, response, next) => {
    try {
        checkProfile = await Profile.findOne({ _id: request.params.id })
        if (!checkProfile)
        response.send({ status: false, message: "Id does not exist !" });
        let updatedprofile = {
            title:request.body.title,
            main_image:request.file.filename,
            //main_image:request.body.main_image,
            main_video:request.body.main_video,
            short_desc:request.body.short_desc,
            
        }
        let result = await Profile.updateOne({ _id: request.params.id }, updatedprofile);
        response.send({ message: 'Profile has been  update successfully!!', status:true });

    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}

//------------ Delete Profile

