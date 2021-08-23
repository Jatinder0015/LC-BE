const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Admin = require('../models/admin');


exports.getAll =(req, res, next) =>{
    Admin.findAll().then(
    users=>  res.status(201).json({ message: 'All users!', users: users })
   
  )
}

exports.getUserByEmail = (req, res, next) =>{
 
  Admin.findAll()
      .then(users => {
        

        for(let u of users){
          if(u.adminEmail==req.params.email){
             
            res.status(201).json({ message: 'Admin fetched!', user: u })

          }else{
            const error = new Error('A admin with this email could not be found.');
            error.statusCode = 401;
            throw error;
          }
        }
}).catch(err => {
      
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
});
}




exports.signup = async (req, res, next) => {
 
  const email = req.body.email;
  const name = req.body.name; 
  const password = req.body.password;
  let u1;
  await bcrypt
    .hash(password, 12)
    .then(hashedPw => {

      Admin.findAll()
      .then(users => {
        let user;

        for(let u of users){
          if(u.adminEmail==req.body.email){
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
          const user = new Admin({
            adminEmail: email,
            adminPass: hashedPw,
            adminName: name
          });
           user.save().then(result => {
            res.status(201).json({ message: 'Admin created!', userId: result._id });
              
      
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
  
  Admin.findAll()
    .then(users => {
      for(let u of users){
        if(u.adminEmail==req.body.email){
user=u;


        }
      }
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      //let s:user.userPass.toString();
      return bcrypt.compare(req.body.password, user.adminPass);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.adminEmail,
          userId: loadedUser.adminId.toString()
        },
        'jindgijhandhaifirbghamandhai',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, adminId: loadedUser.adminId.toString()});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

