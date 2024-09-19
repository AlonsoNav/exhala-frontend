import { createContext, useContext, useEffect, useState } from 'react';
import { getRequest } from '../controllers/Db.jsx';
import PropTypes from "prop-types";

const AuthContext = createContext({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    setUser: () => {},
    setIsAuthenticated: () => {},
    setIsLoading: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(!isAuthenticated){
            (async () => {
                try {
                    const response = await getRequest("/validate-cookie");

                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                        setUser(null);
                    }
                } catch (error) {
                    console.error(error);
                    setIsAuthenticated(false);
                    setUser(null);
                } finally {
                    setIsLoading(false);
                }
            })();
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, setUser, setIsAuthenticated, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
