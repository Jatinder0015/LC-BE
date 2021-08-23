// const fs = require('fs');
// const path = require('path');
// //const { validationResult } = require('express-validator/check');
const Sequelize = require('sequelize');
const fs = require("fs");
const Op = Sequelize.Op
const Product = require('../models/product');
const Image = require('../models/images');
exports.getProducts = (req, res, next) => {
  Product.findAll({where:{
    productQuantity:{[Op.gte]: 1}
  },include: [{
    model: Image
  }]
})
    .then(products => {
      res.status(200).json({
        message: 'Fetched products successfully.',
        products: products,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAdminProducts = (req, res, next) => {
  Product.findAll({include: [{
    model: Image
  }]})
    .then(products => {
      res.status(200).json({
        message: 'Fetched products successfully.',
        products: products,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createProduct =  (req, res, next) => 

{
  // if (!req.file) {
  //   const error = new Error('No image provided.');
  //   error.statusCode = 422;
  //   throw error;
  // }
  //const imageUrl = req.file.path;
  //upload.single('image');
  //const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    
  const name = req.body.name;
  const type = req.body.type;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const category = req.body.category;
  //const image=buffer.toString();
  //
  // var storeString="hgvbn";
  // var buffer=Buffer.from(storeString)
   let creator;
  const product = new Product({
    productName: name,
    productType: type,
    productQuantity:quantity,
    productPrice: price,
    productCategory:category,
    productImage:"fwdw"
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully!',
         });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};



exports.getProductByCategory = (req, res, next) => {
  const category = req.params.category;
  
  
  // let products;
  Product.findAll({where:{productCategory:category},include: [{
    model: Image
  }]})
    .then(products => {


      if (products.length===0) {
        const err = new Error('Could not find product of this category');
        err.statusCode = 401;
        throw err;
      }
 
      res.status(200).json({ message: 'Product fetched.', products: products });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
    );
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findAll({where:{
    id:productId
  },include: [{
    model: Image
  }]
})
    .then(product => {

      if (!product) {
        const error = new Error('Could not find product.');
        error.statusCode = 404;
        throw error;
      }
  //    
//      let bufferOriginal = Buffer.from(JSON.stringify(product.productImage));
//
//res.set('Content-Type', 'image/png')
  //     res.send(bufferOriginal);
      res.status(200).json({ message: 'Product fetched.', product: product });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
    );
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then(product => {
     product.destroy().then(result=>{
      res.status(200).json({ message: 'Product deleted' });
    })})
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
    );
};
