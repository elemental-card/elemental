import React from 'react';
import '../styles/Card.css';

const NOOP = () => undefined;

const getClassName = (element, isSelected, isTrump, isDisabled) => (
  'Card Card--' + element
  + (isSelected ? ' Card--selected' : '')
  + (isTrump ? ' Card--trump' : '')
  + (isDisabled ? ' Card--disabled' : '')
);

const formatRank = (rank) => rank === Infinity ? '∞' : String(rank);

export default ({ card, isSelected, isTrump, isDisabled = false, onClick = NOOP }) => (
  <div
    className={getClassName(card.element, isSelected, isTrump, isDisabled)}
    onClick={isDisabled ? NOOP : () => onClick(card)}
  >
    <div className="Card__Rank">{formatRank(card.rank)}</div>
  </div>
);
