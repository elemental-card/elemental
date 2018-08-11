import React from 'react';
import CardList from './CardList';
import '../styles/Hand.css';

const NOOP = () => undefined;

export default ({
  cards,
  trumpElement,
  selectedCardIndex = -1,

  onSelectIndex = NOOP,
}) => (
  <div className="Hand">
    <CardList
      cards={cards}
      selectedCardIndex={selectedCardIndex}
      trumpElement={trumpElement}
      onClick={(card) => onSelectIndex(cards.indexOf(card))}
    />
  </div>
);
