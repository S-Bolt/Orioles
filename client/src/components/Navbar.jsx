import { Link } from 'react-router-dom';
import { useContext } from 'react';
import logo from '../assets/BbLogo.png';  
import AuthContext from '../utils/AuthContext';

function Navbar() {
 const { isAuthenticated, logout} = useContext(AuthContext)
  

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="MyWebsite Logo" className="h-16 w-auto" />
          </Link>
        </div>

        {/* Center: Website Title */}
        <div className="text-white text-4xl font-bold">
         
        </div>

        {/* Right: Navbar Links */}
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-white hover:text-oriolesOrange">
            Home
          </Link>
          <Link to="/blog" className="text-white hover:text-oriolesOrange">
            Bird Blog
          </Link>
          <Link to="/forum" className="text-white hover:text-oriolesOrange">
            Forum
          </Link>

          {/* Conditional rendering based on login state */}
          {isAuthenticated ? (
            <>
            <button
              onClick={logout}
              className="text-white hover:text-oriolesOrange"
             >
                Logout
              </button>
              <Link to="/dashboard" className="text-white hover:text-oriolesOrange">
                Dashboard
              </Link>
            </>
          ): (
            <>
              <Link to="/login" className="text-white hover:text-oriolesOrange">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-oriolesOrange">
                Signup
              </Link>
            </>
          )}
      
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
