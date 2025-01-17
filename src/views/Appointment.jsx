import React, { useState } from "react";
import "../styles/Appointment.css"
import ButtonAppointment from "../components/ButtonAppointment";
import AppointmentList from "../components/AppointmentList";
import { Container, Button} from "react-bootstrap";

const AppointmentsScreen = () => {
  const [view, setView] = useState("nextAppointments"); // Track which list to display

  const historyAppointments = []; // Example for no history items
  const appointments = [
    {
      title: "Check-up with Dr. Smith",
      date: "January 20, 2025",
      category: "Health",
      description:
        "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    },
    {
      title: "Therapy for Bella",
      date: "January 22, 2025",
      category: "Recreation",
      description:
        "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    },
    {
      title: "Mental health check-up",
      date: "February 10, 2025",
      category: "Health",
      description:
        "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    },
    {
      title: "Mental check-up",
      date: "February 10, 2021",
      category: "Rehabilitation",
      description:
        "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    },
    {
      title: "Monthly check-up",
      date: "February 10, 2021",
      category: "Therapy",
      description:
        "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    },
  ];
  
  const handleButtonClick = (button) => {
    setView(button); // Update the view based on the button clicked
  };

  return (
    <Container fluid className="py-4 mt-5" style={{ maxWidth: "1300px" }}>
      <div>
        <h1 className="text-start mb-4">Appointments</h1>
      </div>
      <ButtonAppointment onButtonClick={handleButtonClick} />
      {view === "nextAppointments" ? (
        <AppointmentList appointments={appointments} />
      ) : view === "history" && historyAppointments.length > 0 ? (
        <AppointmentList appointments={historyAppointments} />
      ) : (
        <div>No history available</div>
      )}
    </Container>
  );
};

export default AppointmentsScreen;
