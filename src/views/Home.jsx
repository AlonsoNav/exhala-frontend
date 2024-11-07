// Style imports
import "../styles/Style.css"
import "../styles/Home.css"
// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Image from "react-bootstrap/Image"
import Pagination from "react-bootstrap/Pagination"
import ToggleButton from "react-bootstrap/ToggleButton"
import ButtonGroup from "react-bootstrap/ButtonGroup";
// Font Awesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from "@fortawesome/free-solid-svg-icons"
// Local imports
import DefaultPhoto from "../assets/profile.svg"
import ToastComponent from "../components/ToastComponent.jsx"
import {filterBySearchTerm, filterByGender, filterByType} from "../controllers/Filters.jsx"
import {getRequest} from "../controllers/Db.jsx";
// React imports
import {useState, useEffect} from "react"

const Home = () => {
    const [toast, setToast] = useState({show: false, message: "", bg:"danger"})
    const [psychologists, setPsychologists] = useState([])
    const [filteredPsychologists, setFilteredPsychologists] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [genderValue, setGenderValue] = useState("Any Gender")
    const genderFilters = ["Any Gender", "Female", "Male"]
    const [typeValue, setTypeValue] = useState("Any Type")
    const typeFilters = ["Any Type", "Counselor", "Psychologist", "Therapist"]

    useEffect(() => {
        const fetchPsychologists = () => {
            getRequest("/psychologists")
                .then((response) => {
                    if (!response.ok)
                        return response.json().then((error) => Promise.reject(error.detail))
                    return response.json()
                })
                .then((body) => {
                    setPsychologists(body)
                })
                .catch((error) => {
                    console.error("Error:", error)
                })
        }

        const message = localStorage.getItem("toastMessage")
        if(message) {
            setToast({show: true, message: message, bg: "info"})
            localStorage.removeItem("toastMessage")
        }

        fetchPsychologists()
    }, [])

    // Pagination
    const itemsPerPage = 10
    const maxPageButtons = 5
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredPsychologists.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredPsychologists.length / itemsPerPage)

    const renderPaginationItems = () => {
        const items = []
        const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
        const endPage = Math.min(totalPages, startPage + maxPageButtons - 1)

        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => setCurrentPage(number)}
                    aria-current={number === currentPage ? "page" : undefined}
                >
                    {number}
                </Pagination.Item>
            )
        }

        return items
    }

    // Filter psychologists
    // Render gender filters
    const genderFilterItems = genderFilters.map((gender, index) => (
        <ToggleButton
            key={index}
            id={`gender-radio-${index}`}
            type="radio"
            name="gender"
            variant={"outline-secondary"}
            value={gender}
            checked={gender === genderValue}
            onChange={() => setGenderValue(gender)}
            className={"custom-outline-secondary"}
        >
            {gender}
        </ToggleButton>
    ))

    const typeFilterItems = typeFilters.map((type, index) => (
        <ToggleButton
            key={index}
            id={`type-radio-${index}`}
            type="radio"
            name="type"
            variant={"outline-secondary"}
            value={type}
            checked={type === typeValue}
            onChange={() => setTypeValue(type)}
            className={"custom-outline-secondary"}
        >
            {type}
        </ToggleButton>
    ))

    useEffect(() => {
        const filteredPsychologists = psychologists.filter(psychologist => {
            return filterBySearchTerm(psychologist.name, searchTerm) &&
                (typeValue === "Any Type" || filterByType(psychologist.type, typeValue)) &&
                (genderValue === "Any Gender" || filterByGender(psychologist.gender, genderValue))
        })

        setFilteredPsychologists(filteredPsychologists)
    }, [psychologists, searchTerm, typeValue, genderValue])

    // Render psychologists
    const psychologistsCards = currentItems.map((psychologist, index) => (
        <Col key={`psychologist-card-${index}`} className="text-start">
            <Image
                fluid
                src={psychologist.photo ? psychologist.photo : DefaultPhoto}
                alt={`Photo of ${psychologist.name}`}
                className={"rounded-3 mb-3 card-img"}
            />
            <p className={"h6"}>{psychologist.name}</p>
            <p>{psychologist.bio}</p>
        </Col>
    ))

    return (
        <Container fluid className={"margin-header text-start"}>
            <ToastComponent
                message={toast.message}
                show={toast.show}
                bg={toast.bg}
                onClose={() => setToast({...toast, show: false})}
            />
            <Row className={"my-3 px-3"}>
                <Col>
                    <Form>
                        <InputGroup>
                            <InputGroup.Text className={"searcher"} aria-label="Search icon">
                                <FontAwesomeIcon icon={faSearch}/>
                            </InputGroup.Text>
                            <Form.Control
                                className={"searcher"}
                                placeholder="Search for a psychologist"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                maxLength="100"
                                aria-label="Search for a psychologist"
                            />
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
            <Row className={"mb-3 px-3"}>
                <Col>
                    <ButtonGroup id={"button-group-genders"}>
                        {genderFilterItems}
                    </ButtonGroup>
                </Col>
            </Row>
            <Row className={"mb-3 px-3"}>
                <Col>
                    <ButtonGroup id={"button-group-types"} className={"flex-wrap"}>
                        {typeFilterItems}
                    </ButtonGroup>
                </Col>
            </Row>
            <Row xs={2} md={5} className={"g-3 px-3"}>
                {psychologistsCards}
            </Row>
            <Row className={"my-3 px-3"}>
                <Col className={"d-flex justify-content-center"}>
                    <Pagination aria-label="Psychologists pagination">
                        <Pagination.Prev
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            aria-disabled={currentPage === 1}
                        />
                        {renderPaginationItems()}
                        <Pagination.Next
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            aria-disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </Col>
            </Row>
        </Container>
    )
}

export default Home