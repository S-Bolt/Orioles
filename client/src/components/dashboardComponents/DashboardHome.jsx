import { useContext } from 'react';
import AuthContext from '../../utils/AuthContext';


// eslint-disable-next-line react/prop-types
function DashboardHome() {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-8 bg-gray-100 h-full">
      <div className="bg-white shadow-lg rounded-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome back, {user?.username}!</h1>
        <p className="text-gray-600">Here’s a summary of your recent activity and what’s happening in the community.</p>
      </div>
      
     
    </div>
  );
}

export default DashboardHome;
