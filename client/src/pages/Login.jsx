import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/BbLogo.png'
import AuthContext from '../utils/AuthContext';
import { API_BASE_URL } from '../config';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try{
      const response = await fetch('${API_BASE_URL}/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  username, password }),
      });

      const data = await response.json();

      if(response.ok){
        //call login funtion from AuthContext if login is sucessfull to update isAuthenticated
        login(data.token)
        console.log(localStorage.getItem('token'));

        //navigate to dashbord
        navigate('/');
      } else {
        setError(data.error || 'login failed');
      }
    } catch (error) {
      console.error({error: 'error occured', details: error.message})
      setError('Error occured during login')
    }
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src={logo}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-oriolesOrange"
              autoComplete="off"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-oriolesOrange"
              autoComplete="off"
              required
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-blue-500"
            />
            <label htmlFor="remember" className="text-gray-600 ml-2">
              Remember Me
            </label>
          </div>

          {/* Forgot Password Link */}
          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="bg-oriolesOrange hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
           Login
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-blue-500 text-center">
          <a href="/Signup" className="hover:underline">
            Sign up Here
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
