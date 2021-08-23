const { request } = require('express');
const Color = require('../models/color');

exports.addColor=async (req,res,next)=>{

     const colorName=req.body.name;
     const color = new Color({
         colorName:colorName
     });
     color.save().then(
         result=>
        { res.status(201).json({
            message: 'Color created successfully!',
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

exports.deleteColor=async (req,res,next)=>{
try{
    const id=req.params.id;
    
    Color.destroy({
        where:{
            colorID:id
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
exports.getAllColor=async (req,res,next)=>{

    Color.findAll().then(
        colors=>{
        res.status(201).json({
            message: 'Fetched colors successfully!',
            colors:colors
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
