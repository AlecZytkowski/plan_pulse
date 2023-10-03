const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Add more fields as needed for event data
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;