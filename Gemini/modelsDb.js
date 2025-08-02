const mongoose = require('mongoose');

const model1Q = new mongoose.Schema({
    kelvi : String,
    bathil : String,
  createdAt: {
    type: String,
    default: () => new Date().toISOString()
}}
);
const createMong = mongoose.model('GeminiOutput',model1Q);

module.exports = createMong;
