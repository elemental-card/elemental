import React from 'react';
import BiddingScreenDemo from './demos/BiddingScreenDemo';
import CardChoosingScreenDemo from './demos/CardChoosingScreenDemo';
import WaitingForOpponentToChooseCardScreenDemo from './demos/WaitingForOpponentToChooseCardScreenDemo';
import LookingAtLastCardOfTrickScreenDemo from './demos/LookingAtLastCardOfTrickScreenDemo';
import './App.css';

class App extends React.Component {
  render() {
    const which = 'bidding';

    switch (which) {
      case 'bidding':
        return <BiddingScreenDemo />;
      case 'cardChoosing':
        return <CardChoosingScreenDemo />;
      case 'waitingCard':
        return <WaitingForOpponentToChooseCardScreenDemo />;
      case 'lookingLastCard':
        return <LookingAtLastCardOfTrickScreenDemo />;
      default:
        return <div>ERROR: {which}</div>;
    }
  }
}

export default App;
