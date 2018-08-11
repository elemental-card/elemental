import React from 'react';
import Card from './Card';
import { canCardBePlayed } from '../gameLogic/cardUtils';
import '../styles/Hand.css';

const NOOP = () => undefined;

export default ({
  cards,
  trumpElement,
  playedCards = [],
  selectedCardIndex = -1,

  onSelectIndex = NOOP,
}) => (
  <div className="Hand">
    {cards.map((card, i) => (
      <Card
        card={card}
        isSelected={i === selectedCardIndex}
        isTrump={card.element === trumpElement}
        isDisabled={!canCardBePlayed(card, playedCards, cards)}
        onClick={() => onSelectIndex(i)}
      />
    ))}
  </div>
);
