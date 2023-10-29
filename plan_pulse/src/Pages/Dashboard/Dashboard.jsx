import './Dashboard.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { UserProfile } from './UserProfile';
import { CalendarView } from './CalendarView';
import { CreateEvent } from './CreateEvent';

export const Dashboard = ({ setAuthenticated }) => {
  //Initial state/view on the dashboard is the calendar, and render's the logged in user's calendar.
  const [selectedOption, setSelectedOption] = useState('calendar');
  
  //State for tracking the currently logged in user's information for rendering.
  const [userData, setUserData] = useState({});

  //Logout function. Removes token and redirects to login page.
  const handleLogout = () => {
    //Removes the user's stored JWT Token from browser memory.
    localStorage.removeItem('token');

    //Sets user's authentication state to false, disallowing them to view the dashboard and other components.
    setAuthenticated(false);

    //Redirects user to the login screen.
    window.location.href = '/login';
  };

  useEffect(() => {
    //GET request to the backend to retrieve logged in user's profile information for display.
    axios.get('http://localhost:5000/api/users/profile', {
      //Verifies the user is allowed to view information using JWT verification.
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
    //If user information is found, sets the user's date to the information retrieved from the GET request.
    .then((response) => {
      setUserData(response.data.user);
    })
    //If there is an error, log the error to the console.
    .catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-logo">
        <img src={process.env.PUBLIC_URL + '/PlanPulseLogo.png'} alt="Plan Pulse Logo" className="logo-image" />
      </div>
      <nav className="navbar">
        <ul>
          <li onClick={() => setSelectedOption('calendar')}>Calendar</li>
          <li onClick={() => setSelectedOption('create-event')}>Create Event</li>
          <li  onClick={() => setSelectedOption('profile')} className='currentUser'> {userData.username} <img className="userLogo" src={userData.userImageUrl} alt='User Icon'></img></li>
          <li className="logoutButton" onClick={() => handleLogout()}>Log Out</li>
        </ul>
      </nav>

      <div className="dashboard-content">
        {selectedOption === 'calendar' && <CalendarView />}
        {selectedOption === 'create-event' && <CreateEvent />}
        {selectedOption === 'profile' && <UserProfile />}
      </div>
    </div>
  );
};