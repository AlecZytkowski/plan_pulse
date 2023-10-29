import './UserProfile.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const UserProfile = () => {

  //State for handling the retrieved User's information to display.
    const [userData, setUserData] = useState(null);
    //State for if user has selected to edit profile.
    const [editProfile, setEditProfile] = useState(false)

    //State for the initial values for when user edit's their profile.
    const [newProfileInformation, setNewProfileInformation] = useState({
      username:'',
      userImageUrl:'',
  })



    useEffect(() => {
    //GET request to retrieve users profile from the back-end and display to user.
    axios.get('http://localhost:5000/api/users/profile', {
      //Authentication using JWT to verify the user that logged is allowed to retrieve the information.
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
    //If successful, display the user's information.
    .then((response) => {
      setUserData(response.data.user);
    })
    //Log an error if the retrieval is unsuccesful.
    .catch((error) => {
      console.error(error);
    });
  }, []);




  //Function for changing the user's state for editing the profile or not.
  const handleEditProfile = () => {
    setEditProfile(!editProfile)
  }


  //Function for resetting state to defaults, and discarding changes made to profile.
  const handleDiscard = () => {
    setEditProfile(false)
    setNewProfileInformation({
      username:'',
      userImageUrl:'',
  })
  }


  //Async function for updating user's profile information with updated fields.
  const handleSaveProfile = async (e) => {
    //Prevent submitting default/blank values.
    e.preventDefault();

    try {
      //PUT request the submits user's updated profile information to the user's profile route on the back-end.
      const response = await axios.put(
        'http://localhost:5000/api/users/profile',
        newProfileInformation,
        {
          //Verifies the user is allowed to make changes using JWT verification.
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      
      //Log response, and alert user of success from the back-end.
      console.log(response.data);
      alert(response.data.message)

      //Renders the user's new username if changed.
      setUserData({ ...userData, username: newProfileInformation.username });

      //Resets the new profile information to defaults.
      setNewProfileInformation({
        username:'',
        userImageUrl:'',
    })
    } catch (error) {
      //Log errors from the back-end.
      console.error(error);
    }
  };



  //Function for setting the current state of the form the values the user is updating.
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