import { DataTypes } from 'sequelize';
import database from '../configs/dbconfig.js';

const Transaction = database.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    transaction_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    transaction_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cashier_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customer_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customer_orders: {
        type: DataTypes.JSON,
        allowNull: true
    },
    product_quantityprice: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    purchase_quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    purchase_totalprice: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    purchase_payment: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    purchase_change: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    tableName: 'tb_transaction',
    timestamps: false

});

export default Transaction;