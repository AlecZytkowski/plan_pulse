import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { WelcomePage } from './Pages/WelcomePage';
import { RegistrationForm } from './Pages/RegistrationForm';
import { LoginForm } from './Pages/LoginForm';
import { Dashboard } from './Pages/Dashboard/Dashboard';

import { ProtectedRoute } from './ProtectedRoute';


function App() {
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const toggleForm = () => {
    setIsExistingUser((prevState) => !prevState);
  };

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  };

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
