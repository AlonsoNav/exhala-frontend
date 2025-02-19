import React from "react";

// Check SVG Component
const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check-icon"
      width="24"
      height="24"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
  
  const Task = ({ title, status, completedDate, onStatusChange }) => {
    return (
      <div className="d-flex align-items-center mb-3">
        <div className="me-3">
          {status === "completed" ? (
            <CheckIcon />
          ) : (
            <div
              className="rounded-circle border border-secondary"
              style={{ width: "24px", height: "24px", cursor: "pointer" }}
              onClick={onStatusChange}
            ></div>
          )}
        </div>
        <div className="text-start">
          <h5 className="mb-0">{title}</h5>
          <small className="text-muted d-block">
            {status === "not_started" ? "Not Started" : `Completed on ${completedDate}`}
          </small>
        </div>
      </div>
    );
  };
  export default Task;