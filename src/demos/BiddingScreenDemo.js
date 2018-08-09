import React from 'react';
import biddingGameState from './sampleGameStates/biddingGameState';
import BiddingScreen from '../components/BiddingScreen';

class BiddingScreenDemo extends React.Component {
  render() {
    return (
      <BiddingScreen
        ownName="JXL"
        gameState={biddingGameState}
      />
    );
  }
}

export default BiddingScreenDemo;
