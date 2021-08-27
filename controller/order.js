const { request } = require('express');
const Feedback = require('../models/feedback');
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const Cart = require('../models/cart');
const Category = require('../models/category');
const Image = require('../models/images');


const app = require('express')()
const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

const razorpay = new Razorpay({
  key_id: 'rzp_live_vws2FfiRDbQ1aw',
  key_secret: 'LqwR3rnJRtLi5ouZbnPJ2QCc'
})

exports.razorpayPayment = async (req, res) => {
  const payment_capture = req.body.payment_capture
  const amount = req.body.amount * 100
  const currency = req.body.currency

  const options = {
    amount: amount,
    currency,
    receipt: shortid.generate(),
    payment_capture
  }

  try {
    const response = await razorpay.orders.create(options)

    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount
    })
  } catch (error) {

  }
}

exports.getOrder = (req, res, next) => {
  
  console.log(req.params.uid)
  const uid = req.params.uid;
  User.findByPk(uid).then(
    user => {
      console.log(user)
      user.getOrders({
        include: [{
          model: Product, include: [Image]

        }]
      }).then(orders => {
        

        res.status(201).json({ message: "order fetched", orders: orders });

      })

    }
  )
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
    )
}


exports.getAllOrder = (req, res, next) => {

  Order.findAll({
    include: [{
      model: Product, include: [Image]

    }]
  }).then(orders => {

    res.status(201).json({ message: "order fetched", orders: orders });

  })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err => { console.log(err) });
    }
    )
}

exports.cancelOrder = async (req, res, next) => {


  const oid = req.body.orderId;

  const razorpayPaymentId = req.body.razorpayPaymentId;
  const paymentType = req.body.paymentType;
  const amount = req.body.amount * 100;

  if (paymentType) {


    const options = {
      amount: amount,
      payment_id: razorpayPaymentId
    }

    await razorpay.payments.refund(razorpayPaymentId, {
      amount: amount,
      notes: {
        note1: 'This is a test refund',
        note2: 'This is a test note'
      }
    }).then((data) => {
      // success



    }).catch((error) => {

      // error
    })
  }


  Order.findByPk(oid).then(order => {
    order.orderCancelStatus = true
    order.save()
      .then(result => {
        res.status(201).json({ message: "order Canceled" });

      }
      )
  }
  )
    .catch(err)
}


exports.acceptOrder = (req, res, next) => {
  const uid = req.params.id;
  Order.findByPk(uid).then(order => {
    order.orderDispatchedStatus = true
    order.save()
      .then(result => {
        res.status(201).json({ message: "order Accepted" });

      }
      )
  }
  )
    .catch(err => { console.log(err) })
}


exports.dispatchOrder = (req, res, next) => {
  const uid = req.params.id;
  Order.findByPk(uid).then(order => {
    order.orderDelieverStatus = true
    order.save()
      .then(result => {
        res.status(201).json({ message: "order Accepted" });

      }
      )
  }
  )
    .catch(err => { console.log(err) })
}


