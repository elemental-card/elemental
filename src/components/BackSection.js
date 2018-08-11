import React from 'react';
import '../styles/BackSection.css';

export default ({ onClick, label }) => (
  <div className="BackSection">
    <div className="BackSection__Label">
      {label}
    </div>
    <div
      className="BackSection__Button"
      onClick={onClick}
    >
      <div className="BackSection__Button__Cross" />
    </div>
  </div>
);
