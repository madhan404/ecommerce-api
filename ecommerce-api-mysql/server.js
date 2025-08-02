const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const dbPool = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(express.json());

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');
const adminRoutes = require('./routes/admin');

// // const x = require(".....")

// const y =()=>{
// // .then(){

// // }
// }
// module.exports = y;



// function y (){

// }
// y();

const userModel = require('./models/userModel');
const productModel = require('./models/productModel');
const orderModel = require('./models/orderModel');
const cartModel = require('./models/cartModel');

async function createAllTables(contt) {
  try {
    await userModel.createTable();
    await productModel.createTable();
    await orderModel.createTable();
    await cartModel.createTable();
    console.log(`db connecterd succesfully ${process.env.DB_HOST}`);
  } catch (err) {
    console.error('Error creating tables:', err);
  }
}

createAllTables();

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes);
app.use('/admin', adminRoutes);

// Base endpoint
app.get('/', (req, res) => res.send('🌾 உழவர் மார்க்கெட் API is running'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
