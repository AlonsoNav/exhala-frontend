import { createContext, useContext, useEffect, useState } from 'react'
import {getRequest, postRequest} from '../controllers/Db.jsx'
import PropTypes from "prop-types"

const AuthContext = createContext({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    setUser: () => {},
    setIsAuthenticated: () => {},
    setIsLoading: () => {},
    logout: () => {},
})

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (!isAuthenticated) {
            getRequest("/validate-cookie")
                .then((response) => {
                    if (response.ok) {
                        return response.json().then((userData) => {
                            setUser(userData)
                            setIsAuthenticated(true)
                        })
                    } else {
                        setIsAuthenticated(false)
                        setUser(null)
                    }
                })
                .catch((error) => {
                    console.error(error)
                    setIsAuthenticated(false)
                    setUser(null)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [isAuthenticated])

    const logout = () => {
        postRequest({}, "/logout")
            .then((response) => {
                if (response.ok) {
                    setUser(null)
                    setIsAuthenticated(false)
                    localStorage.setItem("logoutResult", "s")
                }
            })
            .catch((error) => {
                console.error("Error logging out:", error)
            })
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, setUser, setIsAuthenticated, setIsLoading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const useAuth = () => useContext(AuthContext)