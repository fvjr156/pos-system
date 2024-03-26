const express = require('express');
const router = express.Router();
const {submitProduct} = require('../controller/product_opers');
const {serverTest} = require('../controller/opers');
const { storage, upload } = require('../configs/config');


router.get('/', serverTest);
router.post('/submit-product', submitProduct);  //handle file and data submit here

module.exports = router;