let express = require('express');
let router = express.Router();
let productController= require('../controllers/productController');

router.get("/getAllProducts",productController.get_all_products);

router.post("/saveProduct",productController.save_product);
module.exports = router;
