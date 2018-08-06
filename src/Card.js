import React from 'react';

const getClassName = (element, isWinning) => {
  return 'Card Card--' + element + (isWinning
    ? ' Card--winning'
    : ''
  );
};

const formatRank = (rank) => {
  if (rank === 1) {
    return '∞';
  }
  return rank;
};

const Card = ({ rank, element, isWinning }) => {
  return (
    <div className={getClassName(element, isWinning)}>
      <div className="Card__Rank">{formatRank(rank)}</div>
    </div>
  );
};

export default Card;
