import './CalendarView.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

export const CalendarView = () => {

  //State management of events and months
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    // Fetch user events from the backend
    axios
      .get('http://localhost:5000/api/events/myEvents', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //Get current date and put into an array of days for current month
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  
  //Function to handle navigation by month, and set array of the days of the week
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

  return (
    <div>
      <h1>CalendarView</h1>
      <div className="calendar">
        <div className="calendar-header">
          <h2>
            {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
          </h2>
          <div className="calendar-nav">
            <button onClick={navigateToPreviousMonth}>Previous Month</button>
            <button onClick={navigateToNextMonth}>Next Month</button>
          </div>
        </div>
        <div className="calendar-grid">
          {daysArray.map((day) => (
            <div key={day} className="calendar-day">
              <h2>{day}</h2>
              <span>({getDayOfWeek(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))})</span>
              <ul>
                {events
                  .filter((event) => {
                    const eventDate = new Date(event.startDateTime);
                    return (eventDate.getFullYear() === currentMonth.getFullYear() && eventDate.getMonth() === currentMonth.getMonth() && eventDate.getDate() === day );
                  })
                  .map((event) => (
                    <li key={event._id}>
                      {event.title} (
                      {`${new Date(event.startDateTime).getHours()}:${String(new Date(event.startDateTime).getMinutes()).padStart(2, '0')}`} -{' '}
                      {`${new Date(event.endDateTime).getHours()}:${String(new Date(event.endDateTime).getMinutes()).padStart(2, '0')}`})
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};