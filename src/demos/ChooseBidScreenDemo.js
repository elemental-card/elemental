import React from 'react';
import ChooseBidScreen from '../containers/ChooseBidScreen';

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

const SAMPLE_BIDDERS = [
  {
    name: 'Bob',
    bid: 1,
    hand: [
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
    ],
  },
  {
    name: 'KJL',
    bid: null,
  },
  {
    name: '9oe',
    bid: null,
  }
];

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      tentativeBid: 0,
    };
  }

  render() {
    return (
      <ChooseBidScreen
        hand={SAMPLE_HAND}
        trumpCard={{
          rank: 6,
          element: 'earth',
        }}
        players={SAMPLE_BIDDERS}
        tentativeBid={this.state.tentativeBid}
        onSelectTentativeBid={(tentativeBid) => this.setState({ tentativeBid })}
        onConfirmTentativeBid={() => alert('Confirmed ' + this.state.tentativeBid)}
      />
    );
  }
};
