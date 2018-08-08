import React from 'react';

// TODO styles

const ConfirmationCard = ({ onClick }) => {
  return (
    <div className="Card Card--confirmation" onClick={onClick}>
      <div className="CheckIcon" />
    </div>
  );
};

export default ConfirmationCard;
