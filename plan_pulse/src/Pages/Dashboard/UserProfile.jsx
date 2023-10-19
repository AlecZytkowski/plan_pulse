import './UserProfile.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [editProfile, setEditProfile] = useState(false)
    const [newProfileInformation, setNewProfileInformation] = useState({
      username:'',
      userImageUrl:'',
  })



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




  const handleEditProfile = () => {
    setEditProfile(!editProfile)
  }



  const handleDiscard = () => {
    setEditProfile(false)
    setNewProfileInformation({
      username:'',
      userImageUrl:'',
  })
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        'http://localhost:5000/api/users/profile',
        newProfileInformation,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );

      console.log(response.data);
      alert(response.data.message)

      setUserData({ ...userData, username: newProfileInformation.username });

      setNewProfileInformation({
        username:'',
        userImageUrl:'',
    })
    } catch (error) {
      console.error(error);
    }
  };



  const handleChange = (e) => {
    setNewProfileInformation({
        ...newProfileInformation,
        [e.target.name]: e.target.value
    })
};



    return (
        <div>
          <h1>User Profile</h1>
          {userData && (
              <div>
                <h1>Welcome {userData.username}!</h1>
                <img className='userImage' src={userData.userImageUrl} alt={userData.username}/>
                <p>Username: {userData.username}</p>
                <p>Email: {userData.email}</p>
              </div>
          )}
          <div>
            {!editProfile && (
              <button onClick={handleEditProfile}>Edit Profile</button>
            )}
            {editProfile && (
              <div>
              <hr/>
                <div>
                <form className='editProfileForm'>
                  <label>Enter a new username: </label>
                  <input
                      type='text'
                      required
                      name='username'
                      placeholder='Username'
                      value={newProfileInformation.username}
                      onChange={handleChange}
                      autoComplete='off'
                      />
                  <label>URL of your photo: </label>
                  <input
                      type='url'
                      name='userImageUrl'
                      placeholder='Enter a URL'
                      value={newProfileInformation.userImageUrl}
                      onChange={handleChange}
                      autoComplete='off'
                      />

                  <button type='submit' className='saveChangesButton' onClick={handleSaveProfile}>Save Changes</button>
                  <button className='discardChangesButton' onClick={handleDiscard}>Discard Changes</button>
                </form>
                </div>
              </div>
            )}
            
          </div>
        </div>
      )
}