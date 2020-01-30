import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // _id: {type: Schema.Types.ObjectId, required: true, unique: true, default: mongoose.Schema.Types.ObjectId()},
    user: {
        userID:         {type: Schema.Types.ObjectId, required: true, unique: true},
        firstName:      {type: String,  required: true, unique: false},
        lastName:       {type: String,  required: true, unique: false},
        email:          {type: String,  required: true, unique: true},
        login:          {type: String,  required: true, unique: true},
        password:       {type: String,  required: true, unique: false},
        // dataOfBirth:    {type: Date,    required: true, unique: false},
        timestamp:      {type: Date,    required: true, default: Date.now},
    },
    cards: [{type: Schema.Types.ObjectId, ref: 'cards'}]
})

export default mongoose.model('user', userSchema)