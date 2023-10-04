import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import { WelcomePage } from './Pages/WelcomePage';
import { RegistrationForm } from './Pages/RegistrationForm';
import { LoginForm } from './Pages/LoginForm';
import { Dashboard } from './Pages/Dashboard'; 



function App() {
  const [isExistingUser, setIsExistingUser] = useState(false);

  const toggleForm = () => {
    setIsExistingUser((prevState) => !prevState);
  };


  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<WelcomePage />}></Route>
            <Route path="/login" element={<LoginForm toggleForm={toggleForm} />}></Route>
            <Route path="/register" element={<RegistrationForm toggleForm={toggleForm} />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
