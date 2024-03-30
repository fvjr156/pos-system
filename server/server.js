const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/routes');
const fileupload = require('express-fileupload');
const {db_testConnection} = require('./controller/opers');

const app = express();
dotenv.config();

app.use(fileupload());
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'))

app.use('/', router);

db_testConnection();

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`Server is running on PORT ${process.env.SERVER_PORT}.`);
});