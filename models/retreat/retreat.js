const mongoose = require('mongoose')

const retreatSchema = new mongoose.Schema({
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
    dateTo: {
        type: String,
        required: true
    },
    dateFrom: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    days: {
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

const Retreat = mongoose.model('retreat', retreatSchema)

module.exports = Retreat;