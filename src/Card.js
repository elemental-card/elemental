import React from 'react';

const getClassName = (element, isTrump) => {
  return 'Card Card--' + element + (isTrump
    ? ' Card--trump'
    : ''
  );
};

const formatRank = (rank) => {
  if (rank === 1) {
    return '∞';
  }
  return rank;
};

const Card = ({ rank, element, isTrump }) => {
  return (
    <div className={getClassName(element, isTrump)}>
      <div className="Card__Rank">{formatRank(rank)}</div>
    </div>
  );
};

export default Card;
