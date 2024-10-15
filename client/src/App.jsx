
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './utils/AuthContext'


const App = () => {
  return (
    <>
      <AuthProvider>
         <Navbar /> 
          <Outlet />
       </AuthProvider>
    </>
  );
};

export default App;
