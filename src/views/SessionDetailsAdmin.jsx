import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SessionDetailsAdmin = () => {
  const [checklist, setChecklist] = useState([
    "Prepare a quiet space for your session",
    "Ensure your microphone and camera are working",
    "Complete the Today's Mood exercise",
  ]);

  const [instructions, setInstructions] = useState([
    "Prepare a quiet space for your session",
    "Ensure your microphone and camera are working",
    "Complete the Today's Mood exercise",
  ]);

  const [previousSessions, setPreviousSessions] = useState([
    "Identified triggers for negative emotions",
    "Practiced a relaxation technique to manage stress",
  ]);

  const [newInstruction, setNewInstruction] = useState("");
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [newPreviousSession, setNewPreviousSession] = useState("");
  const [zoomLink, setZoomLink] = useState("");

  const handleAddInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions([...instructions, newInstruction]);
      setNewInstruction("");
    }
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setChecklist([...checklist, newChecklistItem]);
      setNewChecklistItem("");
    }
  };

  const handleAddPreviousSession = () => {
    if (newPreviousSession.trim()) {
      setPreviousSessions([...previousSessions, newPreviousSession]);
      setNewPreviousSession("");
    }
  };

  return (
    <div className="container mt-4">
      <header className="mb-4">
        <h1 className="text-start">Session Details (Upcoming session)</h1>
        <p className="text-start">February 7, 2025 - 9:00 AM</p>
      </header>

      <div className="row mt-4">
        {/* Left Column */}
        <div className="col-md-6">
          <div className="d-flex align-items-center my-4">
            <h3 className="me-2">Meeting:</h3>
            <input
              type="text"
              className="form-control"
              placeholder="Enter link meeting"
              value={zoomLink}
              onChange={(e) => setZoomLink(e.target.value)}
            />
          </div>
          <h3 className="me-2 text-start">Session Preparation</h3>
          {checklist.map((item, index) => (
            <div className="form-check d-flex align-items-center my-3" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`check${index}`}
              />
              <label className="form-check-label ms-2" htmlFor={`check${index}`}>
                {item}
              </label>
            </div>
          ))}
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Add new term"
            value={newChecklistItem}
            onChange={(e) => setNewChecklistItem(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddChecklistItem()}
          />
          <button className="btn btn-light mt-2 d-flex align-items-center" onClick={handleAddChecklistItem}>
            <span className="me-1">+</span> Add Term
          </button>
          <button className="btn btn-link mt-2">Go to User's Logbook</button>
        </div>

        {/* Right Column */}
        <div className="col-md-6">
          <h3 className="text-start">Pre-session Instructions:</h3>
          <div className="p-3 bg-light rounded">
            {instructions.map((item, index) => (
              <div key={index} className="d-flex align-items-center my-2">
                <span className="me-2">•</span>
                <span>{item}</span>
              </div>
            ))}
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Add new instruction"
              value={newInstruction}
              onChange={(e) => setNewInstruction(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddInstruction()}
            />
            <button className="btn btn-light mt-2 d-flex align-items-center" onClick={handleAddInstruction}>
              <span className="me-1">+</span> Add Instruction
            </button>
          </div>

          <h3 className="mt-3 text-start">Previous Session Overview:</h3>
          <div className="p-3 bg-light rounded">
            {previousSessions.map((item, index) => (
              <div key={index} className="d-flex align-items-center my-2">
                <span className="me-2">•</span>
                <span>{item}</span>
              </div>
            ))}
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Add new session overview"
              value={newPreviousSession}
              onChange={(e) => setNewPreviousSession(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddPreviousSession()}
            />
            <button className="btn btn-light mt-2 d-flex align-items-center" onClick={handleAddPreviousSession}>
              <span className="me-1">+</span> Add Session Overview
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary rounded-pill px-4">Save Changes</button>
      </div>
    </div>
  );
};

export default SessionDetailsAdmin;
