import '../App.css'
import { useNavigate } from 'react-router-dom';



export const WelcomePage = () => {
    const navigate = useNavigate();

    const handleNavigation = (isExistingUser) => {
      if (isExistingUser) {
        navigate('/login');
      } else {
        navigate('/register');
      }
    };

    return (
        <div className='WelcomePage'>
            <div className="header-logo">
              <img src={process.env.PUBLIC_URL + '/PlanPulseLogo.png'} alt="Plan Pulse Logo" className="logo-image" />
            </div>
            <h1 className='welcomeMessage'>Welcome to Plan Pulse</h1>
            <div className='welcomeUserSelectionDiv'>
                <button className='welcomeUserSelectionButton' onClick={() => handleNavigation(true)}>Existing User</button>
                <button className='welcomeUserSelectionButton' onClick={() => handleNavigation(false)}>New User</button>
            </div>
        </div>
  );
}