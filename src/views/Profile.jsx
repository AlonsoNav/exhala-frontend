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
import Modal from "react-bootstrap/Modal"
// Local imports
import {useAuth} from "../contexts/AuthContext.jsx"
import ProfileIcon from "../assets/profile.svg"
import {validateEmail, validatePhone} from "../controllers/InputValidation.jsx"
import ModalComponent from "../components/ModalComponent.jsx"
import ToastComponent from "../components/ToastComponent.jsx"
import {postFileRequest, putRequest} from "../controllers/Db.jsx"
// React imports
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {getImageType} from "../controllers/Utils.jsx"

const Profile = () => {
    const navigate = useNavigate()
    const [toast, setToast] = useState({show: false, message: "", bg: "danger"})
    // User data
    const {user, setUser, logout} = useAuth()
    const [name, setName] = useState(user.name || "")
    const [email, setEmail] = useState(user.email || "")
    const [birthdate, setBirthdate] = useState(user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : "")
    const [phone, setPhone] = useState(user.phone || "")
    const [address, setAddress] = useState(user.address || "")
    const [bio, setBio] = useState(user.bio || "")
    const [gender, setGender] = useState(user.gender || "Female")
    const [type, setType] = useState(user.psychologistType || "Counselor")
    // Photo
    const [isPhotoLoading, setIsPhotoLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    // Password
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [repeatedNewPassword, setRepeatedNewPassword] = useState("")
    const [isReadonly, setIsReadonly] = useState(true)
    // Modals
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [showChangePwdModal, setShowChangePwdModal] = useState(false)
    const [showChangePwdConfirmModal, setShowChangePwdConfirmModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showPhotoModal, setShowPhotoModal] = useState(false)

    // Date
    const today = new Date()
    const maxDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate()).toISOString().split("T")[0]
    const minDate = "1924-01-01"

    // Reset data
    const resetData = () => {
        setName(user.name)
        setEmail(user.email)
        setBirthdate(user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : "")
        setPhone(user.phone || "")
        setAddress(user.address || "")
        setBio(user.bio || "")
        setGender(user.gender || "Female")
        setType(user.psychologistType || "Counselor")
    }

    useEffect(() => {
        resetData()
    }, [user])

    // Edit
    const handleEditButton = () => {
        if(!isReadonly){
           resetData()
        }
        setIsReadonly(!isReadonly)
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const form = e.currentTarget
        if(form.checkValidity() === false || !validateEmail(email) || (phone.length !== 0 && !validatePhone(phone)))
            return
        setShowEditModal(true)
    }

    const handleEditConfirm = () => {
        setShowEditModal(false)
        setIsReadonly(true)

        const payload = {
            name: name,
            email: email,
            birthdate: birthdate ? new Date(birthdate).toISOString().split('T')[0] : null,
            phone: phone,
            address: address,
            bio: bio,
            gender: gender,
            psychologistType: type
        }

        console.log(birthdate)

        putRequest(payload, "/update-user")
            .then((response) => {
                if (!response) {
                    setToast({ show: true, message: "Server error. Please try again later.", bg: "danger" })
                    return Promise.reject("No response from server")
                }
                return response.json().then((body) => {
                    if (!response.ok) {
                        setToast({ show: true, message: body.detail, bg: "danger" })
                        return Promise.reject(body.detail)
                    } else {
                        setToast({ show: true, message: "User updated successfully.", bg: "info" })
                        setUser(body)
                    }
                })
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    // Logout
    const handleLogout = () => {
        logout()
        if (localStorage.getItem("logoutResult")) {
            localStorage.removeItem("logoutResult")
            localStorage.setItem("toastMessage", "Logout successful.")
            localStorage.setItem("toastBg", "info")
            navigate("/login")
        } else {
            setToast({show: true, message: "Error logging out.", bg: "danger"})
        }
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

    // Handle password change
    const handlePasswordChangeSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const form = e.currentTarget
        if(form.checkValidity() === false || newPassword !== repeatedNewPassword)
            return
        setShowChangePwdConfirmModal(true)
        setShowChangePwdModal(false)
    }

    const handlePasswordConfirmedChange = () => {
        setShowChangePwdConfirmModal(false)
        let payload = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }

        putRequest(payload, "/change-password")
            .then((response) => {
                if (!response) {
                    setToast({ show: true, message: "Server error. Please try again later.", bg: "danger" })
                    return Promise.reject("No response from server")
                }
                return response.json().then((body) => {
                    if (!response.ok) {
                        setToast({ show: true, message: body.detail, bg: "danger" })
                        return Promise.reject(body.detail)
                    } else {
                        setToast({ show: true, message: body.message, bg: "info" })
                        setShowChangePwdModal(false)
                        setOldPassword("")
                        setNewPassword("")
                        setRepeatedNewPassword("")
                    }
                })
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    // Photo
    const handlePhotoSubmit = (e) => {
        e.preventDefault()

        if (!imageFile)
            return

        const reader = new FileReader()
        reader.readAsDataURL(imageFile)
        reader.onloadend = () => {
            const base64Image = reader.result.split(',')[1]

            const formData = new FormData()
            formData.append('file', imageFile)

            setIsPhotoLoading(true)

            postFileRequest(formData, '/upload-image')
                .then((response) => {
                    if (!response) {
                        setToast({ show: true, message: 'Server error. Please try again later.', bg: 'danger' })
                        return Promise.reject('No response from server')
                    }
                    return response.json().then((data) => {
                        if (!response.ok) {
                            setToast({ show: true, message: data.detail || 'Error uploading image', bg: 'danger' })
                            return Promise.reject(data.detail || 'Error uploading image')
                        } else {
                            setToast({ show: true, message: 'Image uploaded successfully!', bg: 'info' })
                            setUser((prevUser) => ({
                                ...prevUser,
                                profile_image: base64Image
                            }))
                            setShowPhotoModal(false)
                        }
                    })
                })
                .catch((error) => {
                    console.error(error)
                    setToast({ show: true, message: 'An error occurred while uploading the image.', bg: 'danger' })
                })
                .finally(() => {
                    setIsPhotoLoading(false)
                })
        }
    }

    return(
        <Container fluid className={"margin-header text-start"}>
            <ToastComponent
                message={toast.message}
                show={toast.show}
                onClose={() => setToast({...toast, show: false})}
                bg={toast.bg}
            />
            <ModalComponent
                show={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                title={"Confirm Logout"}
                message={"Are you sure you want to logout?"}
                confirmButtonText={"Logout"}
                confirmButtonVariant={"danger"}
                onConfirm={() => handleLogout()}
            />
            <ModalComponent
                show={showChangePwdConfirmModal}
                onClose={() => {
                    setShowChangePwdConfirmModal(false)
                    setShowChangePwdModal(true)
                }}
                title={"Confirm Password Change"}
                message={"Are you sure you want to change your password?"}
                confirmButtonText={"Change password"}
                confirmButtonVariant={"primary"}
                onConfirm={handlePasswordConfirmedChange}
            />
            <ModalComponent
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                title={"Confirm Changes"}
                message={"Are you sure you want to save your changes?"}
                confirmButtonText={"Save changes"}
                confirmButtonVariant={"primary"}
                onConfirm={handleEditConfirm}
            />
            <Modal show={showChangePwdModal} onHide={() => setShowChangePwdModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={handlePasswordChangeSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className={"mb-3 mx-1 text-start"} controlId="formBasicPassword">
                                    <Form.Label column={true}>Old Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your old password..."
                                        required
                                        maxLength={16}
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        aria-label={"Old password input"}
                                        isInvalid={oldPassword === ""}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Please enter your old password.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className={"mb-3 mx-1 text-start"} controlId="formBasicPassword">
                                    <Form.Label column={true}>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your new password..."
                                        required
                                        maxLength={16}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        aria-label={"New password input"}
                                        isInvalid={newPassword === ""}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Please enter your new password.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className={"mb-3 mx-1 text-start"} controlId="formBasicRepeatedPassword">
                                    <Form.Label column={true}>Repeat New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Repeat your new password..."
                                        required
                                        maxLength={16}
                                        value={repeatedNewPassword}
                                        onChange={(e) => setRepeatedNewPassword(e.target.value)}
                                        aria-label={"Confirm your new password input"}
                                        isInvalid={newPassword !== repeatedNewPassword}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Your password must match.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className={"text-end"}>
                            <button type="submit" className={"btn btn-primary mt-5"}>Change password</button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showPhotoModal} onHide={() => setShowPhotoModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={handlePhotoSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className={"mb-3 mx-1 text-start"} controlId="formBasicPhoto">
                                    <Form.Label column={true}>Photo</Form.Label>
                                    <Form.Control
                                        type="file"
                                        required
                                        accept="image/*"
                                        aria-label={"Photo input"}
                                        onChange={(e) => setImageFile(e.target.files[0])}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Please select a photo.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className={"text-end"}>
                            <button className={"btn btn-primary mt-5"} type={"submit"} disabled={isPhotoLoading}>
                                {isPhotoLoading ? "Uploading" : "Upload photo"}</button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Row className={"my-3 px-3"}>
                <Col>
                    <Row className={"align-items-center"}>
                        <Col xs="auto">
                            <Image
                                src={user.profile_image ? `data:image/${getImageType(user.profile_image)};base64,${user.profile_image}` : ProfileIcon}
                                roundedCircle
                                alt={"Profile image"}
                                className={"profile-photo"}
                            />
                        </Col>
                        <Col>
                            <h2 className={"mb-0 h3"}>{user.name || ""}</h2>
                            <p className={"text-primary edit-profile mb-0"} onClick={handleEditButton}>Edit profile</p>
                            <p className={"text-primary edit-profile"} onClick={() => setShowPhotoModal(true)}>Change photo</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Form noValidate onSubmit={handleEditSubmit}>
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
                                    maxLength={200}
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
                                        value={birthdate}
                                        onChange={(e) => setBirthdate(e.target.value)}
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
                                        isInvalid={phone.length !== 0 && !validatePhone(phone)}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Please enter a valid phone number.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        {!user.type ? (
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
                                        <Button
                                            className={"rounded-4"}
                                            style={{ minWidth: "210px" }}
                                            onClick={() => setShowChangePwdModal(true)}>Change your password</Button>
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
                                        <Button
                                            className={"rounded-4"}
                                            variant={"danger"}
                                            style={{ minWidth: "210px" }}
                                            onClick={() => setShowLogoutModal(true)}>Logout</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {isReadonly ? null : (
                                    <Row className={"mx-1"}>
                                        <Col>
                                            <Button className={"rounded-4 w-100"} type={"submit"}>Save changes</Button>
                                        </Col>
                                    </Row>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default Profile