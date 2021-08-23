const { request } = require('express');
const Product = require('../models/product');
const User = require('../models/user');
const Cart=require('../models/cart') 
const Image = require('../models/images');

exports.addProductToCart=async (req,res,next)=>{

 
let user;

    const userEmail=req.body.email;
const pid=req.body.pid;
let  newQuantity;
User.findAll().then(
 users=>{
  for(let u of users){
    if(u.userEmail==req.body.email){
      user=u;
    }
  }
        // res.status(201).json({message:"feedback created"});
 user.getCart().then(
     cart=>{
cart.getProducts({where:{id:pid}}).then(
     product=>{
        
    // if(product=null){
        if(product.length===0) {
      Product.findByPk(pid).then(
          product=>{
           
            cart.addProduct(product,{  through: { quantity: 1 }
           }).then(
               result=> res.status(201).json({
                    message: 'Product Added To Cart successfully!',
                 })
           )    
          }
      )
        }else{
      let product1=product[0];
      
      
      const oldQuantity = product1.cart_product.quantity;
      if(product1.productQuantity<=oldQuantity){
       return  res.status(500).json({
            message: 'Can not add more quantity',
             })
      }
      newQuantity = oldQuantity + 1;
      cart.addProduct(product1,{  through: { quantity: newQuantity }
      }).then(
          result=> res.status(201).json({
           message: 'Product Added To Cart successfully!',
            })     
      )
        }
        }
)
    }
 )
 }
).catch(err => {
    if (!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
}
  )
}
exports.removeAProductFromCart=async (req,res,next)=>{

    const userEmail=req.body.email;
const pid=req.body.pid;
let  newQuantity , user
User.findAll().then(
 users=>{

  for(let u of users){
    if(u.userEmail==userEmail){
      user = u
    }}
        // res.status(201).json({message:"feedback created"});
 user.getCart().then(
     cart=>{
cart.getProducts({where:{id:pid}}).then(
     products=>{
        const product = products[0];
      return product.cart_product.destroy().then(
               result=> res.status(201).json({
                    message: 'Product removed from Cart successfully!',
                 })
           )    
          }
      )}
      )}).catch(err => {
    if (!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
}
  )
}
exports.decrementAProductFromCart=async (req,res,next)=>{

    const userEmail=req.params.email;
const pid=req.params.pid;

let  newQuantity , user 
User.findAll().then(
 users=>{
   for(let u of users){
     if(u.userEmail==userEmail){
       user = u
     }
   }
        // res.status(201).json({message:"feedback created"});
 user.getCart().then(
     cart=>{
cart.getProducts({where:{id:pid}}).then(
     product=>{
       
    // if(product=null){
      let product1=product[0];
      
      
      const oldQuantity = product1.cart_product.quantity;
      if(oldQuantity===1){
       return   product1.cart_product.destroy().then(  res.status(200).json({
            message: 'removed',
             }))
      }
      newQuantity = oldQuantity - 1;
      cart.addProduct(product1,{  through: { quantity: newQuantity }

      }).then(

          result=> res.status(201).json({
           message: 'Product Removed From Cart successfully!',
            }) 

      )

        
        }
)
    }
 )
 }
).catch(err => {
    if (!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
}
  )
}
exports.getProductFromCart=async (req,res,next)=>{

  const userEmail=req.params.email;
  
    let user;
User.findAll().then(
 users=>{
  for(let u of users){
    if(u.userEmail==req.params.email){
      user=u;
    }
  }
        // res.status(201).json({message:"feedback created"});
 user.getCart().then(
     cart=>{
cart.getProducts({include: [{
  model: Image
}]}).then(
     products=>{
    // if(product=null){
      return  res.status(201).json({
           message: 'Product Fetched successfully!',
           products:products
            }
            )}     
      )
        
        }
)
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
