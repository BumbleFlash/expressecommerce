let express = require('express');
let router = express.Router();
let cartController= require('../controllers/cartController');

router.post('/addToCart', cartController.add_to_cart);

router.get('/getCarts', cartController.get_all_cart);

module.exports = router;