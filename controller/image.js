

//const { validationResult } = require('express-validator/check');

const Image = require('../models/images');
const Product=require('../models/product');
exports.getImage = (req, res, next) => {
  const pid=req.params.pid;
  Image.findAll({where:{
    productId:pid
  }})
    .then(images => {
      res.status(200).json({
        message: 'Fetched images successfully.',
        images: images,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createImage = async (req, res, next) => {

  const imageUrl=req.body.url;
  const pid=req.body.pid;
  let user1;
await Product.findByPk(pid).then(
    product=>
    //user1=user,
    product.createImage(
        {
            imageUrl: imageUrl
            
        }
    ),
)
    .then(result => {
     
      res.status(201).json({
        message: "Image  Added",
        imageId: result.dataValues.imageId
 });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


// exports.get = (req, res, next) => {
//   const productId = req.params.productId;
//   Product.findByPk(productId)
//     .then(product => {
//       if (!product) {
//         const error = new Error('Could not find product.');
//         error.statusCode = 404;
//         throw error;
//       }
//       res.status(200).json({ message: 'Product fetched.', product: product });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };



// exports.deleteImage = (req, res, next) => {
//   const aid = req.params.addressId;
//   Address.findByPk(aid).then(address=>{
//     address.destroy().then(result=>{
//       res.status(200).json({ message: 'Address Deleted.'});
  
//     })
//   })
    
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

