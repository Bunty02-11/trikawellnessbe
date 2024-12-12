const mongoose = require('mongoose')

const introductionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    image:{
        type: String,
    },
    video:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isActive:{
        type: Boolean,
        default: true
    }
})

const Introduction = mongoose.model('Introduction', introductionSchema)

module.exports = Introduction