import React from 'react';

const getClassName = (element, isTrump) => {
  return 'Card Card--' + element + (isTrump
    ? ' Card--trump'
    : ''
  );
};

const formatRank = (rank) => {
  if (rank === Infinity) {
    return '∞';
  }
  return rank;
};

const Card = ({ rank, element, isTrump, onClick }) => {
  return (
    <div className={getClassName(element, isTrump)} onClick={onClick}>
      <div className="Card__Rank">{formatRank(rank)}</div>
    </div>
  );
};

export default Card;
