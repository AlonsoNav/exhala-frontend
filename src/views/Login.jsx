// Styles imports
import "../styles/Style.css"
// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
// Local imports
import Logo from "../assets/logo.svg"
import {postEncodedRequest, postRequest} from "../controllers/Db"
import ToastComponent from "../components/ToastComponent"
import {validateEmail} from "../controllers/InputValidation.jsx"
import {useAuth} from "../contexts/AuthContext"
// React imports
import {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const {setUser, setIsLoading, setIsAuthenticated} = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatedPassword, setRepeatedPassword] = useState("")
    const [code, setCode] = useState("")
    const [toast, setToast] = useState({show: false, message: "", bg: "danger"})
    const [showForgotPwdModal, setShowForgotPwdModal] = useState(false)
    const [showResetPwdModal, setShowResetPwdModal] = useState(false)

    useEffect(() => {
        const message = localStorage.getItem("toastMessage")
        if (message) {
            setToast({show: true, message: message, bg: "danger"})
            localStorage.removeItem("toastMessage")
        }
    }, [])

    const handleForgotPwd = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const form = e.currentTarget
        if(form.checkValidity() === false || !validateEmail(email))
            return

        let payload = {
            email: email
        }

        try{
            const response = await postRequest(payload, "/forgot-password")

            if (!response){
                setToast({show: true, message: "Server error. Please try again later.", bg: "danger"})
            }
            else{
                const body = await response.json()
                if (!response.ok)
                    setToast({show: true, message: body.detail, bg: "danger"})
                else {
                    setToast({show: true, message: body.message, bg: "info"})
                    setShowForgotPwdModal(false)
                    setShowResetPwdModal(true)
                }
            }
        }catch (error){
            console.log(error)
        }
    }

    const handleResetPwd = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const form = e.currentTarget
        if(form.checkValidity() === false || password !== repeatedPassword)
            return

        let payload = {
            email: email,
            code: code,
            password: password
        }

        try{
            const response = await postRequest(payload, "/reset-password")

            if (!response){
                setToast({show: true, message: "Server error. Please try again later.", bg: "danger"})
            }
            else{
                const body = await response.json()
                if (!response.ok)
                    setToast({show: true, message: body.detail, bg: "danger"})
                else {
                    setToast({show: true, message: body.message, bg: "info"})
                    setShowResetPwdModal(false)
                }
            }
        }catch (error){
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const form = e.currentTarget
        if(form.checkValidity() === false || !validateEmail(email))
            return

        let payload = {
            username: email,
            password: password
        }

        try{
            const response = await postEncodedRequest(payload, "/login")

            if (!response){
                setToast({show: true, message: "Server error. Please try again later.", bg: "danger"})
            }
            else{
                const body = await response.json()
                if (!response.ok) {
                    setToast({show: true, message: body.detail, bg: "danger"})
                }else{
                    setUser(body.user)
                    setIsAuthenticated(true)
                    setIsLoading(false)
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
                bg={toast.bg}
            />
            <Modal show={showResetPwdModal} onHide={() => setShowResetPwdModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Recover password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={handleResetPwd}>
                        <Row>
                            <Col>
                                <Form.Group className={"mb-3 mx-1 text-start"} controlId="formBasicCode">
                                    <Form.Label column={true}>Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter the code you received..."
                                        maxLength={6}
                                        required
                                        aria-label={"Code input"}
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Please enter the code you received.
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
                            </Col>
                        </Row>
                        <div className={"text-end"}>
                            <button type="submit" className={"btn btn-primary mt-5"}>Send code</button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showForgotPwdModal} onHide={() => setShowForgotPwdModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={handleForgotPwd}>
                        <Row>
                            <Col>
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
                            </Col>
                        </Row>
                        <div className={"text-end"}>
                            <button type="submit" className={"btn btn-primary mt-5"}>Send code</button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
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
                                <a onClick={()=> setShowForgotPwdModal(true)} className={"text-end"}>Forgot?</a>
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