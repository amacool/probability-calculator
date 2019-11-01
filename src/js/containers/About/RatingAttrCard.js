import React from "react";

export const RatingAttrCard = ({ icon, heading, options }) => {
  return (
    <div className="rating-attr-card">
      <div className="card-icon">
        {icon}
      </div>
      <div className="card-content">
        <p>{heading}</p>
        <ul>
          {options.map((option, index) => <li key={index}>{option}</li>)}
        </ul>
      </div>
    </div>
  )
};
