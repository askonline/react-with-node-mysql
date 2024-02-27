//const db = require("../models");
//const Model = db.model;
const sql = require("../config/db");



//-------------------- Get All Record 
module.exports.findAll = async (request, response, next) => {
    
    try {
        
        let category = sql.query('select * from product_usa order by id DESC', (err, res) => {
                if (err) throw err;
                response.json(res);
            });
        
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}

//-------------------- Get One Record For Category
module.exports.findOne = async (request, response, next) => {
    
    try {
           sql.query(`select *  from product_usa where id=${request.params.mId}`, (err, res) => {
            if (err) {
               response.send({ err,status:false });
              return;
            }
            response.json(res[0]);


        });
        
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}
//-------------------- Delete One Record For Category
module.exports.delete = async (request, response, next) => {
    
    try {
         sql.query(`delete from product_usa where id=${request.params.mId}`, (err, res) => {
            if (err) {
               response.send({ err,status:false });
              return;
            } 
            response.send({ message: "Model has been  deleted successfully!!",status:true });
        });
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}

 
