const { DataTypes, Sequelize } = require('sequelize');

const config = require('./config');

//configure the mysql database here
const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.user,
    config.mysql.password,
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;        