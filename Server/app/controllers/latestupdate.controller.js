
const db = require("../models");
const Latestupdate = db.latestupdate;

module.exports.addlatest = async (request, response, next) => {
    try {
        
        let latestupdate = new Latestupdate({
            lp_title:request.body.lp_title,
            lp_smalldesc:request.body.lp_smalldesc,
            lp_date:request.body.lp_date,
            lp_location:request.body.lp_location,
            lp_image:request.file.filename,
            isActive:1,
         });

        if (!latestupdate.lp_title) {
            response.status(400).send({ message: "Latestupdate content can not be empty",status:false });
            return;
          }

        let result = await latestupdate.save();
        response.send({ message: "Profile has been  added successfully!!",data:latestupdate,status:true });
    }
    catch (error) {
        response.status(400).send({ status: false, message: error.message });

    }
}
//-------------------- Get All Record For Profile 
module.exports.getAllList = async (request, response, next) => {
    
    try {
        var mysort = { _id: -1 };
        let latestupdate = await Latestupdate.find().sort(mysort);
        response.json(latestupdate);
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}
//-------------------- Get One Record In Profile
module.exports.getOneRecord = async (request, response, next) => {
    try {
        let latestupdate = await Latestupdate.findOne({ _id: request.params.id });
        response.json(latestupdate);
        //response.status(200).send({latestupdate });
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}

//------------------ Update Profile
module.exports.updateLatest = async (request, response, next) => {
    try {
        checklatestupdate = await Latestupdate.findOne({ _id: request.params.id })
        if (!checklatestupdate)
        response.send({ status: false, message: "Id does not exist !" });
        let updatedlatestupdate = {
            lp_title:request.body.lp_title,
            lp_smalldesc:request.body.lp_smalldesc,
            lp_date:request.body.lp_date,
            lp_location:request.body.lp_location,
            lp_image:request.file.filename,
            
        }
        let result = await Latestupdate.updateOne({ _id: request.params.id }, updatedlatestupdate);
        response.send({ message: 'Latest update has been  update successfully!!', status:true });

    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}

//------------ Delete Latest
module.exports.delete = (req, res) => {
    Latestupdate.findByIdAndRemove(req.params.id)
    .then(latestupdate => {
        if(!latestupdate) {
            return res.status(404).send({
                message: "Latestupdate not found with id " + req.params.id
            });
        }
        res.send({message: "Latestupdate deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Latestupdate not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete latestupdate with id " + req.params.id
        });
    });
};


