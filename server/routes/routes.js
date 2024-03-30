const express = require('express');
const router = express.Router();
const {post_uploadProduct, get_allProducts} = require('../controller/product_opers');
const {get_ServerTest} = require('../controller/opers');


router.get('/', get_ServerTest);
router.post('/post-uploadproduct', post_uploadProduct);
router.get('/get-allproducts', get_allProducts);

module.exports = router;