let {Product}= require("../models/productModel");


exports.get_all_products=function(req,res){
  Product.find({},function(err,products){
      res.json(products);
  });
};

exports.save_product=function(req,res){
  let product= new Product({
      productName: req.body.productName,
      productStock:req.body.productStock,
      productPrice:req.body.productPrice
  });
  product.save().then((product)=> {
      res.send({res:true,product});
  },(e)=>{
      res.send({res:false});
  });
};