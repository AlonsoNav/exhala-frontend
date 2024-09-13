import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./views/Login.jsx"
import Signup from "./views/Signup.jsx"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/login"} element={<Login/>} />
                <Route path={"/signup"} element={<Signup/>} />
            </Routes>
      </BrowserRouter>
    )
}

export default App