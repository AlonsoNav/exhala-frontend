// Styles imports
import "../styles/Header.css"
import "../styles/Style.css"
// Local imports
import {useAuth} from "../contexts/AuthContext.jsx"
import Logo from "../assets/logo.svg"
import ProfileIcon from "../assets/profile.svg"
import {getImageType} from "../controllers/Utils.jsx"
// React imports
import {useState} from "react"
import {useNavigate, useLocation} from "react-router-dom"
// Bootstrap imports
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Image from "react-bootstrap/Image"
import Offcanvas from "react-bootstrap/Offcanvas"
// Font Awesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars, faHome, faCheckCircle, faCalendarAlt, faUser, faCog} from "@fortawesome/free-solid-svg-icons"

const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {user} = useAuth()
    const [show, setShow] = useState(false)

    return(
        <>
            <Navbar className={"bg-white position-fixed top-0 start-0 w-100 fixed-top shadow-sm"} style={{minHeight:"76px"}} role="navigation" aria-label="Main navigation">
                <Navbar.Brand className={"d-flex align-items-center p-0 w-auto"}>
                    <Image alt={"Exhala's Logo, click to go home"} src={Logo} className={"w-50"} onClick={() => navigate("/")} role="button" aria-label="Home"/>
                    <FontAwesomeIcon icon={faBars} className={"clickable-icon"} onClick={()=> setShow(!show)} role="button" aria-label="Toggle menu"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center me-2">
                        <Image
                            src={user.profile_image ? `data:image/${getImageType(user.profile_image)};base64,${user.profile_image}` : ProfileIcon}
                            roundedCircle
                            alt={"Profile image"}
                            className={"profile-photo"}
                            style={{maxWidth: "45px", maxHeight: "45px"}}
                        />
                        <div className={"d-flex flex-column text-start d-none d-md-flex"}>
                            <Nav.Link className={"py-0 fs-6"} onClick={() => navigate("/profile")} aria-label="Profile">Profile</Nav.Link>
                            <Nav.Link className={"py-0 fs-6"} onClick={() => navigate("/settings")} aria-label="Settings">Settings</Nav.Link>
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
                aria-labelledby="offcanvasLabel"
            >
                <Offcanvas.Body>
                    <Nav className={"d-flex flex-column"} role="menu">
                        <Nav.Link onClick={() => navigate("/")}
                                  className={`py-3 nav-link-custom ${location.pathname === "/" ? "active" : ""}`}
                                  role="menuitem"
                                  aria-current={location.pathname === "/" ? "page" : undefined}>
                            <FontAwesomeIcon icon={faHome} className={"me-2"}/> Home
                        </Nav.Link>
                        <Nav.Link onClick={() => navigate("/tasks")}
                                  className={`py-3 nav-link-custom ${location.pathname === "/tasks" ? "active" : ""}`}
                                  role="menuitem"
                                  aria-current={location.pathname === "/tasks" ? "page" : undefined}>
                            <FontAwesomeIcon icon={faCheckCircle} className={"me-2"}/> Tasks
                        </Nav.Link>
                        <Nav.Link onClick={() => navigate("/appointments")}
                            className={`py-3 nav-link-custom ${location.pathname === "/appointments" ? "active" : ""}`}
                            role="menuitem"
                            aria-current={location.pathname === "/appointments" ? "page" : undefined}>
                            <FontAwesomeIcon icon={faCalendarAlt} className={"me-2"}/> Appointments
                        </Nav.Link>
                        <Nav.Link onClick={() => navigate("/profile")}
                            className={`py-3 nav-link-custom ${location.pathname === "/profile" ? "active" : ""}`}
                            role="menuitem"
                            aria-current={location.pathname === "/profile" ? "page" : undefined}>
                            <FontAwesomeIcon icon={faUser} className={"me-2"}/> Profile
                        </Nav.Link>
                        <Nav.Link onClick={() => navigate("/settings")}
                            className={`py-3 nav-link-custom ${location.pathname === "/settings" ? "active" : ""}`}
                            role="menuitem"
                            aria-current={location.pathname === "/settings" ? "page" : undefined}>
                            <FontAwesomeIcon icon={faCog} className={"me-2"}/> Settings
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Header