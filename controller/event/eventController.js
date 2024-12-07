const Event = require('../../models/event/event');

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        const { heading, image, description, date, price, session, tagline } = req.body;

        const newEvent = new Event({
            heading,
            image,
            description,
            date,
            price,
            session,
            tagline
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create event' });
    }
};

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch event' });
    }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
};
