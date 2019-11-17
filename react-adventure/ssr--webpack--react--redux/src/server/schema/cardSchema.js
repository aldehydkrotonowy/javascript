import mongoose from 'mongoose';


const cardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    item: {
        word: String,               //word to remember
        sentence: String,           //example usage in sentence
        meaning: String,            //meaning
        timestamp: Date,            //data added
        repetitions: Number,        //number of repetitions
        difficultyRatio: Number,    //how difficult is this therm to remember
        lastGrade: Number,
        averageGrade: Number,
        nextRepetition: Date,
    }
})

export default mongoose.model('card', cardSchema);