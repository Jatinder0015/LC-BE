const express = require('express');
const { body } = require('express-validator/check');
const sharp = require('sharp');
const productController = require('../controller/product');
const isAuth = require('../middleware/is-auth');
var fs = require('fs');
const router = express.Router();
const streamToBlob = require('stream-to-blob')
 
router.get('/all-products', productController.getProducts);
router.get('/all-admin-products', productController.getAdminProducts);

// POST /feed/post
// const multer = require('multer');
// const upload = multer({
//   limits: {
//       fileSize: 100000000
//   },
//   fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//           return cb(new Error('File must be an Image(.jpg|.jpeg|.png)'))
//       }
//       cb(undefined, true)
//   }
// })

const Product = require('../models/product');

const Image = require('../models/images');
const { STRING, json } = require('sequelize');
router.post('/add-product', async (req, res, next) => {
  try{
    
    // const buffer = await sharp(req.file.buffer).png().toBuffer();
    // var str1=buffer.toString('base64');
   
    const type = req.body.type;
    const originalPrice = req.body.price;
    const discountPersent = req.body.discountPer;
    const quantity = req.body.quantity;
    const category = req.body.category;
    const description = req.body.sortDesc;
    const discountedPrice =req.body.price - (req.body.price * req.body.discountPer)/100
    const name = req.body.name;
    const color = req.body.color;
    const str1=req.body.image;
    const myArr = str1.split("@@@@");
     let creator;
    const product = new Product({
      productName: name,
      productType: type,
      productDescription:description,
      productQuantity:quantity,
      productOriginalPrice: originalPrice,
      productDiscountPersent: discountPersent,
      productCategory:category,
      productColor:color,
      productDiscountedPrice:discountedPrice
    });
        product.save()
    .then(
      product=> {
       for(let u of myArr){
        product.createImage(
        {
            imageUrl: u
            
        }
    )}
        res.status(201).json({
          message: 'Product created successfully!',
           })}
                  )
  }
  catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  
})

router.post('/update-product-json' , async (req, res, next) => {
  try{
    
    // const str1=req.body.image;
    const name = req.body.name;
    const type = req.body.type;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const category = req.body.category;
    const description = req.body.description;
    const pid=req.body.pid;
console.log(price+""+ req.body.discountPer)
    const originalPrice = req.body.price;
    const discountPersent = req.body.discountPer;
    const discountedPrice =req.body.price - (req.body.price * req.body.discountPer)/100
    console.log("yha aaya")
    console.log(discountedPrice);
    const color = req.body.color;
    console.log("yha gya")
    Product.findByPk(pid).then(product=>{
     
      product.productName= name,
      product.productType= type,
      product.productDescription = description,
      product.productQuantity=quantity,
      product.productOriginalPrice=price,
      product.productDiscountPersent= discountPersent,
      product.productCategory=category,
      product.productColor=color,
      product.productDiscountedPrice=discountedPrice,
      product.save().then(
        res.status(201).json({
          message: 'Product updated successfully!',
           })
                  )
 
    }
    )
     
   }
  catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    console.log(err); 
    next(err);
  }
  
})

router.post('/update-product',  async (req, res, next) => {
  try{
    
    // const buffer = await sharp(req.file.buffer).png().toBuffer();
    // var str1=buffer.toString('base64');
  
    const name = req.body.name;
    const type = req.body.type;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const category = req.body.category;
    const description = req.body.description;
    const pid=req.body.pid;
 
    const originalPrice = req.body.price;
    const discountPersent = req.body.discountPer;
    const discountedPrice =req.body.price - (req.body.price * req.body.discountPer)/100
    const color = req.body.color;
    const str1=req.body.image;
    const myArr = str1.split("@@@@");
    let tempProduct;
    Product.findByPk(pid).then(product=>{
      product.productName= name,
      product.productType= type,
      product.productDescription = description,
      product.productQuantity=quantity,
      product.productCategory=category,
      product.productOriginalPrice= originalPrice,
      product.productDiscountPersent= discountPersent,
      product.productColor=color,
      product.productDiscountedPrice=discountedPrice,

      product.save().then(product=>{
      tempProduct=product;
        let image;
        Image.findAll({where:{productId:product.id}}).then(images=>{
          for(let i of images){
            i.destroy();
          }
          for(let u of myArr){
            tempProduct.createImage(
            {
                imageUrl: u
                
            }
        )}
          
        })
        res.status(201).json({
          message: 'Product updated successfully!',
           })}
                  )
 
    }
    )
     
   }
  catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  
})
router.get('/one-product/:productId',productController.getProductById);
router.get('/productByCategory/:category',productController.getProductByCategory);

router.delete('/delete-product/:productId',productController.deleteProduct);

module.exports = router;
