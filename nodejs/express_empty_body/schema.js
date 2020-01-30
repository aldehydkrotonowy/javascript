const mongoose = require('mongoose');

const testSchama = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
})

let model = mongoose.model('testSchama', testSchama);

module.exports = model