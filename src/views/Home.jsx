// Bootstrap imports
import Container from "react-bootstrap/Container"
// Local imports
import '../styles/Style.css'
import ToastComponent from "../components/ToastComponent.jsx";
// React imports
import {useState, useEffect} from "react";

const Home = () => {
    const [toast, setToast] = useState({show: false, message: "", bg:"danger"})

    useEffect(() => {
        const message = localStorage.getItem("toastMessage")
        if(message){
            setToast({show: true, message: message, bg: "info"})
            localStorage.removeItem("toastMessage")
        }
    }, []);


    return (
        <Container fluid>
            <ToastComponent
                message={toast.message}
                show={toast.show}
                bg={toast.bg}
                onClose={() => setToast({...toast, show: false})}
            />
            <h1>Welcome to the Home Page</h1>
        </Container>
    )
}

export default Home