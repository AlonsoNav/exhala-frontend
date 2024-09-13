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
// React imports
import {useState} from "react";
import {Link} from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatedPassword, setRepeatedPassword] = useState("")
    const [type, setType] = useState(false) // False for psychologist, true for patient

    return (
        <Container fluid className={"bg-secondary rounded-4 my-2"}>
            <Row>
                <Col className={"p-4 min-width-450"}>
                    <Image fluid src={Logo} alt={"Exhala's logo"} className={"w-50"}/>
                    <h1 className={"mb-3 h4"}>Sign up to EXHALA</h1>
                    <Form noValidate>
                        <Form.Group className={"mb-3 mx-1 text-start"} controlId={"formBasicName"}>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name..."
                                maxLength={100}
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
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email address..."
                                maxLength={100}
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label={"Email input"}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please enter a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"mb-3 mx-1 text-start"} controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
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
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Repeat your password..."
                                required
                                maxLength={16}
                                value={repeatedPassword}
                                onChange={(e) => setRepeatedPassword(e.target.value)}
                                aria-label={"Password input"}
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