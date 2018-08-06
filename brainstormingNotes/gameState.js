// Pseudocode

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
  trump: 'trump',
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
  trump: 'trump',
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

const trump = 'card' || 'noTrump' || 'suit';

const nextState = (currState, action) => {
  if (currState instanceof choosingTrump) {
    return currState |> addTrump(action) |> addNullBids;
  }
  if (currState instanceof bidding) {
    if (playersWithBid === numberOfPlayers - 1) {
      return currState |> addBid(action) |> addZeroTricksWon |> addNullPlayedCards;
    }
    return currState |> addBid(action);
  }
  if (currState instanceof choosingCard) {
    currState = currState |> removeCardFromHand(action) |> playCard(action);
    if (playersWithChosenCard < numberOfPlayers) {
      return currState;
    }
    currState = currState |> incrementTricksWon |> setPlayedCardToNull |> reorder;
    if (player0Hand.length > 0) {
      return currState;
    }
    currState = currState |> addScore |> reorderForNextHand |> addHand |> removeBidTricksWonAndPlayedCard;
    if (trump === Infinity) {
      return currState;
    }
    currState = currState |> addTrump |> addNullBids;
  }
};

const serialize = (state) => {
  let str = '';
  if (state instanceof choosingTrump) {
    str += 'choosingTrump,[' + prngState.join(',') + '];';
    for (const p of players) {
      str += p.name + ',' + p.score + ',[' + p.hand.join(',') + '];';
    }
  } else if (state instanceof bidding) {
    str += 'bidding,' + trump + ';'; // TODO handle prngState
    for (const p of players) {
      str += p.name + ',' + p.score + ',[' + p.hand.join(',') + '],' + bid + ';';
    }
  } else if (state instanceof choosingCard) {
    str += 'choosingCard,' + trump + ',' + nextDealer + ';'; // TODO handle prngState
    for (const p of players) {
      str += p.name + ',' + p.score + ',[' + p.hand.join(',') + '],' + bid + ',' + tricksWon + ',' + playedCard + ';';
    }
  }
  return str;
};
const checksum = |> serialize |> sha256;
