const waitingForOpponentToChooseCardGameState = {
  prngState: [1, 2, 3, 4],
  trump: {
    type: 'card',
    value: {
      rank: 5,
      element: 'fire',
    },
  },
  nextDealer: 'MXW',
  players: [
    {
      name: 'JCL',
      score: 20,
      hand: [
        {
          rank: 11,
          element: 'fire',
        },
        {
          rank: 0,
          element: 'magic',
        }
      ],
      bid: 2,
      tricksWon: 0,
      playedCard: {
        rank: 13,
        element: 'earth',
      },
    },
    {
      name: 'MXW',
      score: 50,
      hand: [
        {
          rank: 6,
          element: 'air',
        },
        {
          rank: 9,
          element: 'earth',
        }
      ],
      bid: 3,
      tricksWon: 4,
      playedCard: {
        rank: 3,
        element: 'water',
      },
    },
    {
      name: 'JXL',
      score: 40,
      hand: [
        {
          rank: Infinity,
          element: 'magic',
        },
        {
          rank: 14,
          element: 'water',
        }
      ],
      bid: 3,
      tricksWon: 1,
      playedCard: {
        rank: 2,
        element: 'air',
      },
    },
    {
      name: 'KJL',
      score: 20,
      hand: [
        {
          rank: 0,
          element: 'magic',
        },
        {
          rank: Infinity,
          element: 'magic',
        },
        {
          rank: 2,
          element: 'fire',
        }
      ],
      bid: 1,
      tricksWon: 0,
      playedCard: null,
    },
  ],
};

export default waitingForOpponentToChooseCardGameState;
