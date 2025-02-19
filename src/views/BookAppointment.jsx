import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BookAppointment.css";



const BookAppointment = () => {
    const [selectedTime, setSelectedTime] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
  
    const times = [
      "8:00 AM - 9:00 AM",
      "9:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "1:00 PM - 2:00 PM",
      "2:00 PM - 3:00 PM",
    ];

      // Función para manejar el click en el botón de disponibilidad
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Función para manejar la confirmación de la cita
  const handleConfirmAppointment = () => {
    setShowModal(true);
  };
  
    return (
<Container className="mt-4">
      <Row className="mt-4 align-left">
        <Col md={4} className="text-center d-flex flex-column align-items-center">
          <div className="mb-3">
            <img src="https://acortar.link/9csMZw" alt="profile" 
            style={{ width: "140px", height: "115px", borderRadius: "20%" }}
            className="mx-auto"/>
          </div>
          <h2>4.8</h2>
          <div>
            {[...Array(4)].map((_, i) => (
              <span key={i} style={{ color: "#617AFA", fontSize: "20px" }}>★</span>
            ))}
            <span style={{ color: "#617AFA", fontSize: "20px" }}>☆</span>
          </div>
          <p>500 reviews</p>
        </Col>
        <Col md={8}>
          <h2>Sebastián Morelos (Psychologist)</h2>
          <p>
            Sebastián Morelos is a clinical psychologist with over 10 years of
            experience in treating anxiety disorders, depression, and stress.
            His therapeutic approach is based on cognitive-behavioral therapy
            (CBT).
          </p>
          <h5>User Reviews:</h5>
          <ul>
            <li>"Dr. Sebastian is very understanding and helpful"</li>
            <li>"I highly recommend Dr. Sebastian"</li>
            <li>"He has made a positive impact in my life"</li>
          </ul>
        </Col>
      </Row>
      <Row className="mt-4 align-left">
        <Col md={4}>
          <h5>Availability</h5>
          <div className="d-flex flex-wrap">
            {times.map((time, index) => (
              <Button
                key={index}
                variant={selectedTime === time ? "primary" : "outline-primary"}
                className="m-1 w-50 border-dark"
                style={{
                    backgroundColor: selectedTime === time ? "#617AFA" : "transparent",
                    color: selectedTime === time ? "white" : "black",
                    
                    border: "1px solid #617AFA",
                  }}
                  onClick={() => handleTimeSelect(time)}
              >
                {time}
              </Button>
            ))}
          </div>
          <Button variant="primary" className="mt-3 w-100 " disabled={!selectedTime} onClick={handleConfirmAppointment}>
            Confirm Appointment
          </Button>
        </Col>
        <Col md={8}>
          <Calendar
            onChange={setDate}
            value={date}
            selectRange={false} 
            tileClassName={({ date, view }) => {
                // Only show days within the current month (1-30/31)
                const today = new Date();
                const currentMonth = today.getMonth();
                const currentYear = today.getFullYear();
  
                if (date.getMonth() !== currentMonth || date.getFullYear() !== currentYear) {
                  return "react-calendar__tile--disabled"; // Add a custom class for out-of-month dates
                }
                return "";
              }}
          />
        </Col>
      </Row>
      {/* Modal para confirmar la cita */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Appointment Confirmed</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your appointment has been successfully scheduled!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};


export default BookAppointment;
