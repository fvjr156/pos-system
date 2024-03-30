const DataTypes = require('sequelize');
const database = require('../configs/dbconfig.js');

const Products = database.define('Products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_image_filepath: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'tb_products',
    timestamps: false

});

module.exports = Products;