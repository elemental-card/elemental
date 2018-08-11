import React from 'react';
import Card from './Card';
import '../styles/TrumpElementOptions.css';

const TRUMP_ELEMENT_OPTIONS = ['fire', 'water', 'earth', 'air'].map((element) => ({
  rank: Infinity,
  element,
}));

export default ({ tentativeElement, onSelect }) => (
  <div className="TrumpElementOptions">
    {TRUMP_ELEMENT_OPTIONS.map((card) => (
      <Card
        card={card}
        isSelected={card.element === tentativeElement}
        onClick={(card) => onSelect(card.element)}
      />
    ))}
  </div>
);
