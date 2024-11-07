// Styles imports
import "../styles/Style.css"
// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
// Local imports
import {useAuth} from "../contexts/AuthContext.jsx"
// React imports
import {useState} from "react"

const Settings = () => {
    return (
        <Container fluid className={"margin-header text-start"}>
            <Row className={"my-3 px-3"}>
                <Col>
                    <h1 className={"h2"}>Settings and Preferences</h1>
                </Col>
            </Row>
            <Row className={"mb-3 px-3"}>
                <Col>
                    <h2 className={"h5"}>Privacy Settings</h2>
                    <Row className={"bg-tertiary mt-3 mx-1 px-2 py-3 d-flex flex-row align-items-center"}>
                        <Col className={"flex-grow-1"}>
                            <h3 className={"h6 m-0"}>Show Name to Psychologist</h3>
                            <p className={"m-0 text-muted"}>Only initials or a pseudonym are shown.</p>
                        </Col>
                        <Col className={"col-auto mt-3 mt-md-0 align-self-sm-center align-self-start"}>
                            <Form.Check type={"switch"} id={"account-settings"} className={"custom-switch"}/>
                        </Col>
                    </Row>
                    <Row className={"bg-tertiary mx-1 px-2 py-3 d-flex flex-row align-items-center"}>
                        <Col className={"flex-grow-1"}>
                            <h3 className={"h6 m-0"}>Share Personal Information</h3>
                        </Col>
                        <Col className={"col-auto mt-3 mt-md-0 align-self-sm-center align-self-start"}>
                            <Form.Check type={"switch"} id={"account-settings"} className={"custom-switch"}/>
                        </Col>
                    </Row>
                    <Row className={"bg-tertiary mx-1 px-2 py-3 d-flex flex-row align-items-center"}>
                        <Col className={"flex-grow-1"}>
                            <h3 className={"h6 m-0"}>Anonymous Feedback</h3>
                        </Col>
                        <Col className={"col-auto mt-3 mt-md-0 align-self-sm-center align-self-start"}>
                            <Form.Check type={"switch"} id={"account-settings"} className={"custom-switch"}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className={"mb-3 px-3"}>
                <Col>
                    <h2 className={"h5"}>Notification Settings</h2>
                    <Row className={"bg-tertiary mt-3 mx-1 px-2 py-3 d-flex flex-row align-items-center"}>
                        <Col className={"flex-grow-1"}>
                            <h3 className={"h6 m-0"}>Session Reminders</h3>
                        </Col>
                        <Col className={"col-auto mt-3 mt-md-0 align-self-sm-center align-self-start"}>
                            <Form.Check type={"switch"} id={"account-settings"} className={"custom-switch"}/>
                        </Col>
                    </Row>
                    <Row className={"bg-tertiary mx-1 px-2 py-3 d-flex flex-row align-items-center"}>
                        <Col className={"flex-grow-1"}>
                            <h3 className={"h6 m-0"}>General Updates</h3>
                        </Col>
                        <Col className={"col-auto mt-3 mt-md-0 align-self-sm-center align-self-start"}>
                            <Form.Check type={"switch"} id={"account-settings"} className={"custom-switch"}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className={"mb-3 px-3"}>
                <Col>
                    <h2 className={"h5"}>Data Management</h2>
                    <Row className={"bg-tertiary mt-3 mx-1 px-2 py-3 d-flex flex-column flex-md-row align-items-center"}>
                        <Col className={"flex-grow-1"}>
                            <h3 className={"h6 m-0"}>Delete Account</h3>
                        </Col>
                        <Col className={"col-auto mt-3 mt-md-0 align-self-sm-center align-self-start"}>
                            <Button className={"rounded-4"} variant={"danger"} style={{ minWidth: "210px" }}>Delete Account</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Settings