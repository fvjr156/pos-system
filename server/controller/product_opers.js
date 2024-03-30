const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const Products = require('../model/tb_products');
const GetDateTime = require('./GetDateTime');
const sequelize = require('../configs/dbconfig');


const post_uploadProduct = async (req, res) => {
    let imgFile;
    let imgFileUplPath;
    let product_name;
    let product_price;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({error_msg: 'ERROR: Nothing uploaded.', error_msg2: 'Please complete the submit form.'});
    }

    imgFile = req.files.key_productImage;
    product_name = req.body.key_productName;
    product_price = req.body.key_productPrice;

    const timestamp = GetDateTime();
    const imgFile_ext = path.extname(imgFile.name);
    const imgFile_newFileName = `${timestamp}_${imgFile_ext}`;

    imgFileUplPath = path.join(__dirname, '../uploads/', imgFile_newFileName);

    try {
        const imgProcessedBuffer = await sharp(imgFile.data)
            .resize({
                width: 256,
                height: 256,
                fit: sharp.fit.cover,
                position: sharp.strategy.attention
            })
            .toBuffer();

        fs.writeFileSync(imgFileUplPath, imgProcessedBuffer);
        await db_addProduct(product_name, product_price, imgFile_newFileName);

        res.status(200).json({success: "Upload successful."});
    } catch (error) {
        console.error(`ERROR: Processing or uploading error. ${error}`);
        res.status(500).json({error_msg: 'ERROR: Processing or uploading error.', error_msg2: error});
    }
};


const db_addProduct = async (productName, productPrice, imageFileName) => {
    try {
        await Products.create({
            product_image_filepath: imageFileName,
            product_name: productName,
            product_price: productPrice
        });
        console.log('Entry saved in database.');
    } catch (error) {
        console.error(`ERROR: Cannot save entry in database. ${error}`);
        throw error;
    }
};

const get_allProducts = async (req, res) => {
    try{
        const db_products = await sequelize.query('SELECT * FROM tb_products;', {type: sequelize.QueryTypes.SELECT});
        res.json(db_products);
    } catch (error){
        res.status(500).json({error_msg: `ERROR: Cannot fetch products.`, error_msg2: error});
    }
}

module.exports = { post_uploadProduct, get_allProducts};
