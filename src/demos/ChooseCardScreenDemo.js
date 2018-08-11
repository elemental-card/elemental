import React from 'react';
import ChooseCardScreen from '../containers/ChooseCardScreen';

const SAMPLE_HAND = [
  {
    rank: 2,
    element: 'earth',
  },
  {
    rank: 11,
    element: 'water',
  },
  {
    rank: 6,
    element: 'fire',
  },
  {
    rank: 0,
    element: 'magic',
  }
];

const SAMPLE_PLAYERS = [
  {
    name: 'Bob',
    tricksWon: 0,
    bid: 1,
    playedCard: {
      rank: 14,
      element: 'earth',
    },
  },
  {
    name: 'KJL',
    tricksWon: 2,
    bid: 3,
    playedCard: null,
  },
  {
    name: '9oe',
    tricksWon: 0,
    bid: 5,
    playedCard: null,
  }
];

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      tentativeCardIndex: -1,
    };
  }

  render() {
    return (
      <ChooseCardScreen
        hand={SAMPLE_HAND}
        trumpCard={{
          rank: 6,
          element: 'earth',
        }}
        players={SAMPLE_PLAYERS}
        tentativeCardIndex={this.state.tentativeCardIndex}
        onSelectTentativeCardIndex={(tentativeCardIndex) => this.setState({ tentativeCardIndex })}
        onConfirmTentativeCardIndex={
          () => {
            alert(
              'Confirmed '
              + SAMPLE_HAND[this.state.tentativeCardIndex].rank
              + ' '
              + SAMPLE_HAND[this.state.tentativeCardIndex].element
            );
          }
        }
      />
    );
  }
};
