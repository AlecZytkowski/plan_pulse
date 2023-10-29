import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { WelcomePage } from './Pages/WelcomePage';
import { RegistrationForm } from './Pages/RegistrationForm';
import { LoginForm } from './Pages/LoginForm';
import { Dashboard } from './Pages/Dashboard/Dashboard';

import { ProtectedRoute } from './ProtectedRoute';


function App() {
  //State management for if existing user or not, to determine if user should go to login/registration page.
  //Setting initial state for user authentication to now allow redirects if not logged in.
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  //Allows user to toggle between login/exisiting user pages.
  const toggleForm = () => {
    setIsExistingUser((prevState) => !prevState);
  };

  //Function for retrieving user's token from sign in, and sets state to true to allow user access to different pages.
  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  };

  //useEffect hook to check if the user is authenticated and allowed to proceed to different pages.
  useEffect(() => {
    checkAuthentication();
  }, []);



  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<WelcomePage />}></Route>
            <Route path="/login" element={<LoginForm toggleForm={toggleForm} setAuthenticated={setAuthenticated} />} />
            <Route path="/register" element={<RegistrationForm toggleForm={toggleForm} />}></Route>
            <Route path="/dashboard" element={<ProtectedRoute authenticated={authenticated} redirectTo="/login" element={<Dashboard setAuthenticated={setAuthenticated} />} /> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
