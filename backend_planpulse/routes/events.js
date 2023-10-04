const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { authenticateUser } = require('../middleware/authMiddleware')



// Route for event registration
router.post('/createEvent', authenticateUser, async (req, res) => {
  try {
    
    const { title, description, startDateTime, endDateTime, createdBy } = req.body;

  //Authenticate User
  if (req.user._id.toString() !== createdBy) {
    return res.status(403).json({message: 'You are not authorized to perform this action.'})
  }

  // Create a new event.
  const newEvent = new Event({ title, description, startDateTime, endDateTime, createdBy });

  // Save the event to the database
  await newEvent.save();

  res.status(201).json({ message: 'Event registered successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

});



// Route for searching events by ID
router.get('/searchEvent/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Search for the event by its ID
    const foundEvent = await Event.findById(eventId);

    // Check if the event was found
    if (!foundEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // If the event was found, return it in the response
    res.status(200).json({ message: 'Event found', event: foundEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



//Route for editing events.
router.put('/editEvent/:eventId', async (req, res) => {
  try {

    // Capture eventId from the URL
    const eventId = req.params.eventId; 

    const { title, description, startDateTime, endDateTime } = req.body;

    const updateFields = {
      title,
      description,
      startDateTime,
      endDateTime
    }

    const editedEvent = await Event.findByIdAndUpdate(eventId, updateFields, { new: true });

    if (!editedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

      //Authenticate User
    if (req.user._id.toString() !== createdBy) {
      return res.status(403).json({message: 'You are not authorized to perform this action.'})
    }

    res.status(200).json({ message: 'Event updated successfully', updatedEvent: editedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Route for deleting events.
router.delete('/deleteEvent', async (req, res) => {
  try {
    
    //Find and delete the event.
    const eventId = req.body.eventId;
    
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    //Error if event cannot be found.
    if (!deletedEvent) {
      return res.status(404).json({message: 'Event not found'})
    }

  res.status(200).json({ message: 'Event deleted successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

});

module.exports = router;