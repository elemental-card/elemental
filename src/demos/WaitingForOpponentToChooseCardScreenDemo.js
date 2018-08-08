import React from 'react';
import waitingForOpponentToChooseCardGameState from './sampleGameStates/waitingForOpponentToChooseCardGameState';
import WaitingForOpponentToChooseCardScreen from '../components/WaitingForOpponentToChooseCardScreen';

class WaitingForOpponentToChooseCardScreenDemo extends React.Component {
  render() {
    return (
      <WaitingForOpponentToChooseCardScreen
        ownName="MXW"
        gameState={waitingForOpponentToChooseCardGameState}
      />
    );
  }
}

export default WaitingForOpponentToChooseCardScreenDemo;
