import { useState, useContext, useEffect } from 'react'
import AuthContext from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
   CameraIcon,
   TrashIcon,
   FingerPrintIcon,
   LockClosedIcon,
   EnvelopeIcon
  } from '@heroicons/react/24/outline'
import { API_BASE_URL } from '../config';

function Account() {
const { login, user, logout } = useContext(AuthContext); 
const navigate = useNavigate();
const [activeTab, setActiveTab] = useState('username');
const [newUsername, setNewUsername] = useState(user?.username || '');
const [newEmail, setNewEmail] = useState(user?.email || '');
const [newPassword, setNewPassword] = useState('');
const [file, setFile] = useState(null);
const [success, setSuccess] = useState('')
const [error, setError] = useState('')

  // Log user object to verify it contains the profilePicture field
  useEffect(() => {
    console.log('User Data:', user);
  }, [user]); 

//Handle the account deletion
const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/users/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if(response.ok){
            //Log user out and redirect
            logout();
            setSuccess('Goodbye Yankees fan!')
            navigate('/')
        }
    }catch (error){
        console.error(error)
        setError('An error occured while deleting account.')
    }
};

const handleChange = async (e) => {
    e.preventDefault();
    
    try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_BASE_URL}/users/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                username: newUsername,
                email: newEmail,
                password: newPassword
            }),
        });

        const data = await response.json();
        
        if(response.ok){
            //store the new token so update can take place instantly
            localStorage.setItem('token', data.token)
            login(data.token)
            setSuccess('Profle updated sucessfully!');
            setError('');
        } else {
            setError(data.error || 'Failed to update profile')
        }
    } catch (error){
        console.error('An error occured:', error);
        setError('An error occured while updating profile');
    }

    console.log('New profile submitted', newUsername, newEmail)
}

// Handle File Input Change
  const handleUploadProfilePicture = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await fetch(`${API_BASE_URL}/users/upload-profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Profile picture uploaded:', data.path);
        localStorage.setItem('token', data.token);
        login(data.token); 
        setSuccess('Profile picture uploaded successfully!');
      } else {
        setError(data.error || 'Failed to upload profile picture');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setError('An error occurred while uploading the picture.');
    }
  };

{/*Switch case to route each tab options*/}
    const navigateTabs = () => {
        return (
            <div className='flex items-center justify-center h-full'>
              <form className='space-y-4 w-full max-w-md' onSubmit={handleChange}>
                {activeTab === 'username' && (
                  <div>
                    <label htmlFor='new-username'></label>
                    <input
                      type='text'
                      id='new-username'
                      name='new-username'
                      className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-400'
                      placeholder='Enter new username'
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                  </div>
                )}
      
                {activeTab === 'email' && (
                  <div>
                    <label htmlFor='new-email'></label>
                    <input
                      type='email'
                      id='new-email'
                      name='new-email'
                      className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-400'
                      placeholder='Enter new email'
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                )}
      
                {activeTab === 'password' && (
                  <div>
                    <label htmlFor='new-password'></label>
                    <input
                      type='password'
                      id='new-password'
                      name='new-password'
                      className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-400'
                      placeholder='Enter new password'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                )}
      
                {activeTab === 'profile picture' && (
            
                  <div>
                    <label htmlFor='profile-picture'>Profile Picture</label>
                    <input
                      type='file'
                      id='profile-picture'
                      name='profile-picture'
                      accept='image/*'
                      onChange={(e) => setFile(e.target.files[0])}
                      className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-400'
                    />
                    <button
                        onClick={handleUploadProfilePicture}
                        className="bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-md py-2 px-4 mt-4 w-full"
                    >
                        Upload Picture
                    </button>
                  </div>
                 
                )}
      
                {activeTab !== 'delete account' && activeTab !== 'profile picture' &&(
                  <button
                    type='submit'
                    className='bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-md py-2 px-4 w-full'
                  >
                    Update Profile
                  </button>
                )}
      
                {/* Success/Error Messages */}
                {success && <p className='text-green-600'>{success}</p>}
                {error && <p className='text-red-600'>{error}</p>}
              </form>
      
              {/* Delete Account button */}
              {activeTab === 'delete account' && (
                <div className='text-center'>
                  <button
                    onClick={handleDeleteAccount}
                    className='bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md py-2 px-4 mt-4 w-full'
                  >
                    Delete Account
                  </button>
                  {success && <p className='text-green-600'>{success}</p>}
                  {error && <p className='text-red-600'>{error}</p>}
                </div>
              )}
            </div>
          );
        };

    return(
        <div className="container h-screen bg-white">
            <div className="account-tabs h-24 flex items-center justify-center bg-orange-400">
                <ul className=" flex  space-x-8 ">

                    {/* Each tab to click*/}
                    <li className={`flex flex-col items-center cursor-pointer ${activeTab === 'username' ? 'font-bold' : ''}`}
                         onClick={() => setActiveTab('username')}
                    >
                        <FingerPrintIcon className="h-6 w-6 text-white"/>
                        <span className='text-gray-700 hover:text-white'>Change Username</span>
                    </li>
                    <li className={`flex flex-col items-center cursor-pointer ${activeTab === 'password' ? 'font-bold' : ''}`}
                        onClick={() => setActiveTab('password')}
                    >
                        <LockClosedIcon className="h-6 w-6 text-white"/>
                        <span className='text-gray-700 hover:text-white'>Change Password</span>
                    </li>
                    <li className={`flex flex-col items-center cursor-pointer ${activeTab === 'email' ? 'font-bold' : ''}`}
                         onClick={() => setActiveTab('email')}
                    >
                        <EnvelopeIcon className="h-6 w-6 text-white"/>
                        <span className='text-gray-700 hover:text-white'>Change Email</span>
                    </li>
                    <li className={`flex flex-col items-center cursor-pointer ${activeTab === 'profile picture' ? 'font-bold' : ''}`}
                        onClick={() => setActiveTab('profile picture')}
                    >
                        <CameraIcon className="h-6 w-6 text-white"/>
                        <span className='text-gray-700 hover:text-white'>Profile Picture</span>
                    </li>
                    <li className={`flex flex-col items-center cursor-pointer ${activeTab === 'delete account' ? 'font-bold' : ''}`}
                        onClick={() => setActiveTab('delete account')}
                    > 
                        <TrashIcon className="h-6 w-6 text-white"/>
                        <span className='text-gray-700 hover:text-white'>Delete Account</span>
                    </li>
                </ul>
            </div>

            {/*Form Section */}
            <div className='grid grid-cols-2 gap-4 p-8 bg-gray-100'>
            {/*Left column for user card*/}
            <div className='bg-gray-200 p-6 rounded-lg shadow-md'>
                <div className='flex flex-col items-center'>
                  {user.profilePicture ? (
                       <img
                       className='rounded-full h-24 w-24 mb-4'
                       src={user?.profilePicture ? `http://localhost:3000/${user.profilePicture}` : 'https://via.placeholder.com/100'}
                       alt='User profile'
                   />
                  ) : (
                    <div className='h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center mb-4'>
                      <span className='text-white text-2xl font-bold'>
                        {user?.username?.charAt(0).toUpperCase() || 'G'}
                      </span>
                    </div>
                  )}
                   
                    <h2 className='text-lg font-bold'>{user?.username || 'guest' }</h2>
                    <p className='text-gray-600'>{user?.email || 'guestEmail.com' }</p>
                </div>

            </div>
            {/*Right column for forms*/}
            <div className='bg-gray-200 p-6 rounded-lg shadow-md'>
               {navigateTabs()} 
            </div>

        </div>
        </div>
    )

}

export default Account;