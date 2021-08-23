const express = require('express');
const { body } = require('express-validator/check');

const Category = require('../models/category'); 
const categoryController = require('../controller/category');
const sharp = require('sharp');

 
const router = express.Router();

// const multer = require('multer');
// const upload = multer({
//   limits: {
//       fileSize: 1000000
//   },
//   fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//           return cb(new Error('File must be an Image(.jpg|.jpeg|.png)'))
//       }
//       cb(undefined, true)
//   }
// })
 
router.post(
  '/add-category',async (req, res, next) => {
    // const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    // var str1=buffer.toString('base64');
 
const categoryName=req.body.name;
const str1=req.body.image; 
try{const category = new Category({
         categoryName:categoryName,
         categoryImage:str1
     });
     category.save().then(
         result=>
        { res.status(201).json({
            message: 'Category created successfully!',
             });
            }
     )}
     catch(err) {
       if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
     }
    }
);
 

router.delete(
    '/delete-category/:id',
      categoryController.deleteCategory
  );
   
  
router.put(
    '/update-category',
      categoryController.updateCategory
  );
  router.get(
    '/get-category',
      categoryController.getCategory
  );

  module.exports = router;