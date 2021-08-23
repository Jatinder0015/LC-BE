

//const { validationResult } = require('express-validator/check');

const Address = require('../models/address');
const User=require('../models/user');
exports.getAddress = (req, res, next) => {
  const uid=req.params.uid;
  Address.findAll({where:{
    userUserId:uid
  }})
    .then(address => {
      res.status(200).json({
        message: 'Fetched products successfully.',
        address: address,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createAddress = async (req, res, next) => {
  const addressArea = req.body.area;
  const city = req.body.city;
  const state = req.body.state;
  const district=req.body.district;
  const uid=req.body.userId;
  let user1;
await User.findByPk(uid).then(
    user=>
    //user1=user,
    user.createAddress(
        {
            addressArea: addressArea,
            city: city,
            state: state,
            district : district
        }
    ),
)
    .then(result => {
     
      res.status(201).json({
        message: "Address  Added",
        addressId: result.dataValues.addressId
 });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.updateAddress = async (req, res, next) => {
  const addressArea = req.body.area;
  const city = req.body.city;
  const state = req.body.state;
  const aid=req.body.aid;
  
await Address.findByPk(aid).then(
    address=>
        {    address.addressArea= addressArea,
            address.city= city,
            address.state= state
        
    
        address.save()
        .then(result => {
          res.status(201).json({
            message: "Address  Updated Succesfully"
     }
     );}
        
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


exports.get = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then(product => {
      if (!product) {
        const error = new Error('Could not find product.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Product fetched.', product: product });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};



exports.deleteAddress = (req, res, next) => {
  const aid = req.params.addressId;
  Address.findByPk(aid).then(address=>{
    address.destroy().then(result=>{
      res.status(200).json({ message: 'Address Deleted.'});
  
    })
  })
    
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

