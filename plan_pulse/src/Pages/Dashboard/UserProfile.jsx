import './UserProfile.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const UserProfile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
    
    axios.get('http://localhost:5000/api/users/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
        <div>
          <h1>User Profile</h1>
          {userData && (
            <div>
              <p>Username: {userData.username}</p>
              <p>Email: {userData.email}</p>
            </div>
          )}
        </div>
      )
}