const express = require('express');
const { body } = require('express-validator/check');

const Coupon = require('../models/coupon'); 
const couponController = require('../controller/coupon');
const sharp = require('sharp');

 
const router = express.Router();

// const multer = require('multer');
// const upload = multer({
//   limits: {
//       fileSize: 10000000
//   },
//   fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//           return cb(new Error('File must be an Image(.jpg|.jpeg|.png)'))
//       }
//       cb(undefined, true)
//   }
// })
 
router.post(
  '/add-coupon', async (req, res, next) => {
    // const buffer = await sharp(req.file.buffer).png().toBuffer();
    // var str1=buffer.toString('base64');
 
const categoryName=req.body.name;
const desc=req.body.desc;
const str1=req.body.image;
     try{const coupon = new Coupon({
         categoryName:categoryName,
         couponImage:str1,
         couponDesc:desc
     });
     coupon.save().then(
         result=>
        { res.status(201).json({
            message: 'Coupon created successfully!',
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
    '/delete-coupon/:id',
    couponController.deleteCoupon
  );
   
  
// router.put(
//     '/update-category',
//       categoryController.updateCategory
//   );
  router.get(
    '/get-coupon',
    couponController.getCoupon
  );

  module.exports = router;
