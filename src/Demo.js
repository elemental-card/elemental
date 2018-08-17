import React from 'react';
import ConnectToServerScreen from './containers/ConnectToServerScreen';
import HomeScreen from './containers/HomeScreen';
import LobbyBrowsingScreenDemo from './demos/LobbyBrowsingScreenDemo';
import InitialChoosingScreenDemo from './demos/InitialChoosingScreenDemo';
import StartLobbyScreen from './containers/StartLobbyScreen';
import WaitForHostToStartLobbyScreen from './containers/WaitForHostToStartLobbyScreen';
import ChooseTrumpElementScreenDemo from './demos/ChooseTrumpElementScreenDemo';
import WaitForDealerToChooseTrumpElement from './containers/WaitForDealerToChooseTrumpElementScreen';
import TrumpElementResultScreen from './containers/TrumpElementResultScreen';
import ChooseBidScreenDemo from './demos/ChooseBidScreenDemo';
import WaitingForOpponentToChooseBidScreen from './containers/WaitForOpponentToChooseBidScreen';
import BidResultScreen from './containers/BidResultScreen';
import ChooseCardScreenDemo from './demos/ChooseCardScreenDemo';
import WaitForOpponentToChooseCardScreen from './containers/WaitForOpponentToChooseCardScreen';
import TrickResultScreen from './containers/TrickResultScreen';
import HandResultScreen from './containers/HandResultScreen';
import GameResultScreen from './containers/GameResultScreen';

const startLobbyPlayers = [
  {
    name: 'KJL',
    uid: '123',
  },
  {
    name: 'Bob',
    uid: '456',
  },
  {
    name: 'j03',
    uid: '999',
  }
];

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

const SAMPLE_BIDDERS1 = [
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
    bid: 2,
  },
  {
    name: '9oe',
    bid: null,
  }
];

const SAMPLE_BIDDERS2 = [
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
    bid: 2,
  },
  {
    name: '9oe',
    bid: 4,
  }
];

const SAMPLE_PLAYERS1 = [
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
    playedCard: {
      rank: Infinity,
      element: 'magic',
    },
  },
  {
    name: '9oe',
    tricksWon: 0,
    bid: 5,
    playedCard: null,
  }
];

const SAMPLE_PLAYERS2 = [
  {
    name: 'Bob',
    tricksWon: 0,
    bid: 1,
    playedCard: {
      rank: 14,
      element: 'fire',
    },
  },
  {
    name: 'KJL',
    tricksWon: 2,
    bid: 3,
    playedCard: {
      rank: Infinity,
      element: 'magic',
    },
  },
  {
    name: '9oe',
    tricksWon: 0,
    bid: 5,
    playedCard: {
      rank: 3,
      element: 'earth',
    },
  }
];

const SAMPLE_BIDDERS3 = [
  {
    name: 'Bob',
    bid: null,
    score: 30,
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
    score: 20,
    bid: null,
  },
  {
    name: '9oe',
    score: 90,
    bid: null,
  },
  {
    name: 'd4b',
    score: -10,
    bid: null,
  }
];

const SAMPLE_BIDDERS4 = [
  {
    name: 'Bob',
    score: 90,
    bid: null,
  },
  {
    name: 'KJL',
    score: 90,
    bid: null,
  },
  {
    name: '9oe',
    score: -10,
    bid: null,
  },
  {
    name: '137',
    score: 40,
    bid: null,
  },
  {
    name: 'dav',
    score: 90,
    bid: null,
  },
  {
    name: 'd4b',
    score: 40,
    bid: null,
  }
];

const SAMPLE_DELTAS = [
  30,
  20,
  -10,
  90
];

export default class extends React.Component {
  constructor() {
    super();
    this.availableDemos = [
      'connectingToServer',
      'home',
      'browseLobbies',
      'chooseInitials',
      'startLobby',
      'waitStart',
      'chooseTrump',
      'waitTrump',
      'resultTrump',
      'chooseBid',
      'waitBid',
      'resultBid',
      'chooseCard',
      'waitCard',
      'resultTrick',
      'resultHand',
      'resultGame'
    ];
    this.state = {
      whichDemo: this.availableDemos[0],
    };
  }

