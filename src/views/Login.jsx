import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Logo from "../assets/logo.svg"
import "../styles/Style.css"
import "../styles/Login.css"
import {useState} from "react";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Container fluid className={"bg-secondary rounded-4"}>
           <Row>
                <Col className={"p-4 min-width-450"}>
                    <Image src={Logo} alt={"Exhala's logo"}/>
                    <h1 className={"mb-3 h4"}>Log in to EXHALA</h1>
                    <Form noValidate>
                        <Form.Group className={"mb-3 mx-1 text-start"} controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email..."
                                maxLength={100}
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please enter a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"mb-3 mx-1 text-start"} controlId="formBasicPassword">
                            <div className="d-flex justify-content-between align-items-center">
                                <Form.Label>Password</Form.Label>
                                <a href="/forgot-password" className={"text-end"}>Forgot?</a>
                            </div>
                            <Form.Control
                                type="password"
                                placeholder="Enter password..."
                                required
                                maxLength={16}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please enter your password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className={"px-5 py-1 my-3"}>Log In</Button>
                    </Form>
                    <p>Don't have an account? <a href="/signup">SignUp</a></p>
                </Col>
           </Row>
        </Container>
    )
}

export default Login