const { Sequelize } = require('sequelize');

const config = require('./config');

const database = new Sequelize(
    config.mysql.database,
    config.mysql.user,
    config.mysql.password,
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = database;        