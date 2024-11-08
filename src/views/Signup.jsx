// Styles imports
import "../styles/Style.css"
// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
// Local imports
import Logo from "../assets/logo.svg"
import ToastComponent from "../components/ToastComponent.jsx"
import {validateEmail} from "../controllers/InputValidation.jsx"
import {postRequest} from "../controllers/Db.jsx"
import {useAuth} from "../contexts/AuthContext"
// React imports
import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"

const Signup = () => {
    const navigate = useNavigate()
    const {setUser, setIsAuthenticated, setIsLoading} = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatedPassword, setRepeatedPassword] = useState("")
    const [type, setType] = useState(false) // False for psychologist, true for patient
    const [toast, setToast] = useState({show: false, message: ""})

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const form = e.currentTarget
        if(form.checkValidity() === false || !validateEmail(email) || password !== repeatedPassword)
            return

        let payload = {
            name: name,
            email: email,
            password: password,
            type: type
        }

        postRequest(payload, "/signup")
        .then((response) => {
            if (!response) {
                setToast({ show: true, message: "Server error. Please try again later." })
                return Promise.reject("No response from server")
            }
            return response.json().then((body) => {
                if (!response.ok) {
                    setToast({ show: true, message: body.detail })
                    return Promise.reject(body.detail)
                } else {
                    setUser(body.user)
                    setIsAuthenticated(true)
                    setIsLoading(false)
                    localStorage.setItem("toastMessage", body.message)
                    navigate('/')
                }
            })
        })
        .catch((error) => {
            console.error("Error:", error)
        })
    }

    return (
        <Container fluid className={"bg-secondary rounded-4 my-2"}>
            <ToastComponent
                message={toast.message}
                show={toast.show}
                onClose={() => setToast({...toast, show: false})}
            />
            <Row>
                <Col className={"p-4 min-width-450"}>
                    <Image fluid src={Logo} alt={"Exhala's logo"} className={"w-50"}/>
                    <h1 className={"mb-3 h4"}>Sign up to EXHALA</h1>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className={"mb-3 mx-1 text-start"} controlId={"formBasicName"}>
                            <Form.Label column={true}>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name..."
                                maxLength={50}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                aria-label={"Name input"}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please enter your full name.
                            </Form.Control.Feedback>
                        </Form.Group>
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
                            <Form.Label column={true}>Password</Form.Label>
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
                        <Form.Group className={"mb-3 mx-1 text-start"} controlId="formBasicRepeatedPassword">
                            <Form.Label column={true}>Repeat Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Repeat your password..."
                                required
                                maxLength={16}
                                value={repeatedPassword}
                                onChange={(e) => setRepeatedPassword(e.target.value)}
                                aria-label={"Confirm your password input"}
                                isInvalid={password !== repeatedPassword}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Your password must match.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"mx-1 d-flex align-items-center justify-content-center"}>
                            <span className={"me-2"}>Psychologist</span>
                            <Form.Check
                                type="switch"
                                className={"custom-switch"}
                                checked={type}
                                onChange={() => setType(!type)}
                            />
                            <span className={"ms-2"}>Patient</span>
                        </Form.Group>
                        <Button type={"submit"} className={"px-5 py-1 my-3"}>Create Account</Button>
                    </Form>
                    <p>Already have an account? <Link to="/login">LogIn</Link></p>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup