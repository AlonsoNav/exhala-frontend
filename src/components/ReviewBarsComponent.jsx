import React from "react";


const ReviewBars = ({ reviews, totalReviews }) => {
    return (
      <div>
        {reviews.map((review, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <span className="me-2">{5 - index}</span>
            <div className="progress flex-grow-1">
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: `${(review / totalReviews) * 100}%` }}
                aria-valuenow={review}
                aria-valuemin="0"
                aria-valuemax={totalReviews}
              ></div>
            </div>
            <span className="ms-2">{`${Math.round((review / totalReviews) * 100)}%`}</span>
          </div>
        ))}
      </div>
    );
  };
  export default ReviewBars;

