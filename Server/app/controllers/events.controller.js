const db = require("../models");
const Events = db.events;
const sql = require("../config/db");


module.exports.addEvents = async (request, response, next) => {
    try {
        
      
        //console.log("==--",request.body)

        sql.query("INSERT INTO event_usa SET ?", request.body, (err, res) => {
            if (err) {
               response.send({ message: "Event not added!!",status:false });
              return;
            }
            response.send({ message: "Event has been  added successfully!!",status:true });
        });
      
        
    }
    catch (error) {
        response.status(400).send({ status: false, message: error.message });

    }
}

module.exports.updateEvents = async (request, response, next) => {
    try {
        
        //console.log("==--",request.body)

        sql.query(`select *  from event_usa where id=${request.params.eId}`, (err, res) => {
            if (err) {
               response.send({ err,status:false });
              return;
            }
            if(res!='')
            {
                if (!request.body.name) {
                 response.status(400).send({ message: "Event name content can not be empty",status:false });
                    return;
                  }
                sql.query(`UPDATE event_usa SET ? where id=${request.params.eId}`, request.body, (err, res) => {
                    if (err) {
                       response.send({ err,status:false });
                      return;
                    }
                   
                    response.send({ message: "Event has been  update successfully!!",status:true });
                });
            }
            else
            {
                response.send({ message: "Event not found!!",status:false });
            }
            
        });
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}

//----------------- Get All Variable List
module.exports.eventsList = async (request, response, next) => {
    
    try {
       sql.query(`SELECT * FROM event_usa ORDER BY id DESC`, (err, res) => {
            if (err) {
               response.send({ err,status:false });
              return;
            }
            response.json(res);
        });
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}

//-------------------- Get One Record For Category
module.exports.findOne = async (request, response, next) => {
    
    try {
           sql.query(`select *  from event_usa where id=${request.params.eId}`, (err, res) => {
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
         sql.query(`delete from event_usa where id=${request.params.eId}`, (err, res) => {
            if (err) {
               response.send({ err,status:false });
              return;
            } 
            response.send({ message: "Events has been  deleted successfully!!",status:true });
        });
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}










