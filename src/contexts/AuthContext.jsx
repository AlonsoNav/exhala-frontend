import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            const userData = JSON.parse(atob(token.split('.')[1]))
            setUser(userData)
        } else {
            setUser(null)
        }
    }, [token])

    const login = (newToken) => {
        setToken(newToken)
        localStorage.setItem('token', newToken)
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
