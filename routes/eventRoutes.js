const express = require('express');
const router = express.Router();
const eventController = require('../controller/event/eventController');

// Create a new event
router.post('/events', eventController.createEvent);

// Get all events
router.get('/events/all', eventController.getAllEvents);

// Get a single event by ID
router.get('/events/:id', eventController.getEventById);

// Update an event by ID
router.put('/update/events/:id', eventController.updateEvent);

// Delete an event by ID
router.delete('/delete/events/:id', eventController.deleteEvent);

module.exports = router;
