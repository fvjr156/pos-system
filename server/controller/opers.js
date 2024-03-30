const database = require('../configs/dbconfig');

const get_ServerTest = (req, res) => {
    res.send(["This express.js app is working"]);
};

const db_testConnection = ()=>{
    try {
        database.sync();
        console.log(`Database connection is working.`);
    } catch (error) {
        console.log(`ERROR: Can\'t connect to database.\n${error}`);
    }
};

module.exports = { get_ServerTest, db_testConnection };