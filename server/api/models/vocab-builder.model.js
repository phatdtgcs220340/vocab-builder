import mongoose from 'mongoose'

const { Schema } = mongoose

const VocabSchema = new Schema({
    english: {
        type: String,
        required: 'English word cannot be blank'
    },
    german: {
        type: String,
        required: 'German word cannot be blank'
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required : true
    }
}, {
    collection : 'vocab'
})

module.exports = mongoose.model('Vocab', VocabSchema)

