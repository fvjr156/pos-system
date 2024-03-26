const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const router = require('./routes/routes');
const fileupload = require('express-fileupload');

const sequelize = require('./configs/dbconfig');

const app = express();
dotenv.config();

app.use(fileupload());
app.use(cors());
app.use(express.json());

app.use('/', router);

try {
    sequelize.sync();
    console.log("Database Connected Successfully");
} catch (error) {
    console.log("Connecting error " + error);
}

app.listen(process.env.SERVER_PORT, function(){
    console.log('Server running on port', process.env.SERVER_PORT);
});



