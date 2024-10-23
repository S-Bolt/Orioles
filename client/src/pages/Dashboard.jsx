import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';
import { jwtDecode } from 'jwt-decode';
import logo from '../assets/BbLogo.png';
import {
  UserIcon, 
  ChatBubbleLeftRightIcon, 
  MagnifyingGlassIcon, 
  BuildingLibraryIcon, 
  UserGroupIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline'
import Account from '../components/dashboardComponents/Account';
import Messages from '../components/dashboardComponents/Messages';
import Search from '../components/dashboardComponents/Search';
import Policies from '../components/dashboardComponents/Policies';
import Support from '../components/dashboardComponents/Support';
import DashboardHome from '../components/dashboardComponents/DashboardHome';

function Dashboard() {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Track user role
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Fetch user data (from token or API)
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));

    if (token) {
      // Decode token to get user data (or make an API call)
      const userData = jwtDecode(token); // Simple JWT decode, ideally use a library
      setUsername(userData.username || '');
      setRole(userData.role || '');

      console.log('Username:', userData.username);
    } else {
      navigate('/login'); // Redirect if not logged in
    }
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Profile updated successfully');
      } else {
        setError(data.error || 'Failed to update profile');
      }
    } catch (error) {
        console.error(error)
      setError('An error occurred');
    }
  };


  return (

    <div className="dashboard h-screen w-full flex overflow-hidden  bg-gray-200">
      {/*Dashboard's Navigation */}
      <nav className=" dashboard-nav w-24 flex flex-col items-center bg-white py-4 shadow-xl">
            <div className="logo mb-6">
                <img src={logo} alt='Logo' className='w-12 h-auto'/>
            </div>
            <ul className='space-y-10'>
              <li className='flex flex-col items-center'>
                <Link to="/dashboard" className='text-gray-700 hover:text-oriolesOrange flex flex-col items-center'>
                    <BuildingLibraryIcon className="h-6 w-6 text-gray-600"/>
                    <span>Dashboard</span>
                 </Link>
              </li>
                <li className='flex flex-col items-center'>
                  <Link to='/dashboard/account' className='text-gray-700 hover:text-oriolesOrange flex flex-col items-center' >
                    <UserIcon className="h-6 w-6 text-gray-600"/>
                    <span>Account</span>
                    </Link>
                </li>
                <li className='flex flex-col items-center'> 
                  <Link to='/dashboard/messages' className='text-gray-700 hover:text-oriolesOrange flex flex-col items-center'>
                    <ChatBubbleLeftRightIcon className="h-6 w-6 text-gray-600"/>
                    <span>Messages</span>
                  </Link>
                </li>
                <li className='flex flex-col items-center'>
                  <Link to='/dashboard/search' className='text-gray-700 hover:text-oriolesOrange flex flex-col items-center'>
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-600"/>
                    <span>Search</span>
                  </Link>
                </li>
                <li className='flex flex-col items-center'>
                  <Link to='/dashboard/policies' className='text-gray-700 hover:text-oriolesOrange flex flex-col items-center'>
                      <ShieldCheckIcon className="h-6 w-6 text-gray-600"/>
                      <span>Policies</span>
                  </Link>
                </li>
                <li className='flex flex-col items-center'>
                  <Link to='/dashboard/support' className='text-gray-700 hover:text-oriolesOrange flex flex-col items-center'>
                      <UserGroupIcon className="h-6 w-6 text-gray-600"/>
                      <span>Support</span>
                  </Link>
                </li>
                
            </ul>
        </nav>
        {/* Selected Content Display */}
        <div className='flex-1 overflow-auto p-6' >
          <Routes>
            <Route path='/' element={<DashboardHome username={username} />} />
            <Route path='account' element={<Account />} />
            <Route path='messages' element={<Messages />} />
            <Route path='search' element={<Search />} />
            <Route path='policies' element={<Policies />} />
            <Route path='support' element={<Support />} />
          </Routes>
        </div>
    </div>
  );
}

export default Dashboard;
