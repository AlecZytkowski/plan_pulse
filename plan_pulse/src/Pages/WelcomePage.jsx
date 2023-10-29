import './WelcomePage.css'
import { useNavigate } from 'react-router-dom';



export const WelcomePage = () => {
    const navigate = useNavigate();

    //Allows user to navigate between login and register pages on the welcome screens.
    const handleNavigation = (isExistingUser) => {
      if (isExistingUser) {
        navigate('/login');
      } else {
        navigate('/register');
      }
    };

    return (
      <div className='WelcomePageContainer'>
        <div className='WelcomePage'>
            <div className="welcome-header-logo">
              <img src={process.env.PUBLIC_URL + '/PlanPulseLogo.png'} alt="Plan Pulse Logo" className="welcome-logo-image" />
            </div>
            <div className='welcomeUserSelectionDiv'>
                <button className='welcomeUserSelectionButton' onClick={() => handleNavigation(true)}>Existing User</button>
                <button className='welcomeUserSelectionButton' onClick={() => handleNavigation(false)}>New User</button>
            </div>
        </div>
      </div>
  );
}