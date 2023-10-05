import './Dashboard.css';
import { UserProfile } from './UserProfile';
import { CalenderView } from './CalenderView';
import { CreateEvent } from './CreateEvent';

export const Dashboard = () => {
    return (
      <div>
        <h1>Welcome to the Dashboard</h1>
        <UserProfile />
        <CreateEvent />
        <CalenderView />
      </div>
    );
  };