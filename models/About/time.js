const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// ✅ Export the model properly
module.exports = mongoose.model('Time', timeSchema);
