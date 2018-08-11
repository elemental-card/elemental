import React from 'react';
import Card from './Card';

export default ({
  cards,
  selectedCardIndex = -1,
  trumpElement,

  onClick
}) => (
  cards.map((card, i) => (
    <Card
      card={card}
      isSelected={i === selectedCardIndex}
      isTrump={card.element === trumpElement}
      onClick={onClick}
    />
  ))
);
