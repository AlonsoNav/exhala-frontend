// Styles imports
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
// React imports
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
// Local imports
import Login from "./views/Login.jsx"
import Signup from "./views/Signup.jsx"
import Home from "./views/Home.jsx"
import Profile from "./views/Profile.jsx"
import Header from "./components/Header.jsx"
import Settings from "./views/Settings.jsx";
import {AuthProvider, useAuth} from "./contexts/AuthContext.jsx"
import AppointmentsScreen from "./views/Appointment.jsx"
import TasksScreen from "./views/Tasks.jsx"
import SessionDetailsPage from "./views/SessionDetails.jsx"
import PropTypes from "prop-types"
import BookAppointment from "./views/BookAppointment.jsx"
import SessionDetailsAdmin from "./views/SessionDetailsAdmin.jsx"
import Psychologist from "./views/Psychologist.jsx"

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
                    <Route path={"/book-appointment"} element={<ProtectedRoute>{renderWithHeader(BookAppointment)}</ProtectedRoute>} />
                    <Route path={"/"} element={<ProtectedRoute>{renderWithHeader(Home)}</ProtectedRoute>} />
                    <Route path={"/profile"} element={<ProtectedRoute>{renderWithHeader(Profile)}</ProtectedRoute>} />
                    <Route path={"/settings"} element={<ProtectedRoute>{renderWithHeader(Settings)}</ProtectedRoute>} />
                    <Route path={"/appointments"} element={<ProtectedRoute>{renderWithHeader(AppointmentsScreen)}</ProtectedRoute>} />
                    <Route path={"/tasks"} element={<ProtectedRoute>{renderWithHeader(TasksScreen)}</ProtectedRoute>} />
                    <Route path={"/session-details"} element={<ProtectedRoute>{renderWithHeader(SessionDetailsPage)}</ProtectedRoute>} />
                    <Route path={"/session-details-admin"} element={<ProtectedRoute>{renderWithHeader(SessionDetailsAdmin)}</ProtectedRoute>} />
                    <Route path={"/psychologist/:id"} element={<ProtectedRoute>{renderWithHeader(Psychologist)}</ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App