import React, {useState} from "react";
import Task from "../components/TaskComponent.jsx";
import "../styles/Tasks.css";

// Main Tasks Page Component
const TasksScreen = () => {
    const [assignedTasks, setAssignedTasks] = useState([
      { title: "Practice a 5-minute mindfulness exercise", status: "not_started", completedDate: null },
      { title: "Try 5–5–5 breathing for stress relief", status: "completed", completedDate: "June 17, 2023" },
    ]);
  
    const [previousTasks, setPreviousTasks] = useState([
      { title: "Try 5–5–5 breathing for stress relief", status: "completed", completedDate: "June 17, 2023" },
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
  
    return (
      <div className="container mt-4">
        <header className="mb-4">
          <h1 className="text-start">Tasks</h1>
        </header>
  
        <section className="mb-5">
          <h2 className="h4 text-start mb-3">Assigned Tasks for the next session</h2>
          <div>
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
        </section>
  
        <section>
          <h2 className="h4 text-start mb-3">History of previous tasks</h2>
          <div>
            {previousTasks.map((task, index) => (
              <Task
                key={index}
                title={task.title}
                status={task.status}
                completedDate={task.completedDate}
              />
            ))}
          </div>
        </section>
      </div>
    );
  };

  
  export default TasksScreen;