const express = require('express');
const router = express.Router();
const {submitProduct, getProducts} = require('../controller/product_opers');
const {serverTest} = require('../controller/opers');


router.get('/', serverTest);
router.post('/submit-product', submitProduct);
router.get('/get-products', getProducts);

module.exports = router;