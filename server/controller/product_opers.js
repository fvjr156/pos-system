const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const Products = require('../model/tb_products');

const submitProduct = async (req, res) => {
    let imageFile;
    let imageFileUploadPath;
    let productName;
    let productPrice;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    imageFile = req.files.image;
    productName = req.body.name;
    productPrice = req.body.price;

    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
    const fileExtension = path.extname(imageFile.name);
    const fileNameWithTimestamp = `${timestamp}_${fileExtension}`;

    imageFileUploadPath = path.join(__dirname, '../uploads/', fileNameWithTimestamp);

    try {
        const processedImageBuffer = await sharp(imageFile.data)
            .resize({
                width: 256,
                height: 256,
                fit: sharp.fit.cover,
                position: sharp.strategy.attention
            })
            .toBuffer();

        fs.writeFileSync(imageFileUploadPath, processedImageBuffer);
        await submitProductToDB(productName, productPrice, fileNameWithTimestamp);

        res.send('File uploaded: ' + imageFileUploadPath);
        console.log('File Uploaded Successfully!');
        console.log("Path:", imageFileUploadPath);
        console.log("Name:", productName);
        console.log("Price:", productPrice);
    } catch (error) {
        console.error('Error processing image or submitting product:', error);
        res.status(500).send('Error processing image or submitting product');
    }
};


const submitProductToDB = async (productName, productPrice, imageFileName) => {
    try {
        await Products.create({
            product_image_filepath: imageFileName,
            product_name: productName,
            product_price: productPrice
        });
        console.log('Product saved to the database');
    } catch (error) {
        console.error('Error saving product to the database:', error);
        throw error;
    }
};

module.exports = { submitProduct };
