import './RegistrationForm.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export const RegistrationForm = ({ toggleForm }) => {

  //Setting the initial state of the registration form to empty values.
    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:''
    });

    const navigate = useNavigate();

  //Function for handling the event of the user changing the fields in the form.
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

  //Allows user to swap between login and registration forms.
    const handleNavigation = (isExistingUser) => {
        if (isExistingUser) {
          navigate('/login');
        } else {
          navigate('/register');
        }
      };
    
    //Async function for registation submission
    const handleSubmit = async (e) => {
        //Prevents user from submitting default/empty form.
        e.preventDefault();

        try {
          //POST request to the back-end register user route by using the filled out formData
          const response = await axios.post('http://localhost:5000/api/users/register', formData);
          
          //Checks if password is less than 8 characters.
          if (formData.password.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
          }

          //Console logs and alerts server response of any errors in submission.
          console.log(response.data);
          alert(response.data.message);

          //Redirect user to login if successful registration.
          window.location.replace('./login');

        } catch (error) {
          //If registration fails, alert user of the response message.
          console.error(error.response.data)
          alert(`Login failed: ${error.response.data.message}`)
        }
      };


    return (
      <div className='registrationFormContainer'>
        <div className='registrationForm'>
            <form onSubmit={handleSubmit}>
                <h1>Create a new account</h1>
                    <input
                    type='text'
                    required
                    name='username'
                    placeholder='Username'
                    value={formData.username}
                    onChange={handleChange}
                    />
                    <input
                    type='email'
                    required
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    />
                    <input
                    type='password'
                    required
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    />
                    <button type='submit' className='registrationFormRegisterButton'>Register</button>
                    <hr />
                    <button type='button' className='registrationFormExistingUserButton' onClick={() => handleNavigation(true)}>Existing User?</button>
            </form>
        </div>
      </div>
    )
}