// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";
import Pic from "../assets/example.svg";
// Local imports
import '../styles/Style.css'
import '../styles/Home.css'
import ToastComponent from "../components/ToastComponent.jsx";
import {filterBySearchTerm} from "../controllers/Filters.jsx";
// React imports
import {useState, useEffect} from "react";
import {Pagination} from "react-bootstrap";

const Home = () => {
    const [toast, setToast] = useState({show: false, message: "", bg:"danger"})
    const [psychologists, setPsychologists] = useState([
        {name: "Dr. Alonso Navarro", bio: "PdD in Psychology"},
        {name: "Dr. Alonso Navarro", bio: "PdD in Psychology"},
        {name: "Dr. Alonso Navarro", bio: "PdD in Psychology"},
        {name: "Dr. Alonso Navarro", bio: "PdD in Psychology"},
        {name: "Dr. Maria Perez", bio: "PdD in Psychology"},
        {name: "Dr. Maria Perez", bio: "PdD in Psychology"},
        {name: "Dr. Maria Perez", bio: "PdD in Psychology"},
        {name: "Dr. Maria Perez", bio: "PdD in Psychology"},
        {name: "Dr. Carlos Perez", bio: "PdD in Psychology"}
    ])
    const [filteredPsychologists, setFilteredPsychologists] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const message = localStorage.getItem("toastMessage")
        if(message){
            setToast({show: true, message: message, bg: "info"})
            localStorage.removeItem("toastMessage")
        }
    }, []);

    // Pagination
    const itemsPerPage = 4;
    const maxPageButtons = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPsychologists.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPsychologists.length / itemsPerPage);

    const renderPaginationItems = () => {
        const items = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                    {number}
                </Pagination.Item>
            );
        }

        return items;
    }

    // Filter psychologists by search term
    useEffect(() => {
        const filteredPsychologists = psychologists.filter(psychologist => {
            return filterBySearchTerm(psychologist.name, searchTerm)
        })

        setFilteredPsychologists(filteredPsychologists)
    }, [psychologists, searchTerm])

    // Render psychologists
    const psychologistsCards = currentItems.map((psychologist, index) => (
        <Col key={`psychologist_card_${index}`} className="text-start">
            <Image fluid src={Pic} alt={`Photo of ${psychologist.name}`} className={"rounded-3 mb-3 card-img"}/>
            <p className={"h6"}>{psychologist.name}</p>
            <p>{psychologist.bio}</p>
        </Col>
    ));

    return (
        <Container fluid className={"margin-header text-start"}>
            <ToastComponent
                message={toast.message}
                show={toast.show}
                bg={toast.bg}
                onClose={() => setToast({...toast, show: false})}
            />
            <Row className={"my-3"}>
                <Col>
                    <Form>
                        <InputGroup>
                            <InputGroup.Text className={"searcher"}>
                                <FontAwesomeIcon icon={faSearch}/>
                            </InputGroup.Text>
                            <Form.Control
                                className={"searcher"}
                                placeholder="Search for a psychologist"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                maxLength="100"
                            />
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
            <Row xs={1} md={4} className={"g-3"}>
                {psychologistsCards}
            </Row>
            <Row className={"my-3"}>
                <Col className={"d-flex justify-content-center"}>
                    <Pagination>
                        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                        {renderPaginationItems()}
                        <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                    </Pagination>
                </Col>
            </Row>
        </Container>
    )
}

export default Home