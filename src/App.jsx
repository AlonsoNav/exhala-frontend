// React imports
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
// Local imports
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./views/Login.jsx"
import Signup from "./views/Signup.jsx"
import Home from "./views/Home.jsx"
import {AuthProvider, useAuth} from "./contexts/AuthContext.jsx"
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        localStorage.setItem("toastMessage", "You need to be logged to access this page.");
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<Login/>} />
                    <Route path={"/signup"} element={<Signup/>} />
                    <Route path={"/"} element={<ProtectedRoute><Home/></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App