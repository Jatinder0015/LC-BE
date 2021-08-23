const http = require('http');
const fs = require('fs');


const https = require('https');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const authRoutes = require('./routes/auth');
const addressRouts=require('./routes/address');
const productRouts=require('./routes/product');
const feedbackRouts=require('./routes/feedback');
const cartRouts=require('./routes/cart');
const categoryRouts=require('./routes/category');
const orderRouts=require('./routes/order');
const categoryaRouts=require('./routes/categoryA');
const categorybRouts=require('./routes/categoryB');
const couponRouts=require('./routes/coupon');
const colorRouts=require('./routes/color');
const stateRouts=require('./routes/state');
const adminRouts=require('./routes/admin');
const imageRouts=require('./routes/image');
const typeRouts=require('./routes/type');
const wishlistRouts=require('./routes/wishlist');




const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const Feedback = require('./models/feedback');
const Order = require('./models/order');
const Address = require('./models/address');
const CategoryA = require('./models/categoryA');
const CategoryB = require('./models/categoryB');
const Coupon = require('./models/category');

const Category = require('./models/category');
const CartProduct = require('./models/cart_product');
const OrderProduct = require('./models/order_product');
const Image = require('./models/images');
const Wishlist = require('./models/wishlist');
const WishlistProduct = require('./models/wishlist_product');

const app = express();

//product+wishlist
Wishlist.belongsToMany(Product, { through: WishlistProduct });
Product.belongsToMany(Wishlist, { through: WishlistProduct });
//user+wishlist
User.hasOne(Wishlist);
Wishlist.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

//product+cart
Cart.belongsToMany(Product, { through: CartProduct });
Product.belongsToMany(Cart, { through: CartProduct });
//user+cart
User.hasOne(Cart);
Cart.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
//user+feedback
Feedback.belongsTo(User);
User.hasMany(Feedback);
//feedback+product
Feedback.belongsTo(Product, { constraints: true, onDelete: 'CASCADE' });
Product.hasMany(Feedback);
//product+order
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });
//user+order
Order.belongsTo(User);
User.hasMany(Order);
//user+address
Address.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Address);
CategoryB.belongsTo(CategoryA, { constraints: true, onDelete: 'CASCADE' });
CategoryA.hasMany(CategoryB);
Image.belongsTo(Product, { constraints: true, onDelete: 'CASCADE' });
Product.hasMany(Image);


// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/address', addressRouts);
app.use('/product', productRouts);
app.use('/feedback', feedbackRouts);
app.use('/cart', cartRouts);
app.use('/category', categoryRouts);
app.use('/order', orderRouts);
//app.use('/categorya', orderRouts);
app.use('/category-a', categoryaRouts);
app.use('/category-b', categorybRouts);

app.use('/coupon', couponRouts);
app.use('/color', colorRouts);
app.use('/state', stateRouts);
app.use('/admin', adminRouts);
app.use('/image', imageRouts);
app.use('/type', typeRouts);
app.use('/wishlist', wishlistRouts);


app.use((error, req, res, next) => {
  
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

var ssl = {
  key: fs.readFileSync("/home/luxurycrafts/luxurycraftsbe.key", 'utf8'),
  cert: fs.readFileSync("/home/luxurycrafts/2823e179e156aeec.crt",'utf8'),
  ca:[fs.readFileSync('/home/luxurycrafts/gd_bundle-g2-g1.crt','utf8')]
};


const httpServer = http.createServer(app);
const  httpsServer = https.createServer(ssl, app);


 

sequelize
  // .sync({ force: true })
  .sync()
  .then( re=>{
  })
  .catch(err => {
  console.log("Something is wrong", err);
  });
httpServer.listen(80);
httpsServer.listen(443);

