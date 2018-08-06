import React from 'react';

const getClassName = (element, isWinning, isTrump) => {
  return 'Card Card--' + element + (isWinning
    ? ' Card--winning'
    : ''
  ) + (isTrump
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

const Card = ({ rank, element, isWinning, isTrump }) => {
  return (
    <div className={getClassName(element, isWinning, isTrump)}>
      <div className="Card__Rank">{formatRank(rank)}</div>
    </div>
  );
};

export default Card;
