import React, {useState} from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginForm = ({ toggleForm }) => {
    const [formData, setFormData] = useState ({
        email:'',
        password: '',
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

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
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            window.location.replace('./dashboard');
        } catch (error) {
            console.error(error.response.data)
        }
    }

    return (
        <div className='loginForm'>
            <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
                <button type="submit" className='loginFormLoginButton'>Log In</button>
                <hr />
                <button type='button' className='loginFormRegistrationButton' onClick={() => handleNavigation(false)}>Create a New Account</button>
            </form>
        </div>
    )
}