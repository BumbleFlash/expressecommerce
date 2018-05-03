let {Cart} = require('../models/cartModel');
let {Product}= require('../models/productModel');
let {ObjectID} = require('mongodb');
exports.add_to_cart= function (req,res) {
    let quantity = req.body.quantity;
    let product_id=req.body.product_id;
    let cart_id= req.body.cart_id;
    Product.findById(product_id,function (err,product) {
         Cart.findById(cart_id,function (err,cart) {
             let cartProducts = cart.products;
             let checker =0;
             let hasUpdated =false;
             let newProduct= new Product({
                productName:product.productName,
                productStock:product.productStock,
                productPrice:product.productPrice,
                quantity:quantity
             });
             if (cartProducts.length === 0) {
                 Cart.findByIdAndUpdate(cart_id, {
                     $push: {
                         products: newProduct
                     }
                 }, {new: true}, function (err, doc) {
                     if (err)
                         console.log(err);
                     else
                         res.send(doc);
                 });

             }
             cartProducts.forEach(function (cartProduct) {
                 checker++;

                 if (cartProduct.id === product_id) {
                     checker=0;

                     Cart.findOneAndUpdate({"_id": cart_id, "products._id": product_id},
                         {
                             "$inc": {
                                 "products.$.quantity": quantity
                             }
                         }, {new: true}, function (err, doc) {
                             if (err)
                                 console.log(err);
                             else {
                                 console.log("Called");
                                 res.send(doc);

                             }
                         });
                 }
                 else{
                     if(checker===cartProducts.length){
                         Cart.findByIdAndUpdate(cart_id, {
                             $push: {
                                 products: product
                             }
                         }, {new: true}, function (err, doc) {
                             if (err)
                                 console.log(err);
                             else
                                 res.send(doc);
                         });

                     }

                 }

             });



               // res.send(cart);
         });
    });
};

exports.get_all_cart= function (req,res) {
    Cart.find({},function(err,cart){
        res.json(cart);
    });
};


