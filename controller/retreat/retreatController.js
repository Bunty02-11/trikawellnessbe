const Retreat = require("../../models/retreat/retreat");

// Create a new retreat
const createRetreat = async (req, res) => {
    try {
        const { heading, image, description, dateTo, dateFrom, price, days, tagline, isActive } = req.body;

        const newRetreat = new Retreat({
            heading,
            image,
            description,
            dateTo,
            dateFrom,
            price,
            days,
            tagline,
            isActive
        });

        const savedRetreat = await newRetreat.save();
        res.status(201).json({ message: "Retreat created successfully", data: savedRetreat });
    } catch (error) {
        res.status(500).json({ message: "Error creating retreat", error });
    }
};

// Get all retreats
const getRetreats = async (req, res) => {
    try {
        const retreats = await Retreat.find();
        res.status(200).json(retreats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching retreats", error });
    }
};

// Get a retreat by ID
const getRetreatById = async (req, res) => {
    try {
        const retreat = await Retreat.findById(req.params.id);
        if (!retreat) {
            return res.status(404).json({ message: "Retreat not found" });
        }
        res.status(200).json(retreat);
    } catch (error) {
        res.status(500).json({ message: "Error fetching retreat", error });
    }
};

// Update a retreat by ID
const updateRetreat = async (req, res) => {
    try {
        const updatedRetreat = await Retreat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRetreat) {
            return res.status(404).json({ message: "Retreat not found" });
        }
        res.status(200).json({ message: "Retreat updated successfully", data: updatedRetreat });
    } catch (error) {
        res.status(500).json({ message: "Error updating retreat", error });
    }
};

// Delete a retreat by ID
const deleteRetreat = async (req, res) => {
    try {
        const deletedRetreat = await Retreat.findByIdAndDelete(req.params.id);
        if (!deletedRetreat) {
            return res.status(404).json({ message: "Retreat not found" });
        }
        res.status(200).json({ message: "Retreat deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting retreat", error });
    }
};

module.exports = {
    createRetreat,
    getRetreats,
    getRetreatById,
    updateRetreat,
    deleteRetreat
};
