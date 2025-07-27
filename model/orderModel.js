const mongoose = require('mongoose');

const orderScheme = new mongoose.Schema({
     cartItems : Array,
     amount : String,
     status:String ,
     createdAt : String
})
const orderModel = mongoose.model('Order',orderScheme);

module.exports= orderModel;