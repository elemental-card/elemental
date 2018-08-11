import React from 'react';
import '../styles/DecrementBidSection.css';

export default ({ onClick }) => (
  <div className="DecrementBidSection">
    <div
      className="DecrementBidSection__Button"
      onClick={onClick}
    >
      <div className="DecrementBidSection__Button__Minus" />
    </div>
  </div>
);
