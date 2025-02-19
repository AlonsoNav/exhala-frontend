import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ButtonAppointment.css"

const ButtonAppointment = ({ onButtonClick }) => {
  const [activeButton, setActiveButton] = useState("nextAppointments");

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (onButtonClick) {
      onButtonClick(button);  // Pass the selected button to the parent function
    }
  };

  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button
        type="button"
        className={`btn custom-btn rounded-start-pill ${
          activeButton === "nextAppointments" ? "active" : ""
        }`}
        onClick={() => handleButtonClick("nextAppointments")}
      >
        Next Appointments
      </button>
      <button
        type="button"
        className={`btn custom-btn rounded-end-pill ${
          activeButton === "history" ? "active" : ""
        }`}
        onClick={() => handleButtonClick("history")}
      >
        History
      </button>
    </div>
  );
};

export default ButtonAppointment;