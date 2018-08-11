import React from 'react';
import CardList from './CardList';
import '../styles/TrumpElementOptions.css';

const TRUMP_ELEMENT_OPTIONS = ['fire', 'water', 'earth', 'air'].map((element) => ({
  rank: Infinity,
  element,
}));

export default ({ tentativeElement, onSelect }) => (
  <div className="TrumpElementOptions">
    <CardList
      cards={TRUMP_ELEMENT_OPTIONS}
      selectedCardIndex={TRUMP_ELEMENT_OPTIONS.findIndex(c => c.element === tentativeElement)}
      trumpElement={tentativeElement}
      onClick={(card) => onSelect(card.element)}
    />
  </div>
);