exports.postOrder = (req, res, next) => {
  let fetchedCart;
  const uid = req.body.userId;
  let razorpayOrderId = req.body.razorpayOrderId;
  let razorpayPaymentId = req.body.razorpayPaymentId;
  let orderPaymentType = req.body.orderPaymentType;
  let orderTotalAmount = req.body.orderTotalAmount;
  let orderDeliveryCharges = req.body.orderDeliveryCharges;
  // let addressId = req.body.addressId;
  let area = req.body.address.area;
  let district = req.body.address.district;
  let city = req.body.address.city;
  let state = req.body.address.state;
  console.log(req.body.address)




  let categoryList = []
  let orderedProducts = []
  User.findByPk(uid).then(user => {
    user
      .getCart()
      .then(cart => {
        fetchedCart = cart;
        cart.getProducts()
          .then(products => {
            orderedProducts = products
            return user
              .createOrder()
              .then(order => {
                order.razorpayOrderId = razorpayOrderId,
                  order.razorpayPaymentId = razorpayPaymentId,
                  order.orderDispatchedStatus = 0,
                  order.orderDelieverStatus = 0,
                  order.orderCancelStatus = 0,
                  order.orderPaymentType = orderPaymentType,
                  order.orderTotalAmount = orderTotalAmount,
                  order.orderDeliveryCharges = orderDeliveryCharges,
                  // order.orderAddressId = addressId,
                  order.area = area,
                  order.district = district,
                  order.city = city,
                  order.state = state,
                  order.save()


                return order.addProducts(
                  products.map(product => {
                    Product.findByPk(product.cart_product.productId).then(
                      product1 => {
                        product1.productQuantity = product1.productQuantity - product.cart_product.quantity;
                        product1.save();
                      }
                    )
                    product.order_product = { quantity: product.cart_product.quantity };
                    return product;
                  }
                  )
                );
              }
              )

          }
          )
          .then(result => {
            return fetchedCart.setProducts(null);
          })
          .then(result => {
            res.status(201).json({ message: "order Placed" });

            for (let p of orderedProducts) {
              categoryList.push(p.productCategory)
            }

            Category.findAll().then(category => {


              let categoryToSave = []

              for (let mainCategory of category) {



                for (let c of categoryList) {


                  if (mainCategory.categoryName === c) {

                    mainCategory.orderCount = mainCategory.orderCount + 1

                    mainCategory.save()


                  }

                }

              }



            })

          })
          .catch(err => { console.log(err) })
      })
  })
};


exports.postOrderBuy = (req, res, next) => {
  let fetchedCart;
  console.log("1");
  console.log(req.body.pid)
  console.log(req.body.address);
  const pid = req.body.pid;

  const uid = req.body.userId;
  let razorpayOrderId = req.body.razorpayOrderId;
  let razorpayPaymentId = req.body.razorpayPaymentId;
  let orderPaymentType = req.body.orderPaymentType;
  let orderTotalAmount = req.body.orderTotalAmount;
  let orderDeliveryCharges = req.body.orderDeliveryCharges;
  // let addressId = req.body.addressId;
  let area = req.body.address.area;
  let district = req.body.address.district;
  let city = req.body.address.city;
  let state = req.body.address.state;



  let categoryList = []
  let orderedProducts;
  let productArray = [];
  User.findByPk(uid).then(user => {
    user,

      console.log("2");
    Product.findByPk(pid).then(product => {
      productArray.push(product);

      console.log("3");
      orderedProducts = product
      return user
        .createOrder()
        .then(order => {
          order.razorpayOrderId = razorpayOrderId,
            order.razorpayPaymentId = razorpayPaymentId,
            order.orderDispatchedStatus = 0,
            order.orderDelieverStatus = 0,
            order.orderCancelStatus = 0,
            order.orderPaymentType = orderPaymentType,
            order.orderTotalAmount = orderTotalAmount,
            order.orderDeliveryCharges = orderDeliveryCharges,
            // order.orderAddressId = addressId,
            order.area = area,
            order.district = district,
            order.city = city,
            order.state = state,
            order.save()


          console.log("4");
          console.log(productArray)
          return order.addProducts(

            productArray.map(product => {
              Product.findByPk(pid).then(
                product1 => {
                  product1.productQuantity = product1.productQuantity - 1;
                  product1.save();
                }
              )
              product.order_product = { quantity: 1 };
              return product;
            }
            )
          );


        }
        )


        .then(result => {
          console.log("7");
          res.status(201).json({ message: "order Placed" });

          categoryList.push(orderedProducts.productCategory)
          console.log("8");

          Category.findAll().then(category => {


            let categoryToSave = []

            for (let mainCategory of category) {



              for (let c of categoryList) {


                if (mainCategory.categoryName === c) {

                  mainCategory.orderCount = mainCategory.orderCount + 1

                  mainCategory.save()


                }

              }

            }



          })

        })
        .catch(err => { console.log(err) })
    })
  })
};