  componentDidMount() {
    const RIGHT = 39;
    const LEFT = 37;

    window.addEventListener('keydown', (e) => {
      if (e.keyCode === RIGHT) {
        this.setState((prevState) => {
          const oldIndex = this.availableDemos.indexOf(prevState.whichDemo);
          const newIndex = oldIndex + 1 === this.availableDemos.length
            ? 0
            : oldIndex + 1;
          return {
            whichDemo: this.availableDemos[newIndex],
          };
        });
      } else if (e.keyCode === LEFT) {
        this.setState((prevState) => {
          const oldIndex = this.availableDemos.indexOf(prevState.whichDemo);
          const newIndex = oldIndex === 0
            ? this.availableDemos.length - 1
            : oldIndex - 1;
          return {
            whichDemo: this.availableDemos[newIndex],
          };
        });
      }
    });
  }

  render() {
    switch (this.state.whichDemo) {
      case 'connectingToServer':
        return <ConnectToServerScreen />;
      case 'home':
        return <HomeScreen
          onJoinClicked={() => alert('browse')}
          onCreateClicked={() => alert('create')}
        />;
      case 'browseLobbies':
        return <LobbyBrowsingScreenDemo />;
      case 'chooseInitials':
        return <InitialChoosingScreenDemo />;
      case 'startLobby':
        return <StartLobbyScreen
          players={startLobbyPlayers}
          onStart={() => alert('Start.')}
          onLeave={() => alert('Lobby destroyed.')}
        />;
      case 'waitStart':
        return <WaitForHostToStartLobbyScreen
          players={startLobbyPlayers}
          onLeave={() => alert('Left lobby.')}
        />;
      case 'chooseTrump':
        return <ChooseTrumpElementScreenDemo />;
      case 'waitTrump':
        return <WaitForDealerToChooseTrumpElement hand={SAMPLE_HAND} />;
      case 'resultTrump':
        return <TrumpElementResultScreen
          hand={SAMPLE_HAND}
          trumpElement="water"
          onContinue={() => alert('Continue.')}
        />;
      case 'chooseBid':
        return <ChooseBidScreenDemo />;
      case 'waitBid':
        return <WaitingForOpponentToChooseBidScreen
          hand={SAMPLE_HAND}
          trumpCard={{
            rank: 6,
            element: 'earth',
          }}
          players={SAMPLE_BIDDERS1}
        />;
      case 'resultBid':
        return <BidResultScreen
          hand={SAMPLE_HAND}
          trumpCard={{
            rank: 6,
            element: 'earth',
          }}
          players={SAMPLE_BIDDERS2}
          onContinue={() => alert('Continue.')}
        />;
      case 'chooseCard':
        return <ChooseCardScreenDemo />;
      case 'waitCard':
        return <WaitForOpponentToChooseCardScreen
          hand={SAMPLE_HAND}
          trumpCard={{
            rank: 6,
            element: 'earth',
          }}
          players={SAMPLE_PLAYERS1}
        />;
      case 'resultTrick':
        return <TrickResultScreen
          hand={SAMPLE_HAND}
          trumpCard={{
            rank: 6,
            element: 'earth',
          }}
          players={SAMPLE_PLAYERS2}
          onContinue={() => alert('Continue.')}
        />;
      case 'resultHand':
        return <HandResultScreen
          trumpCard={{
            rank: 6,
            element: 'earth',
          }}
          players={SAMPLE_BIDDERS3}
          scoreDeltas={SAMPLE_DELTAS}
          onContinue={() => alert('Continue.')}
        />;
      case 'resultGame':
        return <GameResultScreen
          players={SAMPLE_BIDDERS4}
          onContinue={() => alert('Finished game.')}
        />;
      default:
        throw new TypeError('Illegal demo.');
    }
  }
}
