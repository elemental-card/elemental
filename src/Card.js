import React from 'react';

const getClassName = (element) => {
  return 'Card Card--' + element;
};

const formatRank = (rank) => {
  if (rank === 1) {
    return '∞';
  }
  return rank;
};

const Card = ({ rank, element }) => {
  return (
    <div className={getClassName(element)}>
      <div className="Card__Rank">{formatRank(rank)}</div>
    </div>
  );
};

export default Card;
