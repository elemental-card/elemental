import React from 'react';
import Card from './Card';
import '../styles/TrumpSection.css';

export default ({ card }) => (
  <div className="TrumpSection">
    <div className="TrumpSection__Label">
      {
        card === null || card.rank === 0
          ? 'No Trump'
          : 'Trump'
      }
    </div>
    <div className="TrumpSection__CardContainer">
      {card !== null
        && <Card card={card} isTrump />
      }
    </div>
  </div>
);
