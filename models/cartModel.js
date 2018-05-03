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


let Cart = mongoose.model('Cart', cartSchema);


module.exports = {Cart};
