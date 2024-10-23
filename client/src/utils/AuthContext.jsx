import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext =  createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token){
            try {
                const userData =jwtDecode(token)
                setUser(userData)
                setIsAuthenticated(true);
            } catch (error){
                console.error('Faile to decode token', error)
                logout();
            }
            
        }
    },[]);

    //Setting authenticated conditions
    const login = (token) => {
        localStorage.setItem('token', token);
        try {
            const userData = jwtDecode(token);
            setUser(userData);
            setIsAuthenticated(true);
        } catch (error){
            console.error('Faile to decode token', error)
        }
        
    };

    const signup = (token) => {
        localStorage.setItem('token', token)
        try {
            const userData = jwtDecode(token);
            setUser(userData);
            setIsAuthenticated(true);
        } catch (error){
            console.error('Faile to decode token', error)
        }
       
        
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        setUser(null)
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout}}>
            {children}
        </AuthContext.Provider>
    );
};



export default AuthContext;