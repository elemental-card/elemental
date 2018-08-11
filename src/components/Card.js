import React from 'react';
import '../styles/Card.css';

const NOOP = () => undefined;

const getClassName = (element, isSelected, isTrump) => (
  'Card Card--' + element +
  (isSelected ? ' Card--selected' : '') +
  (isTrump ? ' Card--trump' : '')
);

const formatRank = (rank) => rank === Infinity ? '∞' : String(rank);

export default ({ card, isSelected, isTrump, onClick = NOOP }) => (
  <div
    className={getClassName(card.element, isSelected, isTrump)}
    onClick={() => onClick(card)}
  >
    <div className="Card__Rank">{formatRank(card.rank)}</div>
  </div>
);
