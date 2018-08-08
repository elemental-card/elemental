import React from 'react';
import cardChoosingGameState from './sampleGameStates/cardChoosingGameState';
import CardChoosingScreen from '../components/CardChoosingScreen';

class CardChoosingScreenDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      tentativeCard: null,
    };
  }

  render() {
    return (
      <CardChoosingScreen
        ownName="KJL"
        gameState={cardChoosingGameState}
        tentativeCard={this.state.tentativeCard}

        selectTentativeCard={(tentativeCard) => this.setState({ tentativeCard })}
        confirmTentativeCard={() => alert('Confirmed ' + this.state.tentativeCard.rank + ' ' + this.state.tentativeCard.element + '!')}
      />
    );
  }
}

export default CardChoosingScreenDemo;
