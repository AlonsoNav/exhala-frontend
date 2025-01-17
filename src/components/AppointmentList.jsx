import React from "react";
import { ListGroup } from "react-bootstrap";
import "../styles/AppointmentList.css";

const AppointmentList = ({ appointments }) => {
    return (
        <ListGroup>
          {appointments.map((appointment, index) => (
            <React.Fragment key={index}>
              <ListGroup.Item 
                className="d-flex align-items-start border-0 transparent-background"
              >
                <div className="me-3" style={{ width: "100px", height: "100px" }}>
                  <img
                    src="https://acortar.link/PrYoCi"
                    className="img-fluid"
                    alt="Appointment Icon"
                  />
                </div>
                <div className="appointment-details">
                  <h5 className="appointment-title">
                    {appointment.title} - {appointment.date}
                  </h5>
                  <small className="appointment-category text-muted">
                    {appointment.category}
                  </small>
                  <p className="appointment-description">
                    {appointment.description}
                  </p>
                </div>
              </ListGroup.Item>
              {index < appointments.length - 1 && <hr className="my-3" />}
            </React.Fragment>
          ))}
        </ListGroup>
    );
};

export default AppointmentList;