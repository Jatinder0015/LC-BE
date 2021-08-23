const { request } = require('express');
const State = require('../models/state');

exports.addState=async (req,res,next)=>{

     const stateName=req.body.name;
     const statePrice=req.body.price;
     const state = new State({
         stateName:stateName,
         stateCharges:statePrice
     });
     state.save().then(
         result=>
        { res.status(201).json({
            message: 'State created successfully!',
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

exports.deleteState=async (req,res,next)=>{
try{
    const id=req.params.id;
    
    State.destroy({
        where:{
            stateID:id
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
exports.getAllState=async (req,res,next)=>{

    State.findAll().then(
        state=>{
        res.status(201).json({
            message: 'Fetched State successfully!',
            states:state
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
