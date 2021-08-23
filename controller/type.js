const { request } = require('express');
const Type = require('../models/type');

exports.addType=async (req,res,next)=>{

     const typeName=req.body.name;
     const type = new Type({
         typeName:typeName
     });
     type.save().then(
         result=>
        { res.status(201).json({
            message: 'Type created successfully!',
             });
            }
     )
          
      
      .catch(err => {
    if (!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
}
  )
}

exports.deleteType=async (req,res,next)=>{
try{
    const id=req.params.id;
    
    Type.destroy({
        where:{
            typeID:id
        }
    }).then(
        result=>
       { res.status(201).json({
           message: 'Deleted successfully!',
            });
           }
    )
         
     
        }catch(err) {
   if (!err.statusCode){
     err.statusCode = 500;
   }
   next(err);
}
 
}
exports.getAllType=async (req,res,next)=>{

    Type.findAll().then(
        types=>{
        res.status(201).json({
            message: 'Fetched colors successfully!',
            types:types
             });
         
    })    
    
        
    
     .catch(err => {
   if (!err.statusCode){
     err.statusCode = 500;
   }
   next(err);
}
 )
}
