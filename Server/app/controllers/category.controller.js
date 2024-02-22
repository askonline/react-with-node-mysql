const db = require("../models");
const Category = db.category;
const sql = require("../config/db");


module.exports.addcategory = async (request, response, next) => {
    try {
       
        if (!request.body.name) {
            response.status(400).send({ message: "Category name content can not be empty",status:false });
            return;
          }
        sql.query("INSERT INTO category_usa SET ?", request.body, (err, res) => {
            if (err) {
               response.send({ message: "Category not added!!",status:false });
              return;
            }
            response.send({ message: "Category has been  added successfully!!",status:true });
        });
      
        
    }
    catch (error) {
        response.status(400).send({ status: false, message: error.message });

    }
}

module.exports.updateCategory = async (request, response, next) => {
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
                 response.status(400).send({ message: "Category name content can not be empty",status:false });
                    return;
                  }
                sql.query(`UPDATE category_usa SET ? where id=${request.params.catId}`, request.body, (err, res) => {
                    if (err) {
                       response.send({ err,status:false });
                      return;
                    }
                    response.send({ message: "Category has been  update successfully!!",status:true });
                });
            }
            else
            {
                response.send({ message: "Category not found!!",status:false });
            }
            
        });
    } catch (error) {
        response.status(400).send({ success: false, message: error.message });
    }
}
//-------------------- Get All Record For Category
module.exports.findAll = async (request, response, next) => {
    
    try {
        //console.log(Category)
        let category = sql.query('select id,parent_id,name,status from category_usa where parent_id=0 order by id DESC', (err, res) => {
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
           sql.query(`select *  from category_usa where id=${request.params.catId}`, (err, res) => {
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
module.exports.findSubCategoryList = async (request, response, next) => {
    
    try {
       sql.query(`select id,parent_id,name,status from category_usa where parent_id!=0 order by id DESC`, (err, res) => {
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

//----------------- Find Sub Category List By Category Id
module.exports.findSubCategoryByCategoryid = async (request, response, next) => {
    let categoryId=request.params.catId;
    try {
       sql.query(`select id,parent_id,name,status from category_usa where parent_id!=0 AND parent_id=${categoryId} order by id DESC`, (err, res) => {
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






