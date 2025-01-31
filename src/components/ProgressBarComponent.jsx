import React from "react";


const ProgressBar = ({ label, progress, total }) => {
    return (
      <div className="mb-3">
        <div className="d-flex justify-content-between">
          <span>{label}</span>
          <span>{`${progress}/${total} sessions completed`}</span>
        </div>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${(progress / total) * 100}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax={total}
          ></div>
        </div>
      </div>
    );
  };
  export default ProgressBar;
  