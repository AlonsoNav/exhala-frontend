import "../styles/Header.css"
import "../styles/Style.css"
import {useAuth} from "../contexts/AuthContext.jsx"
import Logo from "../assets/logo.svg"
import ProfileIcon from "../assets/profile.svg"
import {useNavigate, useLocation} from "react-router-dom";
import {useState} from "react";
// Bootstrap imports
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Offcanvas from "react-bootstrap/Offcanvas";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faHome, faCheckCircle, faCalendarAlt, faUser, faCog} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {user} = useAuth()
    const [show, setShow] = useState(false)

    return(
        <>
            <Navbar className={"bg-white position-fixed top-0 start-0 w-100 fixed-top shadow-sm"} style={{minHeight:"76px"}}>
                <Navbar.Brand className={"d-flex align-items-center p-0 w-auto"}>
                    <Image alt={"Exhala's logo"} src={Logo} className={"w-50"} onClick={() => navigate("/")}/>
                    <FontAwesomeIcon icon={faBars} className={"clickable-icon"} onClick={() => setShow(!show)}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center me-2">
                        <Image
                            src={user.image || ProfileIcon}
                            roundedCircle
                            alt={"Profile image"}
                            style={{maxWidth: "45px", maxHeight: "45px"}}
                        />
                        <div className={"d-flex flex-column text-start d-none d-md-flex"}>
                            <Nav.Link className={"py-0 fs-6"} onClick={() => navigate("/profile")}>Profile</Nav.Link>
                            <Nav.Link className={"py-0 fs-6"} onClick={() => navigate("/settings")}>Settings</Nav.Link>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Offcanvas
                show={show}
                onHide={() => setShow(false)}
                placement={"start"}
                className={"bg-white offcanvas-shadow offcanvas-custom margin-header"}
                backdrop={false}
                scroll={true}
            >
                <Offcanvas.Body>
                    <Nav className={"d-flex flex-column"}>
                        <Nav.Link onClick={() => navigate("/")}
                                  className={`py-3 ${location.pathname === "/" ? "active" : ""}`}>
                            <FontAwesomeIcon icon={faHome} className={"me-2"}/> Home
                        </Nav.Link>
                        <Nav.Link onClick={() => navigate("/tasks")}
                                  className={`py-3 ${location.pathname === "/tasks" ? "active" : ""}`}>
                            <FontAwesomeIcon icon={faCheckCircle} className={"me-2"}/> Tasks
                        </Nav.Link>
                        <Nav.Link onClick={() => navigate("/appointments")}
                            className={`py-3 ${location.pathname === "/appointments" ? "active" : ""}`}>
                            <FontAwesomeIcon icon={faCalendarAlt} className={"me-2"}/> Appointments
                        </Nav.Link>
                        <Nav.Link onClick={() => navigate("/profile")}
                            className={`py-3 ${location.pathname === "/profile" ? "active" : ""}`}>
                            <FontAwesomeIcon icon={faUser} className={"me-2"}/> Profile
                        </Nav.Link>
                        <Nav.Link onClick={() => navigate("/settings")}
                            className={`py-3 ${location.pathname === "/settings" ? "active" : ""}`}>
                            <FontAwesomeIcon icon={faCog} className={"me-2"}/> Settings
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Header