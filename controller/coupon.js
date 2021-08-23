const { request } = require('express');
const Category = require('../models/coupon');

// exports.addCategory=async (req,res,next)=>{

//      const categoryName=req.body.name;
//      const category = new Category({
//          categoryName:categoryName
//      });
//      category.save().then(
//          result=>
//         { res.status(201).json({
//             message: 'Category created successfully!',
//              });
//             }
//      )
          
      
//       .catch(err => {
//     if (!err.statusCode){
//       err.statusCode = 500;
//     }
//     next(err);
// }
//   )
// }

exports.deleteCoupon=async (req,res,next)=>{
try{
    const id=req.params.id;
   
    Category.destroy({
        where:{
            couponId:id
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

exports.getCoupon=async (req,res,next)=>{

    Category.findAll().then(
        categories=>{
        res.status(201).json({
            message: 'Fetched Coupons successfully!',
            categories:categories
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
