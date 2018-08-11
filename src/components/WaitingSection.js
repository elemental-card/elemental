import React from 'react';
import '../styles/WaitingSection.css';

export default ({ label }) => (
  <div className="WaitingSection">
    <div className="WaitingSection__Label">
      {label}
    </div>
  </div>
);
