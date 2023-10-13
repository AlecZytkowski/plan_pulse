import './CreateEvent.css';

import { useState } from 'react';
import axios from 'axios';

export const CreateEvent = () => {
    const [eventData, setEventData] = useState({
      title: '',
      description: '',
      startDateTime: '',
      endDateTime: '',
    });
  
    const handleInputChange = (e) => {
      setEventData({
        ...eventData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleCreateEvent = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(
          'http://localhost:5000/api/events/createEvent',
          eventData,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
  
        console.log(response.data);
        alert(response.data.message)
  
        setEventData({
          title: '',
          description: '',
          startDateTime: '',
          endDateTime: '',
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
        <div className="create-event-container">
        <h1 className="create-event-heading">Create an Event</h1>
            <form onSubmit={handleCreateEvent} className="create-event-form">
                <div className="form-group">
                  <label className="form-label">Event Title</label>
                  <input
                      type="text"
                      className="form-input"
                      name="title"
                      value={eventData.title}
                      onChange={handleInputChange}
                      required />
                </div>
                <div className="form-group">
                  <label className="form-label">Event Description</label>
                  <textarea
                      name="description"
                      value={eventData.description}
                      onChange={handleInputChange}
                      className="form-textarea"
                      rows="4" />
                </div>
                <div className="form-group">
                  <label className="form-label">Start Date & Time</label>
                  <input
                      type="datetime-local"
                      name="startDateTime"
                      value={eventData.startDateTime}
                      onChange={handleInputChange}
                      required
                      className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date & Time</label>
                  <input
                      type="datetime-local"
                      name="endDateTime"
                      value={eventData.endDateTime}
                      onChange={handleInputChange}
                      required
                      className="form-input" />
                </div>
                <div className="form-group">
                  <button type="submit" className="create-event-button">Create Event</button>
                </div>
            </form>
        </div>
    );
  };