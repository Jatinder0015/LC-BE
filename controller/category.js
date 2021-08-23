const { request } = require('express');
const Category = require('../models/category');

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

exports.deleteCategory=async (req,res,next)=>{
try{
    const id=req.params.id;
   
    Category.destroy({
        where:{
            categoryId:id
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

exports.updateCategory=async (req,res,next)=>{

  

    const id=req.body.id;
    const name=req.body.name;


    Category.findByPk(id).then(
        category=>{
      category.categoryName=name      
    category.save().then(result=>{
        res.status(201).json({
            message: 'Updated successfully!',
             });
         
    })    
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
exports.getCategory=async (req,res,next)=>{

    Category.findAll().then(
        categories=>{
        res.status(201).json({
            message: 'Fetched Categories successfully!',
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
