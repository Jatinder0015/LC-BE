const CategoryB = require('../models/categoryB');
const CategoryA=require('../models/categoryA');
exports.deleteCategory=async (req,res,next)=>{
  try{
      const id=req.params.id;
     
      CategoryB.destroy({
          where:{
              categoryBId:id
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
  exports.getAllCategory = (req, res, next) => {
  const cid=req.params.cid;
  CategoryB.findAll({where:{
    categoryACategoryAId:cid
  }})
    .then(categories => {
      res.status(200).json({
        message: 'Fetched products successfully.',
        categories:categories ,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createCategory = async (req, res, next) => {
  const name = req.body.name;
  const cid=req.params.cid;
  let category1;
  //user1=user,
  const cat=new CategoryB({
      categoryName:name,
      categoryACategoryAId:cid
  })
  CategoryB.findAll().then(c=>{
    for(let u of c)
    {
      if(u.categoryName==name&&u.categoryACategoryAId==cid){
        category1=true;
        res.status(201).json({
          message: "CategoryA Checked"
    });     
      }

    }
if(!category1)
    return cat.save()
    .then(result => {
      res.status(201).json({
        message: "CategoryB Added"
 });
    })
  
  }
  )
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

