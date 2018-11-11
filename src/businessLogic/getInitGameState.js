import getShuffledArrayAndNewPrngState from './getShuffledArrayAndNewPrngState';
import { getOrderedDeck } from './cardUtils';

export default (prngState0, playerNames) => {
  const {
    shuffledArray: shuffledPlayerNames,
    newPrngState: prngState1,
  } = getShuffledArrayAndNewPrngState({
    array: playerNames,
    prngState: prngState0,
  });

  const {
    shuffledArray: deck,
    newPrngState: prngState2,
  } = getShuffledArrayAndNewPrngState({
    array: getOrderedDeck(),
    prngState: prngState1,
  });

  const numberOfPlayers = shuffledPlayerNames.length;
  const trumpCard = deck[numberOfPlayers];

  if (trumpCard.rank === Infinity) {
    return {
      type: 'CHOOSING_TRUMP',
      prngState: prngState2,
      players: shuffledPlayerNames.map((playerName, i) => {
        return {
          name: playerName,
          score: 0,
          hand: [deck[i]],
        };
      }),
    };
  }

  const trump = trumpCard.rank === 0
    ? {
      type: 'zero',
      value: null,
    }
    : {
      type: 'card',
      value: trumpCard,
    };

  return {
    type: 'BIDDING',
    prngState: prngState2,
    trump,
    players: shuffledPlayerNames.map((playerName, i) => {
      return {
        name: playerName,
        score: 0,
        hand: [deck[i]],
        bid: null,
      };
    }),
  };
};
