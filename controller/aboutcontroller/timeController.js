const Time = require('../../models/About/time'); // Correct path to Time model

// Create Time
const createTime = async (req, res) => {
    try {
        const Mytime = new Time(req.body);
        const savedTime = await Mytime.save();
        res.status(201).json({ success: true, data: savedTime });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Get All Times
const getTime = async (req, res) => {
    try {
        const times = await Time.find();
        if (!times.length) {
            return res.status(404).json({ success: false, message: 'No times found' });
        }
        res.status(200).json({ success: true, data: times });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Update Time
const updateTime = async (req, res) => {
    try {
        const updatedTime = await Time.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true 
        });
        if (!updatedTime) {
            return res.status(404).json({ success: false, message: 'Time not found' });
        }
        res.status(200).json({ success: true, message: 'Time updated successfully', data: updatedTime });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Delete Time
const deleteTime = async (req, res) => {
    try {
        const deletedTime = await Time.findByIdAndDelete(req.params.id);
        if (!deletedTime) {
            return res.status(404).json({ success: false, message: 'Time not found' });
        }
        res.status(200).json({ success: true, message: 'Time deleted successfully' });
    } catch (error) {    
        res.status(500).json({ success: false, message: error.message });
    }    
}

// ✅ Ensure all functions are properly exported
module.exports = { createTime, getTime, updateTime, deleteTime };
