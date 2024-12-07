const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({

    heading: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    tagline: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const event = mongoose.model('event', eventSchema)

module.exports = event