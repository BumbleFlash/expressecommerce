const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const _ = require('lodash');
const {Product}= require('./productModel');
const {User}= require('./userModel');
let cartSchema= new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: Number,
    products:[Product.schema]
});

cartSchema.methods.toJSON = function() {
    let cart = this;
    let cartObject = cart.toObject();
    return _.pick(cartObject, ['_id', 'user_id', 'price', 'products']);
};

cartSchema.statics.isInCart=function isInCart(productID = 0){
    let value= false;
    this.products.forEach(product=>{
        console.log(product.id===productID);
       if(product.id===productID)
           value=true;
    });
    return value;
};

cartSchema.statics.addToCart= function addToCart(product =null, quantity =1){
    console.log(product.id);
    if(!this.isInCart(product.id)){

        this.products.push(product);
    }


    this.calculatePrice();
};
cartSchema.statics.calculatePrice=function calculatePrice(){
    this.price=0;
    this.products.forEach(product=>{
        let amount= product.productPrice*product.productQuantity;
        this.price+= amount;
    })

};
let Cart = mongoose.model('Cart', cartSchema);


module.exports = {Cart};
