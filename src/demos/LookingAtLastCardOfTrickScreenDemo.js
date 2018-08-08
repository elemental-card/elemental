import React from 'react';
import lookingAtLastCardOfTrickGameState from './sampleGameStates/lookingAtLastCardOfTrickGameState';
import LookingAtLastCardOfTrickScreen from '../components/LookingAtLastCardOfTrickScreen';

class LookingAtLastCardOfTrickScreenDemo extends React.Component {
  render() {
    return (
      <LookingAtLastCardOfTrickScreen
        ownName="JCL"
        viewedGameState={lookingAtLastCardOfTrickGameState}
        continueToNextScreen={() => alert('Continuing to next screen!')}
      />
    );
  }
}

export default LookingAtLastCardOfTrickScreenDemo;
