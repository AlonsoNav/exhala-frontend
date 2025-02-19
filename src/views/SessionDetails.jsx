import React, {useState} from "react";
import Task from "../components/TaskComponent.jsx";
import ProgressBar from "../components/ProgressBarComponent.jsx";
import ReviewBars from "../components/ReviewBarsComponent.jsx";

const SessionDetailsPage = () => {
    const [assignedTasks, setAssignedTasks] = useState([
      { title: "Practice a 5-minute mindfulness exercise", status: "not_started", completedDate: null },
      { title: "Try 5–5–5 breathing for stress relief", status: "completed", completedDate: "June 17, 2023" },
    ]);
  
    const handleStatusChange = (index) => {
      const updatedTasks = [...assignedTasks];
      const task = updatedTasks[index];
      if (task.status === "not_started") {
        task.status = "completed";
        task.completedDate = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
      setAssignedTasks(updatedTasks);
    };
  
    const therapyProgress = {
      label: "Therapy Progress",
      progress: 3,
      total: 10,
    };
  
    const reviews = [0, 50, 50, 0, 0]; // 5-star to 1-star distribution
    const totalReviews = reviews.reduce((a, b) => a + b, 0);
  
    return (
      <div className="container mt-4">
        <header className="mb-4">
          <h1 className="text-start">Session Details</h1>
          <p className="text-muted">June 15, 2023 - 9:00 AM</p>
        </header>
  
        <section className="mb-5">
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="text-start">Session Overview</h4>
              <p className="text-muted">60 minutes</p>
            </div>
            <div>
              <h4 className="text-start">Assigned Tasks</h4>
              {assignedTasks.map((task, index) => (
                <Task
                  key={index}
                  title={task.title}
                  status={task.status}
                  completedDate={task.completedDate}
                  onStatusChange={() => handleStatusChange(index)}
                />
              ))}
            </div>
          </div>
        </section>
  
        <section className="mb-5">
          <h2 className="h4 text-start">LogBook</h2>
          <ProgressBar {...therapyProgress} />
          <p className="text-muted">
            You're making great progress in your therapy journey! Keep up the good work.
          </p>
        </section>
  
        <section>
          <h2 className="h4 text-start">Reviews</h2>
          <div className="d-flex align-items-center mb-3">
            <h1 className="mb-0 me-3">3</h1>
            <span className="text-muted">2 reviews</span>
          </div>
          <ReviewBars reviews={reviews} totalReviews={totalReviews} />
        </section>
      </div>
    );
  };
  
  export default SessionDetailsPage;