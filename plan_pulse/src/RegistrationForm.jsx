import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

export const RegistrationForm = ({ toggleForm }) => {
    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('./api/users/register', formData);
            console.log(response.data)
        } catch (error) {
            console.error(error.response.data)
        }
    }


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
                    <button
                        type='button'
                        className='registrationFormExistingUserButton'
                        onClick={toggleForm}>
                        Existing User?
                    </button>
            </form>
        </div>
    )
}