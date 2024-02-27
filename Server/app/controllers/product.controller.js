const db = require("../models");
const Products = db.products;
const sql = require("../config/db");


module.exports.addProduct = async (request, response, next) => {
    try {
       
       //console.log(request.body)

        sql.query("INSERT INTO category_usa SET ?", request.body, (err, res) => {
            if (err) {
                console.log(err)
               response.send({err:err,  message: "Product not added!!",status:false });
              return;
            }
            response.send({message: "Product has been  added successfully!!",status:true });
        });
      
        
    } 
    catch (error) {
        response.status(400).send({ status: false, message: error.message });

    }
}

/*
module.exports.updateProduct = async (request, response, next) => {
    try {
        //checkCategory = await Category.findOne({ _id: request.params.id })

        sql.query(`select id,parent_id,name,status  from category_usa where id=${request.params.catId}`, (err, res) => {
            if (err) {
               response.send({ err,status:false });
              return;
            }
            if(res!='')
            {
                if (!request.body.name) {
                 response.status(400).send({ message: "Product name content can not be empty",status:false });
                    return;
                  }
                sql.query(`UPDATE category_usa SET ? where id=${request.params.catId}`, request.body, (err, res) => {
                    if (err) {
                       response.send({ err,status:false });
                      return;
                    }
                    response.send({ message: "Product has been  update successfully!!",status:true });
                });
            }
            else
            {
                response.send({ message: "Product not found!!",status:false });
            }
            
        });
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}*/
//-------------------- Get All Record For Category
module.exports.findAll = async (request, response, next) => {
    
    try {
        //console.log(Category)
        let products = sql.query("SELECT * FROM `category_usa` WHERE `tree_level` >= '1' AND `parent_id` != '0' AND `parent_id` != '1' AND `parent_id` != '4' AND `parent_id` != '7' AND `parent_cat_id` != '' ORDER BY `cat_order` ASC", (err, res) => {
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
           sql.query(`select *  from category_usa where id=${request.params.pId}`, (err, res) => {
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
         sql.query(`delete from category_usa where id=${request.params.catId}`, (err, res) => {
            if (err) {
               response.send({ err,status:false });
              return;
            } 
            response.send({ message: "Category has been  deleted successfully!!",status:true });
        });
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}


//----------------- Find Sub Category List
module.exports.findProductBySubcategoryList = async (request, response, next) => {
    
    try {
       sql.query(`SELECT id as value ,name as label FROM category_usa WHERE parent_id =  ${request.params.sId}  AND status = '1' ORDER BY id ASC`, (err, res) => {
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








