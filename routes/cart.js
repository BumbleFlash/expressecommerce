let express = require('express');
let router = express.Router();
let cartController= require('../controllers/cartController');

router.post('/addToCart', cartController.add_to_cart);

router.get('/getCarts', cartController.get_all_cart);

router.delete('/deleteCart',cartController.delete_item);

router.put('/updateCart',cartController.update_cart);

router.get('/orders/:id', cartController.get_all_orders);

router.patch('/orders', cartController.update_order_status);

module.exports = router;