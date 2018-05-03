let express = require('express');
let router = express.Router();
let userController= require('../controllers/userController');
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.post('/signup',userController.sign_in_post);

router.post('/login',userController.login_in_post);
module.exports = router;
