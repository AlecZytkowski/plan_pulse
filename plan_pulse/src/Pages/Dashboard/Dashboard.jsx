import './Dashboard.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { UserProfile } from './UserProfile';
import { CalendarView } from './CalendarView';
import { CreateEvent } from './CreateEvent';

export const Dashboard = ({ setAuthenticated }) => {
  const [selectedOption, setSelectedOption] = useState('calendar');
  const [userData, setUserData] = useState({
    
  });

  //Logout - Removes token and redirects to login page
  const handleLogout = () => {
    localStorage.removeItem('token');

    setAuthenticated(false);

    window.location.href = '/login';
  };

  useEffect(() => {
    
    axios.get('http://localhost:5000/api/users/profile', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
    .then((response) => {
      setUserData(response.data.user);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="header-logo">
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