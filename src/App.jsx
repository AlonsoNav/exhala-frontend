// React imports
import {BrowserRouter, Route, Routes} from "react-router-dom"
// Local imports
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./views/Login.jsx"
import Signup from "./views/Signup.jsx"
import Home from "./views/Home.jsx"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/login"} element={<Login/>} />
                <Route path={"/signup"} element={<Signup/>} />
                <Route path={"/"} element={<Home/>} />
            </Routes>
      </BrowserRouter>
    )
}

export default App