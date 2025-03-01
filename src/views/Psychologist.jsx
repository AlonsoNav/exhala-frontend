// Styles imports
import "../styles/Style.css"
// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
// React imports
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
// Local imports
import {getRequest} from "../controllers/Db.jsx";
import {getImageType} from "../controllers/Utils.jsx";
import ProfileIcon from "../assets/profile.svg";

const Psychologist = () => {
    const { id } = useParams()
    const [psychologist, setPsychologist] = useState({})

    useEffect(() => {
        const fetchPsychologist = () => {
            getRequest(`/psychologists/${id}`)
                .then((response) => {
                    if (!response.ok)
                        return response.json().then((error) => Promise.reject(error.detail))
                    return response.json()
                })
                .then((body) => {
                    setPsychologist(body)
                })
                .catch((error) => {
                    console.error("Error:", error)
                })
        }

        fetchPsychologist()
    }, [])

    return (
       <Container fluid className={"margin-header text-start"}>
           <Row className={"my-3 px-3"}>
               <Col>
                   <Row className={"align-items-center"}>
                       <Col xs="auto">
                           <Image
                               src={psychologist.profile_image ? `data:image/${getImageType(psychologist.profile_image)};base64,${psychologist.profile_image}` : ProfileIcon}
                               alt={"Photo of the psychologist"}
                               className={"rounded-3 profile-photo"}
                           />
                       </Col>
                       <Col className={"me-5"}>
                           <h1 className={"mb-0 h3"}>{psychologist.name || ""} {psychologist.psychologistType ? `(${psychologist.psychologistType})` : ""}</h1>
                           <p>{psychologist.bio || ""}</p>
                       </Col>
                   </Row>
               </Col>
           </Row>
           <Row className={"px-3"}>
               <Col>

               </Col>
               <Col>

               </Col>
           </Row>
       </Container>
    )
}

export default Psychologist