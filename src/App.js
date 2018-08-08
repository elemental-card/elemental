import React from 'react';
import CardChoosingScreenDemo from './demos/CardChoosingScreenDemo';
import WaitingForOpponentToChooseCardScreenDemo from './demos/WaitingForOpponentToChooseCardScreenDemo';
import LookingAtLastCardOfTrickScreenDemo from './demos/LookingAtLastCardOfTrickScreenDemo';
import './App.css';

class App extends React.Component {
  render() {
    const which = 'waitingCard';

    switch (which) {
      case 'cardChoosing':
        return <CardChoosingScreenDemo />;
      case 'waitingCard':
        return <WaitingForOpponentToChooseCardScreenDemo />;
      case 'lookingLastCard':
        return <LookingAtLastCardOfTrickScreenDemo />;
      default:
        return <div>TODO: {which}</div>;
    }
  }
}

export default App;
