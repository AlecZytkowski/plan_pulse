import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const RegistrationForm = ({ toggleForm }) => {
    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleNavigation = (isExistingUser) => {
        if (isExistingUser) {
          navigate('/login');
        } else {
          navigate('/register');
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/users/register', formData);

          console.log(response.data);

          alert(response.data.message);

          window.location.replace('./login');

        } catch (error) {
          console.error('Registration failed:', error);

          alert('Registration failed:', error);
        }
      };


    return (
        <div className='registrationForm'>
            <form onSubmit={handleSubmit}>
                <h1>Create a new account</h1>
                    <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={formData.username}
                    onChange={handleChange}
                    />
                    <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    />
                    <input
                    type='password'
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
    )
}