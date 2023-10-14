import './Dashboard.css';

import { useState } from 'react';

import { UserProfile } from './UserProfile';
import { CalendarView } from './CalendarView';
import { CreateEvent } from './CreateEvent';

export const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('calendar');

  //Logout - Removes token and redirects to login page
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-container">
      <div className="header-logo">
        <img src={process.env.PUBLIC_URL + '/PlanPulseLogo.png'} alt="Plan Pulse Logo" className="logo-image" />
      </div>
      <nav className="navbar">
        <ul>
          <li onClick={() => setSelectedOption('calendar')}>Calendar</li>
          <li onClick={() => setSelectedOption('create-event')}>Create Event</li>
          <li onClick={() => setSelectedOption('profile')}>User Profile</li>
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