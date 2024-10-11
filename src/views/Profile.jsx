// Styles imports
import "../styles/Style.css"
import "../styles/Profile.css"
// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
// Local imports
import {useAuth} from "../contexts/AuthContext.jsx"
import ProfileIcon from "../assets/profile.svg"
import {validateEmail} from "../controllers/InputValidation.jsx"
// React imports
import {useState} from "react"

const Profile = () => {
    const {user} = useAuth()
    const isPsychologist = true
    const [name, setName] = useState(user.name || "")
    const [email, setEmail] = useState(user.email || "")
    const [birthDate, setBirthDate] = useState(user.birthDate || "")
    const [phone, setPhone] = useState(user.phone || "")
    const [address, setAddress] = useState(user.address || "")
    const [bio, setBio] = useState(user.bio || "")
    const [gender, setGender] = useState("Female")
    const [type, setType] = useState("Counselor")
    const [isReadonly, setIsReadonly] = useState(true)

    // Date
    const today = new Date()
    const maxDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate()).toISOString().split("T")[0]
    const minDate = "1924-01-01"

    // Edit
    const handleEditButton = () => {
        if(!isReadonly){
            setName(user.name)
            setEmail(user.email)
            setBirthDate(user.birthDate || "")
            setPhone(user.phone)
            setAddress(user.address)
            setBio(user.bio)
        }
        setIsReadonly(!isReadonly)
    }

    // Gender options
    const genders = ["Male", "Female"]
    const genderOptions = genders.map((gender, index) => (
      <option key={`gender-${index}`} value = {gender}>{gender}</option>
    ))

    // Type options
    const types = ["Counselor", "Psychologist", "Therapist"]
    const typeOptions = types.map((type, index) => (
      <option key={`type-${index}`} value = {type}>{type}</option>
    ))

    return(
        <Container fluid className={"margin-header text-start"}>
            <Row className={"my-3 px-3"}>
                <Col>
                    <Row className={"align-items-center"}>
                        <Col xs="auto">
                            <Image
                                src={user.image || ProfileIcon}
                                roundedCircle
                                alt={"Profile image"}
                                className={"profile-photo"}
                            />
                        </Col>
                        <Col>
                            <h2 className={"mb-0 h3"}>{user.name || ""}</h2>
                            <p className={"text-primary edit-profile"} onClick={handleEditButton}>Edit profile</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row xs={1} md={2} className={"mb-3 px-3"}>
                <Col>
                    <Row>
                        <Form.Group className={"mx-1 text-start"} controlId={"formBasicName"}>
                            <Form.Label column={true}>Full Name</Form.Label>
                            <Form.Control
                                className={"form-control-custom"}
                                type="text"
                                placeholder="Enter your full name..."
                                maxLength={50}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                aria-label={"Name input"}
                                readOnly={isReadonly}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please enter your full name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className={"mx-1 text-start"} controlId="formBasicEmail">
                            <Form.Label column={true}>Email</Form.Label>
                            <Form.Control
                                className={"form-control-custom"}
                                type="email"
                                placeholder="Enter your email address..."
                                maxLength={100}
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label={"Email input"}
                                isInvalid={!validateEmail(email)}
                                readOnly={isReadonly}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please enter a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className={"mx-1 text-start"} controlId="formBasicBio">
                            <Form.Label column={true}>Bio</Form.Label>
                            <textarea
                                className={"form-control form-control-custom"}
                                rows={2}
                                placeholder="Enter your bio..."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                aria-label={"Bio input"}
                                maxLength={100}
                                readOnly={isReadonly}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className={"mx-1 text-start"} controlId="formBasicAddress">
                            <Form.Label column={true}>Address</Form.Label>
                            <textarea
                                className={"form-control form-control-custom"}
                                rows={2}
                                placeholder="Enter your address..."
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                aria-label={"Address input"}
                                maxLength={100}
                                readOnly={isReadonly}
                            />
                        </Form.Group>
                    </Row>
                </Col>
                <Col>
                    <Row xs={1} md={2}>
                        <Col>
                            <Form.Group className={"mx-1 text-start"} controlId="formBasicBirthdatePicker">
                                <Form.Label column={true}>Date of Birth</Form.Label>
                                <Form.Control
                                    className={"form-control-custom calendar-icon-custom"}
                                    type="date"
                                    placeholder="Enter your birthdate..."
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    aria-label={"Date of birth input"}
                                    min={minDate}
                                    max={maxDate}
                                    onKeyDown={(e) => e.preventDefault()} // Disable typing
                                    readOnly={isReadonly}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    Please enter your birthdate.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className={"mx-1 text-start"} controlId="formBasicPhoneNumber">
                                <Form.Label column={true}>Phone Number</Form.Label>
                                <Form.Control
                                    className={"form-control-custom"}
                                    type="phone"
                                    placeholder="Enter your phone number..."
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    aria-label={"Phone number input"}
                                    readOnly={isReadonly}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    Please enter a valid phone number.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    {isPsychologist ? (
                        <Row xs={1} md={2}>
                            <Col>
                                <Form.Group className={"mx-1 text-start"} controlId="formBasicGenderPicker">
                                    <Form.Label column={true}>Gender</Form.Label>
                                    <Form.Select
                                        className={"form-control-custom"}
                                        aria-label={"Gender select"}
                                        disabled={isReadonly}
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}>
                                        {genderOptions}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                           <Col>
                                <Form.Group className={"mx-1 text-start"} controlId="formBasicTypePicker">
                                    <Form.Label column={true}>Type</Form.Label>
                                    <Form.Select
                                        className={"form-control-custom"}
                                        aria-label={"Type select"}
                                        disabled={isReadonly}
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}>
                                        {typeOptions}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    ) : null}
                    <Row>
                        <Col>
                            <Row className={"bg-tertiary border-tertiary rounded-3 mt-3 mx-1 p-3 d-flex flex-column flex-md-row align-items-center"}>
                                <Col className={"flex-grow-1"}>
                                    <strong>Account Settings</strong>
                                    <p className={"m-0 text-muted"}>Manage your preferences.</p>
                                </Col>
                                <Col className={"col-auto mt-3 mt-md-0 align-self-sm-center align-self-start"}>
                                    <Button className={"rounded-4"} style={{ minWidth: "210px" }}>Change your password</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row className={"bg-tertiary border-tertiary rounded-3 mt-md-3 mt-3 mb-4 mx-1 p-3 d-flex align-items-center flex-column flex-md-row"}>
                                <Col className={"flex-grow-1"}>
                                    <strong>Logout</strong>
                                    <p className={"m-0 text-muted"}>Bye bye.</p>
                                </Col>
                                <Col className={"col-auto mt-3 mt-md-0 align-self-sm-center align-self-start"}>
                                    <Button className={"rounded-4"} style={{ minWidth: "210px" }}>Logout</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {isReadonly ? null : (
                                <Row className={"mx-1"}>
                                    <Col>
                                        <Button className={"rounded-4 w-100"}>Save changes</Button>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile