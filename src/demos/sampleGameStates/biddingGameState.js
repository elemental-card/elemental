const biddingGameState = {
  prngState: [1, 2, 3, 4],
  trump: {
    type: 'dealerChoice',
    value: 'air',
  },
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
        },
        {
          rank: 5,
          element: 'earth',
        }
      ],
      bid: 0,
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
        },
        {
          rank: 14,
          element: 'fire',
        }
      ],
      bid: 1,
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
        },
        {
          rank: 7,
          element: 'air',
        }
      ],
      bid: null,
    },
    {
      name: 'KJL',
      score: 20,
      hand: [
        {
          rank: 2,
          element: 'fire',
        },
        {
          rank: 0,
          element: 'magic',
        },
        {
          rank: Infinity,
          element: 'magic',
        },
      ],
      bid: null,
    },
  ],
};

export default biddingGameState;
