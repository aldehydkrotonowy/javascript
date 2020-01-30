import mongoose from 'mongoose';

const testSchama = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
})

export default mongoose.model('testSchama', testSchama);