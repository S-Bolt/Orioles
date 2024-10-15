/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

const AuthContext =  createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token){
            setIsAuthenticated(true);
        }
    },[]);

    //Setting authenticated conditions
    const login = (token) => {
        localStorage.setItem('token', token);
        const userData = JSON.parse(atob(token.split('.')[1]));
        setUser(userData);
        setIsAuthenticated(true);
    };

    const signup = (token) => {
        localStorage.setItem('token', token)
        const userData = JSON.parse(atob(token.split('.')[1]));
        setUser(userData);
        setIsAuthenticated(true);
        
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        setUser(null)
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout}}>
            {children}
        </AuthContext.Provider>
    );
};



export default AuthContext;