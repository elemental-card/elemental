import React from "react";
import "../styles/IncrementBidSection.css";

export default ({ onClick }) => (
  <div className="IncrementBidSection">
    <div className="IncrementBidSection__Button" onClick={onClick}>
      <div className="IncrementBidSection__Button__Plus" />
    </div>
  </div>
);
