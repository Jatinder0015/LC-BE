const { request } = require('express');
const Feedback = require('../models/feedback');
const Product = require('../models/product');
const User = require('../models/user');
 
exports.addFeedback=async (req,res,next)=>{
  console.log("yoyo")
const desc = req.body.desc;
const reviewHeading = req.body.reviewHeading;
const rating= req.body.rating;
const uid = req.body.uid;
const pid = req.body.pid;
await User.findByPk(uid)
.then
(user=>
    user.createFeedback(
      {
        feedbackDesc : desc,
        feedbackRating:rating,
        productId:pid,
        feedbackHeading:reviewHeading
      }
    )
).then(
    result=>{
        res.status(201).json({message:"feedback created"});
 
    }
 
)
.catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}
 
exports.removeFeedback=async (req,res,next)=>{
  const fid = req.params.fid;
  await Feedback.findByPk(fid)
  .then
  (feedback=>
   {
     feedback.destroy().then(
      result=>{
          res.status(201).json({message:"feedback Deleted"});
   
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
  }
   
  
exports.getFeedback=async (req,res,next)=>{
  const pid = req.params.pid;
  await Feedback.findAll({where:{
    productId:pid
  },

  include: [{// Notice `include` takes an ARRAY
    model: User
  }]
})
  .then
  (feedbacks=>
   {
          res.status(201).json({message:"feedback Fetched",feedbacks: feedbacks});
   
      }
     )
  .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  }
   
  