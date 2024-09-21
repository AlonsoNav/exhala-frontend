// Styles imports
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
// React imports
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
// Local imports
import Login from "./views/Login.jsx"
import Signup from "./views/Signup.jsx"
import Home from "./views/Home.jsx"
import Header from "./components/Header.jsx"
import {AuthProvider, useAuth} from "./contexts/AuthContext.jsx"
import PropTypes from "prop-types"

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        localStorage.setItem("toastMessage", "You need to be logged to access this page.")
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

const renderWithHeader = (Component) => (
    <div className="d-flex flex-column min-vw-99 min-vh-100">
        <Header className="sticky-top"/>
        <Component/>
    </div>
)

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<Login/>} />
                    <Route path={"/signup"} element={<Signup/>} />
                    <Route path={"/"} element={<ProtectedRoute>{renderWithHeader(Home)}</ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App