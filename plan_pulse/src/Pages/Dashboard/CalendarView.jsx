
import './CalendarView.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events/myEvents', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const navigateToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const navigateToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getDayOfWeek = (date) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        await axios.delete(`http://localhost:5000/api/events/deleteEvent/${selectedEvent._id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        const response = await axios.get('http://localhost:5000/api/events/myEvents', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setEvents(response.data);
        setSelectedEvent(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='calendar-container'>
      <div className="calendar">
        <div className="calendar-header">
          <h2>
            {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
          </h2>
          <div className="calendar-nav">
            <button className="nav-button" onClick={navigateToPreviousMonth}>
              Previous Month
            </button>
            <button className="nav-button" onClick={navigateToNextMonth}>
              Next Month
            </button>
          </div>
        </div>
        <div className="calendar-grid">
          {daysArray.map((day) => (
            <div key={day} className="calendar-day" onClick={() => handleEventClick(events[0])}>
              <h2>{day}</h2>
              <span>({getDayOfWeek(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))})</span>
              <ul>
                {events
                  .filter((event) => {
                    const eventDate = new Date(event.startDateTime);
                    return (
                      eventDate.getFullYear() === currentMonth.getFullYear() &&
                      eventDate.getMonth() === currentMonth.getMonth() &&
                      eventDate.getDate() === day
                    );
                  })
                  .map((event) => (
                    <li key={event._id} onClick={() => handleEventClick(event)}>
                      {event.title} (
                      {`${new Date(event.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`})
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {selectedEvent && (
        <div className="modal" onClick={closeEventModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div>
              <span className="close" onClick={closeEventModal}>
                &times;
              </span>
            </div>
            <div>
              <h3>{selectedEvent.title}</h3>
              <p>
                {new Date(selectedEvent.startDateTime).toLocaleString()} -{' '}
                {new Date(selectedEvent.endDateTime).toLocaleString()}
              </p>
              <p>{selectedEvent.description}</p>
              <button className="deleteEventButton" onClick={handleDeleteEvent}>
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
