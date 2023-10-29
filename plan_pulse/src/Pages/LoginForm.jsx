import './LoginForm.css';
import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export const LoginForm = ({ toggleForm, setAuthenticated }) => {

    //Initial state values of the Login form, and sets them to empty values.
    const [formData, setFormData] = useState ({
        email:'',
        password: '',
    })

    const navigate = useNavigate();

    //Function for handling the event of the user changing the fields in the login form.
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    //Allows user to swap between login and registration forms.
    const handleNavigation = (isExistingUser) => {
        if (isExistingUser) {
          navigate('/login');
        } else {
          navigate('/register');
        }
      };
    
    //Async function for handling the submission of the Login form.
    const handleSubmit = async (e) => {
        //Prevents user from submitting default/empty form.
        e.preventDefault();
        //Checks if password is less than 8 characters.
        if (formData.password.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
          }
        
        try {
            //POST request to the back-end's login route by using the user's submitted formData
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            
            //Destructuring token from the POST Request response.
            const { token } = response.data;
            
            //Store's the user's JWT token in the browser's local storage and assigns it to token.
            localStorage.setItem('token', token);

            //Sets user's authentication state to true, allowing them to access the Dashboard and other components.
            setAuthenticated(true);

            //Redirect user to the Dashboard component.
            navigate('/dashboard');
            
        } catch (error) {
            //If error is recieved during login, prevents unauthorized user to access dashboard.
            setAuthenticated(false);

            //Alert user to failed login, and log the error.
            alert(`Login failed: ${error.response.data.message}`)
            console.error(error.response.data)
        }
    }

    return (
        <div className='loginFormContainer'>
            <div className='loginForm'>
                <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                    <input 
                    type='email' required
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
                    <button type="submit" className='loginFormLoginButton'>Log In</button>
                    <hr />
                    <button type='button' className='loginFormRegistrationButton' onClick={() => handleNavigation(false)}>Create a New Account</button>
                </form>
            </div>
        </div>
    )
}