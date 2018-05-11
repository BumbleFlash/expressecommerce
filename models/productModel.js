const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const _ = require('lodash');
let productSchema= new Schema({
   productName: String,
   productStock: Number,
   productPrice: Number,
   quantity: {
       type:Number,
       default:1
   },
}, {strict:false});
// productSchema.methods.toJSON = function() {
//     let product = this;
//     let productObject = product.toObject();
//     return _.pick(productObject, ['_id', 'productName', 'productStock','productPrice']);
// };

let Product = mongoose.model('Product', productSchema);

module.exports = {Product};