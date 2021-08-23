const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');

const User = require('../models/user');
const Address = require('../models/address');
const Cart = require('../models/cart');


const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);


exports.getAll =(req, res, next) =>{
  User.findAll().then(
    users=>  res.status(201).json({ message: 'User created!', users: users })
   
  )
}

exports.getUserByEmail = (req, res, next) =>{

  let userFound = false;
 
  User.findAll({
    include: [{// Notice `include` takes an ARRAY
      model: Address
    }]
  })
      .then(users => {
        // console.log(users)

        for(let u of users){
          // console.log(u)
          // console.log(req.params.email)
          // console.log(u.userEmail==req.params.email)
          if(u.userEmail==req.params.email){
            userFound = true
            res.status(201).json({ message: 'User fetched!', user: u })

          }
        }

        if(!userFound){
          
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
          
        }

}).catch(err => {
      
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
});
}


exports.getUser = (req, res, next) =>{

  let user;
  User.findAll().then(
    users=> { for(let u of users){
      if(u.userId==req.params.id){
user=u;
Address.findAll({where:{
  userUserId:user.userId
}})
  .then(address => {
    res.status(200).json({
      message: 'Fetched Address successfully.',
      address: address,user:user
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
      }
    }
    
      }
    )
    
  }
  


exports.signup = async (req, res, next) => {

  
  
 
  const email = req.body.email;
  const firstName = req.body.firstName; 
  const password = req.body.password;
  const phone=req.body.phone;
  let u1;
  await bcrypt
    .hash(password, 12)
    .then(hashedPw => {

      User.findAll()
      .then(users => {
        let user;

        for(let u of users){
          if(u.userEmail==req.body.email){
  user=u;
          }
        }
        if (user) {
          try{
          const err = new Error('Email already registered!');
          err.statusCode = 401;
          throw err;
          } catch(err){
            next(err);
          }
        }else{
          const user = new User({
            userEmail: email,
            userPass: hashedPw,
            userName: firstName,
            userPhone:phone,
            userStatus:false
          });
           user.save().then(result => {
            res.status(201).json({ message: 'User created!', userId: result._id });
           
            User.findAll().then(
              users=>{
                for(let u of users){
                  if(u.userEmail==req.body.email){
                    u1=u;
                  }
                }
                u1.createCart({
                  cartQuantity:0}
                )
                u1.createWishlist(
                )

              }
            )   
            return transporter.sendMail({
              to: email,
              from: 'gnitin2312@gmail.com',
              subject: 'Signup succeeded!',
              html: '<h1>You successfully signed up!  Maujjjj Krdi Maujjjq</h1>'
            });
      
          })

        }

      })
      
    })
    
    .catch(err => {
      
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  let user;
  let userCart
  User.findAll()
    .then(users => {
      for(let u of users){
        if(u.userEmail==req.body.email){
user=u;

u.getCart({include : ['products']}).then(cart=>{
         userCart = cart
   
       })

        }
      }
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      
      loadedUser = user;
      //let s:user.userPass.toString();
      return bcrypt.compare(req.body.password, user.userPass);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.userEmail,
          userId: loadedUser.userId.toString()
        },
        'gofuckyourself',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser.userId.toString() , userCart : userCart  });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
     
    return err;
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
        return  res.status(200).json({ message:"Incorrect User" });
  
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        
        res.status(200).json({ message:"Password Link Send To Email Please Check" });
  
        transporter.sendMail({
          to: req.body.email,
          from: 'gnitin2312@gmail.com',
          subject: 'Password reset',
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
          `
        });
      })
      .catch(err => {
        
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      
      return  res.status(200).json({  pageTitle: 'New Password',
      errorMessage: message,
      userId: user.userId.toString(),
      passwordToken: token
   });
  
    
    })
    .catch(err => {
     
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    userId: userId
  })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.userPassword = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      return  res.status(200).json({ message:"Password changed succesfully"
   });
   
    })
    .catch(err => {
     
    });
};





exports.userUpdate = async (req, res, next) => {

  const email = req.body.email;
  const firstName = req.body.firstName; 
  const password = req.body.password;
  
  await bcrypt
    .hash(password, 12)
    .then(hashedPw => {

      User.findAll()
      .then(users => {
        let user;

        for(let u of users){
          if(u.userEmail==req.body.email){
  user=u;
          }
        }
        if (user) {
          user.userName=firstName,
          user.userPass=hashedPw
          user.save().then(result => {
            res.status(201).json({ message: 'Details Updated Succesfully', user: user });
               
          }
          )

        }else{
          try{
            const err = new Error('User Not Registered');
            err.statusCode = 401;
            throw err;
            } catch(err){
              next(err);
            }
  
        }

      })
      
    })
    
    .catch(err => {
      
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
