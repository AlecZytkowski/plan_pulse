import './App.css';
import { RegistrationForm } from './RegistrationForm'
import { LoginForm } from './LoginForm'
import { useState } from 'react'

function App() {
  const [isExistingUser, setIsExistingUser] = useState(false);

  const toggleForm = () => {
    setIsExistingUser((prevState) => !prevState);
  };


  return (
    <div className="App">
      {isExistingUser ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <RegistrationForm toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default App;
