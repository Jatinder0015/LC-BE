//const CategoryB = require('../models/categoryB');
const CategoryA=require('../models/categoryA');

exports.createCategory = async (req, res, next) => {
  const name = req.body.name;
  let category1;
  let category=new CategoryA({
    categoryName:name
  });
  await CategoryA.findAll().then(
    categorya=>
    //user1=user,
   { for(let u of categorya)
    {
      if(u.categoryName==name){
        category1=true;
        res.status(201).json({
          message: "CategoryA Checked",
          result:u
    });     
      }
    }
    if(!category1)
   return category.save().then(result => {
    res.status(201).json({
      message: "CategoryA Added", result: result
});
  }
  )
 
   
    
  }
    )
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

