// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
// Local imports
import Logo from "../assets/logo.svg"
import "../styles/Style.css"
import {postRequest} from "../controllers/Db"
import ToastComponent from "../components/ToastComponent"
import {validateEmail} from "../controllers/InputValidation.jsx";
// React imports
import {useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [toast, setToast] = useState({show: false, message: ""})

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const form = e.currentTarget;
        if(form.checkValidity() === false && !validateEmail(email))
            return

        let payload = {
            username: email,
            password: password
        }

        try{
            const response = await postRequest(payload, "/login")

            if (!response){
                setToast({show: true, message: "Server error. Please try again later."})
            }
            else{
                const body = await response.json()
                if (!response.ok) {
                    setToast({show: true, message: body.detail})
                }else{
                    localStorage.setItem("toastMessage", body.message)
                    navigate('/')
                }
            }
        }catch (error){
            console.log(error)
        }
    }

    return (
        <Container fluid className={"bg-secondary rounded-4 my-2"}>
            <ToastComponent
                message={toast.message}
                show={toast.show}
                onClose={() => setToast({...toast, show: false})}
                aria-live={"assertive"}
            />
           <Row>
                <Col className={"p-4 min-width-450"}>
                    <Image src={Logo} alt={"Exhala's logo"}/>
                    <h1 className={"mb-3 h4"}>Log in to EXHALA</h1>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className={"mb-3 mx-1 text-start"} controlId="formBasicEmail">
                            <Form.Label column={true}>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email address..."
                                maxLength={100}
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label={"Email input"}
                                isInvalid={!validateEmail(email)}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please enter a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"mb-3 mx-1 text-start"} controlId="formBasicPassword">
                            <div className="d-flex justify-content-between align-items-center">
                                <Form.Label column={true}>Password</Form.Label>
                                <a href="/forgot-password" className={"text-end"}>Forgot?</a>
                            </div>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password..."
                                required
                                maxLength={16}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-label={"Password input"}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please enter your password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button type={"submit"} className={"px-5 py-1 my-3"}>Log In</Button>
                    </Form>
                    <p>Don&apos;t have an account? <Link to="/signup">SignUp</Link></p>
                </Col>
           </Row>
        </Container>
    )
}

export default Login