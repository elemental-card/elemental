const gameState = choosingTrump || bidding || choosingCard;

const choosingTrump = {
  prngState: Int32Array,
  players: [
    {
      name: 'string',
      score: 'number',
      hand: ['card']
    }
  ]
};

const bidding = {
  prngState: Int32Array,
  trump,
  players: [
    {
      name: 'string',
      score: 'number',
      hand: ['card'],
      bid: option('number')
    }
  ]
};

const choosingCard = {
  prngState: Int32Array,
  trump,
  nextDealer: 'string',
  players: [
    {
      name: 'string',
      score: 'number',
      hand: ['card'],
      bid: 'number',
      tricksWon: 'number',
      playedCard: option(card)
    }
  ]
};

const trump = card || zero || noCard || dealerChoice;

const card = {
  value: 'card',
};

const zero = {
  value: null,
};

const noCard = {
  value: null,
};

const dealerChoice = {
  value: 'string',
};
