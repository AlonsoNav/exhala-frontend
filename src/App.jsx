import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./views/Login.jsx"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
            </Routes>
      </BrowserRouter>
    )
}

export default App
