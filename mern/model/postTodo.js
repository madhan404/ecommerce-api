const mongoose = require('mongoose');
const todoP = new mongoose.Schema({
    Title: {
        required:true,
        type : String},
     Description:String,
    createdAt:String
})
const postTodo = mongoose.model('Todo',todoP );

module.exports = postTodo;