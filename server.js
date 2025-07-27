const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
dotenv.config({path:path.join(__dirname,'./config/.env')})
const app = express();

const prodRoute = require('./routes/prodRoute');
const getOrder = require('./routes/orderRou');

dbConnect();
app.use(express.json());
app.use('/api',prodRoute);
app.use('/api',getOrder);
app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log(`${process.env.PORT} server running prt fine`);
    
});