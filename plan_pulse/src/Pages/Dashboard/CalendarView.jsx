
import './CalendarView.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const CalendarView = () => {
  //State for handling the list of current events for the logged in user. Set to an empty array intially.
  const [events, setEvents] = useState([]);
  //State for setting the currently selected month, sets the initial value to the current month.
  const [currentMonth, setCurrentMonth] = useState(new Date());
  //State for tracking when user selects an event. Used for opening the modal of the currently selected event.
  const [selectedEvent, setSelectedEvent] = useState(null);

  //useEffect to call the function on the intial render.
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        //GET Request to the back-end for retrieving the user's events.
        const response = await axios.get('http://localhost:5000/api/events/myEvents', {
          //Verifies the user is authorized to retrieve their events using JWT.
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        //Set's the state of the user's current events to what is recieved from the server.
        setEvents(response.data);

        //Log if there is an error in retrieving the data.
      } catch (error) {
        console.error(error);
      }
    };
    //Call the function on render.
    fetchEvents();
  }, []);

  //Variable for tracking the number of days in a given month, using the Date contructor.
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  //Put the days of the month into an array to create an iterable object for each day.
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  //Function for setting the current month state to the previous month.
  const navigateToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  //Function for setting the current month state to the next month.
  const navigateToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  //Function for ensuring the calendar has the correct day of the week for every day in the month.
  const getDayOfWeek = (date) => {
    //Array variable for each day of the week.
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //Returns the value ('Sun', 'Mon', Etc..) of each day in the month.
    return daysOfWeek[date.getDay()];
  };

  //Function for handling a user selecting a given event, and sets the state of the currently selecting event to the event selected.
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  //De-Selects any selected events and closes the modal on the screen.
  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  //Async function for deleting a selected event on the calendar.
  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        //DELETE request to the back-end, and passes the currently selected Event ID so it knows which event you are specifically deleting.
        await axios.delete(`http://localhost:5000/api/events/deleteEvent/${selectedEvent._id}`, {
          //JWT used to verify the user is authorized to delete the given event.
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        //GET request to re-render the list of user's current events after deletion.
        const response = await axios.get('http://localhost:5000/api/events/myEvents', {
          //JWT verification.
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        //Sets the user's current events again to the updated information after an event is deleted.
        setEvents(response.data);
        //De-selects the event if the event is deleted and modal closes.
        setSelectedEvent(null);
      } catch (error) {
        //Log to console if there is an error.
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
